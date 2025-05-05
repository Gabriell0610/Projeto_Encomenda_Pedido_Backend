import express from "express";
import cors from "cors";

import { authRouter, cartRouter, itensRouter, userRouter } from "./routes";
import { errorHandlerMiddleware } from "../../middlewares/error";

const app = express();

// Usando o middleware do CORS
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use(itensRouter);
app.use(cartRouter);
app.use(errorHandlerMiddleware.handle);

export default app;
