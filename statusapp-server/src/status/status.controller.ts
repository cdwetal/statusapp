import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Status } from './status.entity';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor(private statusService: StatusService) {}

    @Get()
    async findAll() {
        return await this.statusService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.statusService.findOne({where: {id: id}});
    }

    @Post()
    async create(@Body() status: Status) {
        return await this.statusService.create(status);
    }

    @Put()
    async update(@Body() status: Status) {
        return await this.statusService.update(status);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.statusService.delete(id);
    }
}
