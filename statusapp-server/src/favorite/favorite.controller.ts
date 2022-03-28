import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
    constructor(private favoriteService: FavoriteService) {}

    @Get()
    async findAll() {
        return await this.favoriteService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.favoriteService.findOne({where: {id: id}});
    }

    @Post()
    async create(@Body() favorite: Favorite) {
        return await this.favoriteService.create(favorite);
    }

    @Put()
    async update(@Body() favorite: Favorite) {
        return await this.favoriteService.update(favorite);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.favoriteService.delete(id);
    }
}
