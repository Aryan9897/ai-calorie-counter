import { mealEntryInsertSchema, mealEntryUpdateSchema } from "@calorie/schemas";
import type { MealEntryInsertInput, MealEntryUpdateInput } from "@calorie/schemas";
import type { Food, MealEntry } from "@calorie/types";
import { getSupabase } from "./client";
import { createFood, deleteFood } from "./foods";

export type EntryWithFood = MealEntry & { food: Food };

export async function addEntry(input: MealEntryInsertInput): Promise<MealEntry> {
  mealEntryInsertSchema.parse(input);
  const { data, error } = await getSupabase()
    .from("meal_entries")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listEntriesForDay(
  userId: string,
  date: string
): Promise<EntryWithFood[]> {
  const { data, error } = await getSupabase()
    .from("meal_entries")
    .select("*, food:foods(*)")
    .eq("user_id", userId)
    .eq("logged_on", date)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as EntryWithFood[];
}

export async function updateEntry(
  id: string,
  patch: MealEntryUpdateInput
): Promise<MealEntry> {
  mealEntryUpdateSchema.parse(patch);
  const { data, error } = await getSupabase()
    .from("meal_entries")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEntry(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from("meal_entries")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function addNewFoodAndLog(input: {
  userId: string;
  name: string;
  caloriesPerServing: number;
  icon: string;
  servings: number;
  loggedOn: string;
}): Promise<EntryWithFood> {
  const food = await createFood({
    user_id: input.userId,
    name: input.name,
    calories_per_serving: input.caloriesPerServing,
    icon: input.icon,
  });
  try {
    const entry = await addEntry({
      user_id: input.userId,
      food_id: food.id,
      servings: input.servings,
      logged_on: input.loggedOn,
    });
    return { ...entry, food };
  } catch (err) {
    await deleteFood(food.id).catch(() => {});
    throw err;
  }
}
