import { SwaggerOptions } from 'swagger-ui-express';
import { envs } from './env';

export const swaggerConfig: SwaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie API',
            description: 'API documentation for the Movie Service',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${envs.PORT}`, 
                description: 'Development server',
            },
        ],
    },
    apis: ['src/documentation/**/*.swagger.ts',
        'src/documentation/routes/*.swagger.ts'
    ], 
};