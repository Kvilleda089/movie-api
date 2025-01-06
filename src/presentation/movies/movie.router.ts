import { Request, Response, Router } from "express";
import { MovieController } from "./movie.controller";
import { UploadImage } from "../../middleware/upload-image";


const movieRouter = Router();
const movieController = new MovieController();


movieRouter.post('/', UploadImage.single("image"), (req: Request, response: Response) =>{
     movieController.createMovie(req, response);
});

movieRouter.get('/', (req: Request, response: Response)=>{
     movieController.getAllMovies(req, response);
});

movieRouter.get('/:id', (req: Request, response: Response)=>{
     movieController.getMovieById(req, response);
})

movieRouter.put('/:id', (req: Request, response:Response) =>{
     movieController.updateMovie(req, response);
});

movieRouter.put('/image/:id', UploadImage.single('image'), (req: Request, response: Response)=>{
     movieController.updatMovieImage(req, response);
});

movieRouter.delete('/:id', (req: Request, response: Response)=>{
     movieController.deleteMovie(req, response);
})
export default movieRouter;