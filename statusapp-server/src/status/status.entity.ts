import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Status {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    userId: string

    @Column({nullable: false})
    status: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false})
    timestamp: Date;

    favorites: string[];
}