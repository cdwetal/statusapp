import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    statusId: string

    @Column({ nullable: false })
    userId: string
}