import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API para gestionar tareas',
        },
        servers: [
            {
                url: process.env.SWAGGER_URL,
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Ruta a los archivos donde se definen las rutas
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
