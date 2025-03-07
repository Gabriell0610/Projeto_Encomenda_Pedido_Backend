import { ZodError } from "zod";

const isZodError = (error: Error) => {
  return error instanceof ZodError;
};

const formatZodErroMessage = (error: ZodError) => {
  if (!(error instanceof ZodError)) return "";

  return error.issues
    .map((issue) => {
      const { path, message } = issue;
      const messageError = message || "Campo obrigatório";
      return `${path.join(".")}: ${messageError}`;
    })
    .join(", ");
};

export { isZodError, formatZodErroMessage };
