import e, { Response, Request } from "express";
import { AppError, Movie, MovieDTO, MovieService } from "../../domain";


export class MovieController {
    private movieService = new MovieService();

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message})
        }

        return res.status(500).json({error: 'Internal server Error'});
    }


    createMovie = (req: Request, response: Response) => {
        const movieDto: MovieDTO = { ...req.body };
        const file = req.file;
        if (file) {
            movieDto.image = file.filename;
        }
        this.movieService.createMovie(movieDto)
            .then(movie => response.status(201).json(movie))
            .catch(error => {
                if (error instanceof AppError) {
                    return response.status(error.statusCode).json({ error: error.message });
                }
    
                response.status(500).json({ error: 'Internal Server Error' });
            });
    }


    getAllMovies = (req: Request, response: Response) => {

        const validKeys: (keyof Movie)[] = ['title', 'gender', 'director', 'yearRelease'];
        const criteria: Partial<Movie> = {};

        Object.entries(req.query).forEach(([key, value]) => {
            if (value && validKeys.includes(key as keyof Movie)) {
                criteria[key as keyof Movie] = key === 'yearRelease' ? Number(value) : String(value) as any;
            }
        });

        this.movieService.getAllMovies(criteria)
            .then(movies => response.status(200).json(movies))
            .catch(error => this.handleError(error, response));


    }

    getMovieById = (req: Request, response: Response) => {
        const id = +req.params.id;
        this.movieService.getMovieById(id)
            .then(movie => response.status(200).json(movie))
            .catch(error => this.handleError(error, response));
    }

    updateMovie = (req: Request, response: Response) => {
        const id = +req.params.id;
        const movieDto: MovieDTO = { ...req.body };
        this.movieService.updateMovie(id, movieDto)
            .then(movieUpdate => response.status(200).json(movieUpdate))
            .catch(error => this.handleError(error, response));
    }

    updatMovieImage = (req: Request, response: Response) => {
        const id = +req.params.id;
        if (!req.file) {
            return response.status(400).json({ message: 'No image file uploaded' });
        }
        this.movieService.updateMovieImage(id, req.file?.filename)
            .then(movieUdate => response.status(200).json(movieUdate))
            .catch(error => this.handleError(error, response));
    }

    deleteMovie = (req: Request, response: Response) => {

        const id = +req.params.id;
        this.movieService.deleteMovie(id)
            .then(() => response.status(200).json({ message: 'Delete Success' }))
            .catch(error => this.handleError(error, response));
    }
}