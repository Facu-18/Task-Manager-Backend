import { Router } from "express";
import { validateFields } from '../middlewares/validateFields'
import { body, query, param } from 'express-validator';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController";
import { createAccount, login } from "../controllers/userController";
import { authenticate } from "../middlewares/auth";

const router = Router()

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mi nueva tarea"
 *               description:
 *                 type: string
 *                 example: "Esta es la descripción de la tarea"
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Error de validación
 */


// Ruta para crear tareas
router.post('/tasks',

    body('title')
        .notEmpty()
        .withMessage('el titulo no puede ir vacio'),
    authenticate,
    validateFields,
    createTask
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [completed, pending]
 *         description: Filtrar tareas por estado (completed o pending)
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       400:
 *         description: Error en el parámetro de consulta
 *       500:
 *         description: Error en el servidor
 */
// Ruta para obtener la lista de tareas
router.get('/tasks',
    query('status')
        .optional()
        .isIn(['completed', 'pending'])
        .withMessage('El parámetro status debe ser "completed" o "pending"'),
    authenticate,    
    validateFields,
    getTasks
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene los detalles de una tarea específica
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Detalles de la tarea
 *       404:
 *         description: Tarea no encontrada
 */

// Ruta para obtener una tarea específica
router.get('/tasks/:id',

    param('id')
        .isMongoId()
        .withMessage('El ID proporcionado no es válido'),
    authenticate,
    validateFields,
    getTaskById
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */

// Ruta para actualizar una tarea específica
router.put('/tasks/:id',

    param('id')
        .isMongoId()
        .withMessage('El ID proporcionado no es válido'),
    body('title')
        .optional()
        .notEmpty()
        .withMessage('El título no puede estar vacío'),
    body('description')
        .optional()
        .isString()
        .withMessage('La descripción debe ser un texto'),
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('El campo completed debe ser un valor booleano'),
    authenticate,    
    validateFields,
    updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */

// Ruta para eliminar una tarea específica
router.delete('/tasks/:id',

    param('id')
        .isMongoId()
        .withMessage('El ID proporcionado no es válido'),
    authenticate,
    validateFields,
    deleteTask
);
  

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una cuenta de usuario con un email y una contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */

router.post('/auth/register', 
    body('email')
    .notEmpty()
    .isEmail()
    .withMessage('El Email no es valido'),

    body('password')
    .isLength({min: 8})
    .withMessage('El Password no puede ir vacio'),
    validateFields,
    createAccount)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Autentica a un usuario con su email y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Token JWT de acceso
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Credenciales incorrectas
 */

router.post('/auth/login', 
    body('email')
    .notEmpty()
    .isEmail()
    .withMessage('El Email no es valido'),

    body('password')
    .isLength({min: 8})
    .withMessage('El Password es obligatorio'),
    validateFields,
    login)  

  /**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     summary: Verificar validez del token
 *     description: Verifica si el token JWT proporcionado es válido.
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token no válido
 */
router.get('/auth/verify-token', authenticate, (req, res) => {
    // Si el token es válido, simplemente responde con un estado 200
    res.status(200).send({ message: 'Token válido' });
});

export default router;