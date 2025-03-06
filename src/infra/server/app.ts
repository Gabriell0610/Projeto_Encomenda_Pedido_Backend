import express from "express";
import cors from "cors";

import { userRouter } from "./routes";
import { errorHandlerMiddleware } from "@/middlewares/error";

const app = express();

const corsOptions = {
  origin: "*", // Permite qualquer origem. Pode ser alterado para uma URL específica.
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
};

// Usando o middleware do CORS
app.use(express.json());
app.use(cors(corsOptions));

app.use(userRouter);
app.use(errorHandlerMiddleware.handle);

export default app;
