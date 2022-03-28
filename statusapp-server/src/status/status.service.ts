import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, FindOneOptions, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private statusRepository: Repository<Status>,
    ) { }

    findAll(): Promise<Status[]> {
        return this.statusRepository.find();
    }

    findOne(criteria: FindOneOptions<Status>): Promise<Status> {
        return this.statusRepository.findOne(criteria);
    }

    find(criteria: FindManyOptions<Status>): Promise<Status[]> {
        return this.statusRepository.find(criteria)
    }

    create(status: Status): Promise<InsertResult> {
        return this.statusRepository.insert(status);
    }

    update(status: Status): Promise<UpdateResult> {
        return this.statusRepository.update(status.id, status);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.statusRepository.delete(id);
    }
}