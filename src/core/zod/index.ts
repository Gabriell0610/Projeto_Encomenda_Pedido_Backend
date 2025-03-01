import { ZodError } from "zod";

const isZodError = (error: Error) => {
  return error instanceof ZodError;
};

const formatZodErroMessage = (error: ZodError) => {
  if (!(error instanceof ZodError)) return "";

  return error.issues
    .map((issue) => {
      const { path, message } = issue;

      return `${path.join(".")}: ${message}`;
    })
    .join(", ");
};

export { isZodError, formatZodErroMessage };
