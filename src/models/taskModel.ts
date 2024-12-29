import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para definir el modelo de datos
export interface ITask extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

// Esquema de MongoDB para la tarea
const TaskSchema: Schema = new Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true,
    },
    
    description: { 
      type: String, 
      default: '' 
    },
    
    completed: { 
      type: Boolean, 
      default: false },
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  }
);

// Exportar el modelo
export const Task = mongoose.model<ITask>('Task', TaskSchema);
