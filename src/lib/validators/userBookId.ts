import { z } from "zod";

export const deleteUserBookSchema = z.object({
  userBookId: z.number().int().positive(),
});
