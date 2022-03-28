import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.findOne({where: {id: id}});
    }

    @Post()
    async create(@Body() user: User) {
        return await this.userService.create(user);
    }

    @Put()
    async update(@Body() user: User) {
        return await this.userService.update(user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.userService.delete(id);
    }
}
