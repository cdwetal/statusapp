import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    path: string;

    @Column({type: 'boolean', nullable: true, default: 0})
    default: boolean;

    @Column({type: 'int', nullable: true, default: 9999})
    sortOrder: number;

    @Column({nullable: true})
    ownerId: string;

    users: User[];
}