import { foodInsertSchema, foodUpdateSchema } from "@calorie/schemas";
import type { FoodInsertInput, FoodUpdateInput } from "@calorie/schemas";
import type { Food } from "@calorie/types";
import { getSupabase } from "./client";

export async function listFoods(userId: string): Promise<Food[]> {
  const { data, error } = await getSupabase()
    .from("foods")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createFood(input: FoodInsertInput): Promise<Food> {
  foodInsertSchema.parse(input);
  const { data, error } = await getSupabase()
    .from("foods")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateFood(
  id: string,
  patch: FoodUpdateInput
): Promise<Food> {
  foodUpdateSchema.parse(patch);
  const { data, error } = await getSupabase()
    .from("foods")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteFood(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from("foods")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
