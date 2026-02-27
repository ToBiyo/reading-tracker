import { z } from "zod";

export const updateUserBookSchema = z
  .object({
    totalPages: z.number().int().positive().optional(),
    currentPage: z.number().int().min(0).optional(),
    rate: z.number().int().min(0).max(10).optional(),
    note: z.string().max(500).optional(),
  })
  .refine((data) => {
    return (
      data.totalPages !== undefined ||
        data.currentPage !== undefined ||
        data.rate !== undefined ||
        data.note !== undefined,
      {
        message: "At least one field must be provided for update",
      }
    );
  });
