import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IsNull, Not } from 'typeorm';
import { Favorite } from './favorite/favorite.entity';
import { FavoriteService } from './favorite/favorite.service';
import { Room } from './room/room.entity';
import { RoomService } from './room/room.service';
import { Status } from './status/status.entity';
import { StatusService } from './status/status.service';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private userService: UserService, 
        private statusService: StatusService, 
        private roomService: RoomService,
        private favoriteService: FavoriteService
    ) {}
    
    @WebSocketServer() wss: Server;

    async handleConnection(client: Socket, ...args: any[]) {
        let user = await this.userService.findOne({ where: {id: client.handshake.query.id.toString() }});
        user.socketId = client.id;
        this.userService.update(user);

        await client.join(`ROOM:${(await this.roomService.findOne({ where: { default: true }})).id}`);

        let rooms = await this.getRooms();
        client.emit(
            'userConnected', 
            { 
                rooms: rooms
            }
        );
        client.broadcast.emit(
            'userJoinedRoom', 
            { 
                rooms: rooms
            }
        );
    }

    async handleDisconnect(client: Socket) {
        await this.userService.delete(client.handshake.query.id.toString());
        let rooms = await this.roomService.find({ where: { ownerId: client.handshake.query.id.toString() }});
        for (let room of rooms) {
            await this.roomService.delete(room.id);
        }
        let statuses = await this.statusService.find({ where: { userId: client.handshake.query.id.toString() }});
        for (let status of statuses) {
            await this.roomService.delete(status.id);
            let favorites = await this.favoriteService.find({ where: { statusId: status.id }});
            for (let favorite of favorites) {
                await this.favoriteService.delete(favorite.id);
            }
        }

        this.wss.emit(
            'userDisconnected', 
            {
                rooms: await this.getRooms()
            }
        );
    }

    async getRooms(): Promise<Room[]> {
        let rooms = await this.roomService.find({ order: { sortOrder: "ASC" }});
        for (let room of rooms) {
            let sockets = await this.wss.in(`ROOM:${room.id}`).allSockets();
            if (sockets !== null && sockets.size > 0) {
                room.users = [...await this.userService.find({ where: [...sockets].map((socketId) => ({socketId: socketId}))})];
            } else {
                room.users = [];
            }
            for (let i = 0; i < room.users.length; i++) {
                let status = await this.statusService.findOne({ where: { userId: room.users[i].id }, order: { timestamp: "DESC" }});
                if (status) {
                    status.favorites = (await this.favoriteService.find({ where: {statusId: status.id }})).map((favorite) => favorite.userId);   
                }
                room.users[i].status = status;
            }
        }
        return rooms;
    }

    @SubscribeMessage('createRoom')
    async handleCreateRoom(client: Socket, incomingData: { room: Room }) {
        await this.roomService.create(incomingData.room);
        let rooms = await this.getRooms();

        this.wss.emit(
            'roomCreated', 
            {
                rooms: rooms
            }
        );
    }

    @SubscribeMessage('deleteRoom')
    async handleDeleteRoom(client: Socket, incomingData: { id: string }) {
        await this.roomService.delete(incomingData.id);
        let rooms = await this.getRooms();

        this.wss.emit(
            'roomDeleted', 
            {
                rooms: rooms,
                deletedRoomId: incomingData.id
            }
        );
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: Socket, incomingData: { id: string }) {
        await client.join(`ROOM:${incomingData.id}`);
        let rooms = await this.getRooms();
        client.broadcast.emit(
            'userJoinedRoom', 
            { 
                rooms: rooms
            }
        );
        client.emit(
            'joinedRoom', 
            { 
                rooms: rooms,
                joinedRoom: rooms.find((room) => room.id === incomingData.id)
            }
        );
    }

    @SubscribeMessage('leaveRoom') 
    async handleLeaveRoom(client: Socket, incomingData: { id: string }) {
        await client.leave(`ROOM:${incomingData.id}`);
        client.broadcast.emit(
            'userLeftRoom', 
            { 
                rooms: await this.getRooms() 
            }
        );
    }

    @SubscribeMessage('updateUserStatus')
    async handleUpdateStatus(client: Socket, incomingData: { id: string, status: string }) {
        let status: Status = new Status();
        status.userId = incomingData.id;
        status.status = incomingData.status;
        this.statusService.create(status);
        
        let rooms = await this.getRooms();

        this.wss.emit(
            'userStatusUpdated', 
            {
                rooms: rooms
            }
        );
    }

    @SubscribeMessage('favoriteStatus')
    async handleFavoriteStatus(client: Socket, incomingData: { statusId: string, userId: string }) {
        let favorite: Favorite = new Favorite();
        favorite.statusId = incomingData.statusId;
        favorite.userId = incomingData.userId;
        await this.favoriteService.create(favorite);

        let rooms = await this.getRooms();

        this.wss.emit(
            'statusFavorited', 
            {
                rooms: rooms
            }
        );
    }

    @SubscribeMessage('unfavoriteStatus')
    async handleUnfavoriteStatus(client: Socket, incomingData: { statusId: string, userId: string }) {
        let favorite = await this.favoriteService.findOne({ where: { statusId: incomingData.statusId, userId: incomingData.userId }});
        await this.favoriteService.delete(favorite.id);

        let rooms = await this.getRooms();

        this.wss.emit(
            'statusUnfavorited', 
            {
                rooms: rooms
            }
        );
    }
}
