import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { Application } from "express";
import { swaggerConfig } from "../config/swagger-config";


export function setupSwager(app: Application): void{
    const swaggerSpec = swaggerJsDoc(swaggerConfig);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger Documentation is available at api/docs')
}