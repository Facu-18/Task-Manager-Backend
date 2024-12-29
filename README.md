# Task Manager

Una aplicación para gestionar tareas, donde los usuarios pueden crear, actualizar, eliminar y marcar tareas como completadas.

## Enlace a la aplicación desplegada

- **Frontend**: [https://taskmanager-prueba-tecnica.netlify.app/](https://taskmanager-prueba-tecnica.netlify.app/)  
- **Backend**: [https://task-manager-backend-msqj.onrender.com/](https://task-manager-backend-msqj.onrender.com/)

## Repositorios en GitHub

1. **Frontend**: [https://github.com/Facu-18/task-manager-frontend](https://github.com/Facu-18/task-manager-frontend)
2. **Backend**: [https://github.com/Facu-18/task-manager-backend](https://github.com/Facu-18/task-manager-backend)

## Pasos para instalar y ejecutar el proyecto localmente

### Backend

1. Clona el repositorio del backend:
   
   git clone https://github.com/tuusuario/task-manager-backend.git
   cd task-manager-backend

2.Instala las dependencias:

npm install
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno (reemplazando con tus valores):

MONGO_URI=tu_conexion_mongodb
PORT=3000
JWT_SECRET=tu_clave_secreta
FRONTEND_URL=http://localhost:5173
SWAGGER_URL=http://localhost:3000/api
Inicia el servidor:


npm start
Frontend
Clona el repositorio del frontend:

git clone https://github.com/tuusuario/task-manager-frontend.git
cd task-manager-frontend
Instala las dependencias:

npm install
Inicia la aplicación:


npm run dev
El frontend estará disponible en http://localhost:5173 por defecto.

Detalles de configuración (Variables de entorno)
Backend
En el archivo .env del backend, asegúrate de agregar las siguientes variables:

MONGO_URI: La URL de conexión a tu base de datos MongoDB.
PORT: El puerto en el que corre tu servidor (por defecto es 3000).
JWT_SECRET: Una clave secreta para la creación y validación de JWT.
FRONTEND_URL: La URL de tu frontend (si estás trabajando localmente, puede ser http://localhost:5173).
SWAGGER_URL: La URL para acceder a la documentación Swagger (por defecto es http://localhost:3000/api).
Frontend
El frontend está configurado para trabajar con el backend a través de la URL proporcionada en las variables de entorno del backend. Asegúrate de que las configuraciones de API sean correctas en tu código.

Características
Gestión de tareas: Los usuarios pueden crear, editar, eliminar y marcar tareas como completadas.
Autenticación: Utiliza JWT para la autenticación de usuarios.
Documentación de API: Accede a la documentación Swagger en https://task-manager-backend-msqj.onrender.com/api-docs/.
Tecnologías utilizadas
Frontend: React, Vite, Tailwind CSS, Redux
Backend: Node.js, Express, MongoDB, JWT, Swagger
Despliegue:
Render Backend
Netlify: Frontend
