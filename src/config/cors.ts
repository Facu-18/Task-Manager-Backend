import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = [process.env.FRONTEND_URL];

        // Permitir solicitudes sin origin (Postman, servicios internos) en entornos locales
        if (process.env.NODE_ENV === 'development' || origin === undefined) {
            return callback(null, true);
        }

        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },

   };
