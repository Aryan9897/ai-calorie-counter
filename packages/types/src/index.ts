export type { Database } from "./database";

import type { Database } from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type Food = Database["public"]["Tables"]["foods"]["Row"];
export type FoodInsert = Database["public"]["Tables"]["foods"]["Insert"];
export type FoodUpdate = Database["public"]["Tables"]["foods"]["Update"];

export type MealEntry = Database["public"]["Tables"]["meal_entries"]["Row"];
export type MealEntryInsert = Database["public"]["Tables"]["meal_entries"]["Insert"];
export type MealEntryUpdate = Database["public"]["Tables"]["meal_entries"]["Update"];
