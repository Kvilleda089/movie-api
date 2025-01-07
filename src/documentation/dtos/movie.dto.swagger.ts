import { MovieDTO } from "../../domain";

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the movie
 *           example: Inception
 *         description:
 *           type: string
 *           description: A brief description of the movie
 *           example: A mind-bending thriller about dream invasion.
 *         yearRelease:
 *           type: integer
 *           description: The release year of the movie
 *           example: 2010
 *         director:
 *           type: string
 *           description: The director of the movie
 *           example: Christopher Nolan
 *         gender:
 *           type: string
 *           description: The genre of the movie
 *           example: Sci-Fi
 *         duration:
 *           type: integer
 *           description: Duration of the movie in minutes
 *           example: 148
 *         calification:
 *           type: number
 *           description: The movie's rating
 *           example: 8.8
 *         availability:
 *           type: string
 *           enum:
 *             - AVAILABLE
 *             - UNAVAILABLE
 *           description: The availability status of the movie
 *           example: AVAILABLE
 *         image:
 *           type: string
 *           description: The URL of the movie's poster
 *           example: https://example.com/poster.jpg
 */
export class MovieSwaggerDTO extends MovieDTO{}