import { Sequelize } from "sequelize-typescript";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    models: [path.resolve(__dirname, "../models")], // busca todos los modelos válidos
    logging: false,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // 👈 ignora certificados self-signed
        }
    }
});

export default async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ DB conectada y sincronizada");
  } catch (error) {
    console.error("❌ Error al conectar la BD", error);
  }
}
