import { z } from "zod";

const uuidSchema = z.object({
  id: z.string(),
});

export { uuidSchema };
