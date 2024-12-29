import { Request, Response } from 'express';
import { Task } from '../models/taskModel';

// Crear una nueva tarea
export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
        });

        const savedTask = await newTask.save();

        res.status(201).json({ message: 'Tarea creada exitosamente' })
        return
    } catch (e) {
        console.error(e);
        const error = new Error('Error al crear la tarea')
        res.status(500).json({ error: error.message });
        return;
    }
};

// Obtener la lista de tareas con filtro opcional por estado
export const getTasks = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;

        // Construimos el filtro basado en el parámetro `status`
        const filter = status ? { completed: status === 'completed' } : {};

        // Obtenemos las tareas con el filtro aplicado
        const tasks = await Task.find(filter);

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

// Obtener detalles de una tarea específica
export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
};

// Actualizar los campos de una tarea (si solo se pasa "completed", solo se actualiza ese campo)
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body; // Aquí recibimos todos los campos a actualizar

    try {
        // Si solo se pasa el campo "completed", solo actualizamos ese campo
        if (updates.completed !== undefined) {
            const updatedTask = await Task.findByIdAndUpdate(
                id,
                { completed: updates.completed }, // Actualiza solo el campo "completed"
                {
                    new: true, // Devuelve el documento actualizado
                    runValidators: true, // Aplica validaciones del modelo
                }
            );

            if (!updatedTask) {
                res.status(404).json({ message: 'Tarea no encontrada' });
                return
            }

            res.status(200).json({ message: 'Tarea actualizada exitosamente', task: updatedTask });
            return
        }

        // Si no se pasó el campo "completed", actualizamos todos los campos
        const updatedTask = await Task.findByIdAndUpdate(id, updates, {
            new: true, 
            runValidators: true, 
        });

        if (!updatedTask) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return
        }

        res.status(200).json({ message: 'Tarea actualizada exitosamente', task: updatedTask });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la tarea' });
        return
    }
};

// Eliminar una tarea específica
export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }

        res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};
