import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Availability {
    AVAILABLE = 'En Cartelera',
    SON = 'Proximamente',
    DESCONTINUED = 'Descontinuada'
}

@Entity('movie')
export class Movie {

    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ type: 'varchar', name: 'title' })
    title!: string;

    @Column({ type: 'text', name: 'description' })
    description!: string;

    @Column({ type: 'bigint', name: 'year_release' })
    yearRelease!: number;

    @Column({ type: 'varchar', name: 'director' })
    director!: string;

    @Column({ type: 'text', name: 'gender' })
    gender!: string;

    @Column({ type: 'integer', name: 'duration' })
    duration!: number;

    @Column({ type: 'smallint', name: 'calification' })
    calification!: number;

    @Column({ type: 'text', name: 'image', nullable: true })
    image!: string;

    @Column({
        type: 'enum',
        enum: Availability,
        enumName: 'availability_enum',
        name: 'availability'
    })
    availability!: Availability;
}
