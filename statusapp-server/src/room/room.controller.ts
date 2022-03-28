import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Get()
    async findAll() {
        return await this.roomService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.roomService.findOne({where: {id: id}});
    }

    @Post()
    async create(@Body() room: Room) {
        return await this.roomService.create(room);
    }

    @Put()
    async update(@Body() room: Room) {
        return await this.roomService.update(room);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.roomService.delete(id);
    }
}
