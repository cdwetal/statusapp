import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, FindOneOptions, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
    ) { }

    findAll(): Promise<Favorite[]> {
        return this.favoriteRepository.find();
    }

    findOne(criteria: FindOneOptions<Favorite>): Promise<Favorite> {
        return this.favoriteRepository.findOne(criteria);
    }

    find(criteria: FindManyOptions<Favorite>): Promise<Favorite[]> {
        return this.favoriteRepository.find(criteria)
    }

    create(favorite: Favorite): Promise<InsertResult> {
        return this.favoriteRepository.insert(favorite);
    }

    update(favorite: Favorite): Promise<UpdateResult> {
        return this.favoriteRepository.update(favorite.id, favorite);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.favoriteRepository.delete(id);
    }
}