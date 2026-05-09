import { z } from "zod";

export const ACTIVITY_LEVELS = [
  "sedentary",
  "lightly_active",
  "moderately_active",
  "very_active",
  "extra_active",
] as const;

export const WEIGHT_UNITS = ['kg', 'lb'] as const;

export const profileInsertSchema = z.object({
  user_id: z.string().uuid(),
  display_name: z.string().min(1),
  age: z.number().int().min(1).max(129),
  daily_calorie_goal: z.number().int().min(1),
  height: z.number().positive().nullable().optional(),
  weight: z.number().positive().nullable().optional(),
  weight_unit: z.enum(WEIGHT_UNITS).optional(),
  activity_level: z.enum(ACTIVITY_LEVELS).nullable().optional(),
});

export const profileUpdateSchema = z.object({
  display_name: z.string().min(1).optional(),
  age: z.number().int().min(1).max(129).optional(),
  daily_calorie_goal: z.number().int().min(1).optional(),
  height: z.number().positive().nullable().optional(),
  weight: z.number().positive().nullable().optional(),
  weight_unit: z.enum(WEIGHT_UNITS).optional(),
  activity_level: z.enum(ACTIVITY_LEVELS).nullable().optional(),
});

export type ProfileInsertInput = z.infer<typeof profileInsertSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
