import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Availability } from "../../entities/movie";

export class MovieDTO {
    @IsString()
    @IsNotEmpty({message: 'The title is required'})
    title!: string;

    @IsNotEmpty({message: 'The description is required'})
    description!: string;

    @IsNotEmpty({message: 'The yearRelease is required'})
    yearRelease!: number;

    @IsNotEmpty({message: 'The director is required'})
    director!: string;

    @IsNotEmpty({message: 'The gender is required'})
    gender!: string;

    @IsNotEmpty({message: 'The duration is required'})
    duration!: number;

    @IsNotEmpty({message: 'The calification is required'})
    calification!: number;

    @IsEnum(Availability, { message: "The availability must be one of the predefined values." })
    availability!: Availability;

    @IsOptional()
    @IsString()
    image?: string;
}