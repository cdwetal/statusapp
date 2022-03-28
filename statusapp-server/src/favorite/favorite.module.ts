import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Module({
    imports: [TypeOrmModule.forFeature([Favorite])],
    exports: [FavoriteService],
    providers: [FavoriteService],
    controllers: [FavoriteController]
})
export class FavoriteModule { }
