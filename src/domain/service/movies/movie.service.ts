import path from "path";
import fs from 'fs';

import { AppError, Movie, MovieDTO } from "../..";
import { Database } from "../../../database/database";
import { buildImageUr } from "./utils/build-image.util";
import { validate } from "class-validator";

export class MovieService {
    private movieRepository = Database.getInstance().getRepository(Movie);

    async createMovie(movieDto: MovieDTO): Promise<Movie> {
        try {
            const movieInstance = Object.assign(new MovieDTO(), movieDto);
            const errors = await validate(movieInstance);
            if (errors.length > 0) {
                const validateErrors = errors.map(error =>
                    Object.values(error.constraints || {}).join(', ')
                ).join('; ');
                throw new AppError(400, `${validateErrors}`);
            }
            const movie = await this.movieRepository.create({
                ...movieDto
            })
            return this.movieRepository.save(movie);
        } catch (error) {
            handleAppError(error);
        }
    }

    async getAllMovies(criteria: Partial<Movie>): Promise<Movie[]> {

        try {
            const queryBuilder = this.movieRepository.createQueryBuilder('movie');

            Object.entries(criteria).forEach(([key, value]) => {
                if (value) {
                    if (key === 'yearRelease') {
                        queryBuilder.andWhere(`movie.${key} = :${key}`, { [key]: value });
                    } else {
                        queryBuilder.andWhere(`movie.${key} LIKE :${key}`, { [key]: `%${value}%` });
                    }
                }
            });

            const movies = await queryBuilder.getMany();
            return movies.map(movie => ({
                ...movie,
                imageUrl: buildImageUr(movie.image || null)
            }))
        } catch (error) {
            handleAppError(error);

        }

    }

    async getMovieById(id: number): Promise<Partial<Movie> & { imageUrl: string | null } | null> {
    
        try {
            if (isNaN(id)) {
                throw new AppError(400, 'The ID must be a valid number');
            }
            const movie = await this.movieRepository.findOne({ where: { id } });
            if (!movie) {
                throw new AppError(204, 'NO CONTENT');
            }
            return {
                ...movie,
                imageUrl: buildImageUr(movie.image || null)
            };
        } catch (error) {
            handleAppError(error);
        }
    }

    async updateMovie(id: number, movieDto: MovieDTO): Promise<Movie> {
        try {
            const movie = await this.movieRepository.findOne({ where: { id } });

            if (!movie) {
                throw new AppError(204, `NO CONTENT`);
            }

            Object.entries(movieDto).forEach(([key, value]) => {
                if (value !== undefined && key in movie) {
                    (movie as any)[key] = value;
                }
            });
            const updatedMovie = await this.movieRepository.save(movie);

            return updatedMovie;
        } catch (error) {
            handleAppError(error);
        }

    }

    async updateMovieImage(id: number, image: string): Promise<Movie> {

        try {
            const movie = await this.movieRepository.findOne({ where: { id } });

            if (!movie) {
                throw new AppError(204, 'NO CONTENT');
            }

            if (movie.image) {
                const oldImagePath = path.resolve(movie.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            movie.image = image;
            const updateMovie = await this.movieRepository.save(movie);
            return updateMovie;
        } catch (error) {
            handleAppError(error);
        }
    }

    async deleteMovie(id: number): Promise<void> {

        try {
            const movie = await this.movieRepository.findOne({ where: { id } });

            if (!movie) {
                throw new AppError(204, 'NO CONTENT');
            }

            this.movieRepository.remove(movie);
        } catch (error) {
            handleAppError(error);
        }
    }

  
}

function handleAppError(error:any): never{
    if (error instanceof AppError) {
        throw error;
    }
    throw new AppError(500, `Unexpected error: ${error}`); 
}