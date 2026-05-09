export { initSupabase } from "./client";
export { signUp, signIn, signOut, onAuthChange, getCurrentUserId } from "./auth";
export { getProfile, createProfile, updateProfile } from "./profile";
export { listFoods, createFood, updateFood, deleteFood } from "./foods";
export {
  addEntry,
  listEntriesForDay,
  updateEntry,
  deleteEntry,
  addNewFoodAndLog,
} from "./mealEntries";
export type { EntryWithFood } from "./mealEntries";
