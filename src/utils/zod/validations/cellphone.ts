import { z } from "zod";

export const cellphoneValidaton = z
  .string()
  .max(11, "O telefone possui menos de 11 caracteres")
  .min(1, "O telefone é obrigatório");
