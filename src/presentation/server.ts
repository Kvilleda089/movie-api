import express, { Application } from 'express'
import bodyParser from 'body-parser';
import { Database } from '../database/database';
import { envs } from '../config/env';
import movieRouter from './movies/movie.router';
import path from 'path';


export class Server {
 
    private app: Application;
    private port: number; 
    private database: Database;

    constructor(){
        this.app = express();
        this.port = envs.PORT;
        this.database = Database.getInstance();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        const uploadPath = path.resolve('uploads')
        this.app.use('/uploads', express.static(uploadPath))
    }

    private routes(): void {
        this.app.use('/movies', movieRouter);
    }


    public async connectionDatabase(): Promise<void>{
        try {
            await this.database.initialize();
        } catch (error) {
            throw new Error('Exiting application due to database connection');
        }
    }

    public async start(): Promise<void>{
        await this.connectionDatabase();
        this.app.listen(this.port, () => {
            console.log(`Server listening on http://localhost:${this.port}`);
        })
    }

}