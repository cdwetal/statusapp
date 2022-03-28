import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, FindOneOptions, InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(criteria: FindOneOptions<User>): Promise<User> {
        return this.userRepository.findOne(criteria);
    }

    find(criteria: FindManyOptions<User>): Promise<User[]> {
        return this.userRepository.find(criteria)
    }

    create(user: User): Promise<InsertResult> {
        return this.userRepository.insert(user);
    }

    update(user: User): Promise<UpdateResult> {
        return this.userRepository.update(user.id, user);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }
}