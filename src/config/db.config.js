import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("ERROR: La variable MONGODB_URI no está definida.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function conectarBBDD() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
}

export function getDB(nombreBBDD) {
  return client.db(nombreBBDD);
}
