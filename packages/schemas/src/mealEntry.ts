import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const mealEntryInsertSchema = z.object({
  user_id: z.string().uuid(),
  food_id: z.string().uuid(),
  servings: z.number().positive().optional(),
  logged_on: isoDate.optional(),
});

export const mealEntryUpdateSchema = z.object({
  food_id: z.string().uuid().optional(),
  servings: z.number().positive().optional(),
  logged_on: isoDate.optional(),
});

export type MealEntryInsertInput = z.infer<typeof mealEntryInsertSchema>;
export type MealEntryUpdateInput = z.infer<typeof mealEntryUpdateSchema>;
