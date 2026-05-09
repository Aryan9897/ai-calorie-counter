import { profileInsertSchema, profileUpdateSchema } from "@calorie/schemas";
import type { ProfileInsertInput, ProfileUpdateInput } from "@calorie/schemas";
import type { Profile } from "@calorie/types";
import { getSupabase } from "./client";

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await getSupabase()
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createProfile(input: ProfileInsertInput): Promise<Profile> {
  profileInsertSchema.parse(input);
  const { data, error } = await getSupabase()
    .from("profiles")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(
  userId: string,
  patch: ProfileUpdateInput
): Promise<Profile> {
  profileUpdateSchema.parse(patch);
  const { data, error } = await getSupabase()
    .from("profiles")
    .update(patch)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
