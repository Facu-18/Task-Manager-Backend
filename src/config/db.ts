import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI || '');
    const url = `${connection.host}:${connection.port}`;
    console.log(`MongoDB conectado en ${url}`);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso en caso de error crítico
  }
};
