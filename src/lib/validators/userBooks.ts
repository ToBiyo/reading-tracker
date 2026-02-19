import { z } from "zod";

export const AddToListSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  externalId: z.string().min(1, "External ID is required"),
  coverUrl: z.string().min(1, "Cover URL is required"),
  userId: z.number(),
  list: z.enum(["READ", "READING", "WISHLIST"]),
});

export type AddToListInput = z.infer<typeof AddToListSchema>;
