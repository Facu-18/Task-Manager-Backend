import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = [
            process.env.FRONTEND_URL, // URL de tu frontend en Netlify
        ];

        // Permitir solicitudes sin origen (por ejemplo, desde Postman)
        if (!origin || whiteList.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error('No permitido por CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permitir cookies y headers con credenciales
};
