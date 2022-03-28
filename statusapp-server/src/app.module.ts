import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';
import { RoomModule } from './room/room.module';
import { AppGateway } from './app.gateway';
import { RoomService } from './room/room.service';
import { StatusService } from './status/status.service';
import { UserService } from './user/user.service';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(), 
        UserModule, 
        StatusModule, 
        RoomModule, 
        FavoriteModule
    ],
    providers: [AppGateway]
})
export class AppModule { }
