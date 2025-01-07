/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: Creates a new movie and uploads an optional image.
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *            schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               description:
 *                 type: string
 *                 example: A skilled thief is given a chance to erase his past crimes by planting an idea in someone's subconscious.
 *               yearRelease:
 *                 type: integer
 *                 example: 2010
 *               director:
 *                 type: string
 *                 example: Christopher Nolan
 *               gender:
 *                 type: string
 *                 example: Sci-Fi
 *               duration:
 *                 type: integer
 *                 example: 148
 *               calification:
 *                 type: number
 *                 example: 8.8
 *               availability:
 *                 type: string
 *                 enum:
 *                   - AVAILABLE
 *                   - NOT_AVAILABLE
 *                 example: AVAILABLE
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all movies
 *     description: Retrieve a list of all movies based on optional filters.
 *     tags:
 *       - Movies
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Filter movies by title
 *         schema:
 *           type: string
 *       - name: gender
 *         in: query
 *         description: Filter movies by gender
 *         schema:
 *           type: string
 *       - name: director
 *         in: query
 *         description: Filter movies by director
 *         schema:
 *           type: string
 *       - name: yearRelease
 *         in: query
 *         description: Filter movies by release year
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     description: Retrieve a specific movie by its ID.
 *     tags:
 *       - Movies
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       204:
 *         description: No content found
 *
 *   put:
 *     summary: Update a movie
 *     description: Update the details of an existing movie.
 *     tags:
 *       - Movies
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieDTO'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       204:
 *         description: No content 
 *   delete:
 *     summary: Delete a movie
 *     description: Remove a movie by its ID.
 *     tags:
 *       - Movies
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       204:
 *         description: No content 
 *
 * /movies/image/{id}:
 *   put:
 *     summary: Update movie image
 *     description: Upload a new image for a specific movie.
 *     tags:
 *       - Movies
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image updated successfully
 */
