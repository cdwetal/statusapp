import { Status } from 'src/status/status.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({nullable: true})
    socketId: string;

    @Column({nullable: false})
    username: string;

    status: Status;
}