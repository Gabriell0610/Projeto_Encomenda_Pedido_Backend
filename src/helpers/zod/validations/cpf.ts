import { InvalidErrorsMessages } from "../../../core/error/invalid_errors";
import { z } from "zod";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";

export const cpfVlidation = z.string().refine(
  (value) => {
    if (!value) return true;

    return isValidCPF(value);
  },
  () => ({ message: InvalidErrorsMessages.INVALID_CPF }),
);
