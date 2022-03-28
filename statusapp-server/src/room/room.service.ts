import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepositoryCannotInheritRepositoryError, DeleteResult, FindManyOptions, FindOneOptions, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
    ) { }

    findAll(): Promise<Room[]> {
        return this.roomRepository.find();
    }

    findOne(criteria: FindOneOptions<Room>): Promise<Room> {
        return this.roomRepository.findOne(criteria);
    }

    find(criteria: FindManyOptions<Room>): Promise<Room[]> {
        return this.roomRepository.find(criteria)
    }

    async create(room: Room): Promise<InsertResult> {
        let i = 1;
        let newName = room.name;
        room.path = `/${newName.toLowerCase().replace(/\s+/g, '-').replace(/[^0-9a-zA-Z\-]/g, '')}`;
        while ((await this.findOne({ where: { path: room.path }})) !== null) {
            newName = `${room.name}-${i}`
            room.path = `/${newName.toLowerCase().replace(/\s+/g, '-').replace(/[^0-9a-zA-Z\-]/g, '')}`;
            i++;
        }
        room.name = newName;
        return this.roomRepository.insert(room);
    }

    update(room: Room): Promise<UpdateResult> {
        return this.roomRepository.update(room.id, room);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.roomRepository.delete(id);
    }
}