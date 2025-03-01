import express from "express";

import { userRouter } from "./routes";
import { errorHandlerMiddleware } from "@/middlewares/error";

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(errorHandlerMiddleware.handle);

export default app;
