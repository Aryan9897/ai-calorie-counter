import { z } from "zod";

export const foodInsertSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string().min(1),
  calories_per_serving: z.number().min(0),
  icon: z.string().optional(),
});

export const foodUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  calories_per_serving: z.number().min(0).optional(),
  icon: z.string().optional(),
});

export type FoodInsertInput = z.infer<typeof foodInsertSchema>;
export type FoodUpdateInput = z.infer<typeof foodUpdateSchema>;
