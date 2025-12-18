import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  console.error("ERROR: La variable MONGODB_URI no está definida.");
  process.exit(1);
}

/**
 * Connects to MongoDB using Mongoose
 */
export async function conectarBBDD() {
  try {
    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || 'clickerGameDB'
    });

    console.log("Conexión a MongoDB exitosa (Mongoose)");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
}

/**
 * Closes the MongoDB connection
 */
export async function cerrarBBDD() {
  try {
    await mongoose.connection.close();
    console.log("Conexión a MongoDB cerrada");
  } catch (error) {
    console.error("Error cerrando conexión:", error);
  }
}

export const DB_NAME = process.env.DB_NAME || 'clickerGameDB';
