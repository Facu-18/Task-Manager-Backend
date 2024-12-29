import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = [process.env.FRONTEND_URL];

        // Permitir solicitudes sin 'origin' (Postman, herramientas internas)
        if (!origin || whiteList.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error('No permitido por CORS'));
    },
};
