import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import router from './routes/router'
import { swaggerUi, swaggerSpec } from './config/swagger';
import { corsConfig } from './config/cors';

const app = express();

dotenv.config();

// Middlewares
app.use(cors(corsConfig));
app.use(express.json());

// Conectar a MongoDB
connectDB()

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', router);

// Iniciar servidor
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
