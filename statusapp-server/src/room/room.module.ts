import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Module({
    imports: [TypeOrmModule.forFeature([Room])],
    exports: [RoomService],
    providers: [RoomService],
    controllers: [RoomController]
})
export class RoomModule { }
