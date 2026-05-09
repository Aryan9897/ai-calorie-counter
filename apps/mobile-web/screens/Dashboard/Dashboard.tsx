import { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  getCurrentUserId,
  getProfile,
  listEntriesForDay,
  addNewFoodAndLog,
  updateFood,
  updateEntry,
  deleteEntry,
} from '@calorie/services';
import type { EntryWithFood } from '@calorie/services';

import CircularCalorieTracker from '@/components/CircularCalorieTracker/CircularCalorieTracker';
import SwipeableFoodItem from '@/components/SwipeableFoodItem/SwipeableFoodItem';
import AddFood from '@/screens/AddFood/AddFood';
import DatePicker from '@/screens/DatePicker/DatePicker';
import { styles } from './Dashboard.styles';

interface FoodData {
  name: string;
  caloriesPerServing: number;
  servings: number;
  icon: string;
}

interface EditingEntry {
  entryId: string;
  foodId: string;
  name: string;
  caloriesPerServing: number;
  servings: number;
  icon: string;
}

interface Props {
  onProfile: () => void;
}

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function Dashboard({ onProfile }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [entries, setEntries] = useState<EntryWithFood[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodFormVisible, setFoodFormVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<EditingEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalConsumed = entries.reduce(
    (sum, e) => sum + e.food.calories_per_serving * e.servings,
    0
  );

  const loadEntries = useCallback(async (uid: string, date: Date) => {
    try {
      const data = await listEntriesForDay(uid, toLocalDateString(date));
      setEntries(data);
    } catch (e) {
      setError('Failed to load entries.');
    }
  }, []);

  useEffect(() => {
    async function init() {
      try {
        const uid = await getCurrentUserId();
        if (!uid) {
          setIsLoading(false);
          return;
        }
        const profile = await getProfile(uid);
        if (profile) setCalorieGoal(profile.daily_calorie_goal);
        setUserId(uid);
      } catch (e) {
        setError('Failed to load data.');
        setIsLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!userId) return;
    loadEntries(userId, selectedDate).finally(() => setIsLoading(false));
  }, [userId, selectedDate, loadEntries]);

  const formatDate = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const formatSubDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const openAddForm = () => {
    setEditingEntry(null);
    setFoodFormVisible(true);
  };

  const openEditForm = (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) return;
    setEditingEntry({
      entryId: entry.id,
      foodId: entry.food_id,
      name: entry.food.name,
      caloriesPerServing: entry.food.calories_per_serving,
      servings: entry.servings,
      icon: entry.food.icon,
    });
    setFoodFormVisible(true);
  };

  const closeForm = () => {
    setFoodFormVisible(false);
    setEditingEntry(null);
  };

  const handleSubmit = async (food: FoodData) => {
    if (!userId) return;
    setError(null);
    try {
      if (editingEntry) {
        await Promise.all([
          updateFood(editingEntry.foodId, {
            name: food.name,
            calories_per_serving: food.caloriesPerServing,
            icon: food.icon,
          }),
          updateEntry(editingEntry.entryId, { servings: food.servings }),
        ]);
      } else {
        await addNewFoodAndLog({
          userId,
          name: food.name,
          caloriesPerServing: food.caloriesPerServing,
          icon: food.icon,
          servings: food.servings,
          loggedOn: toLocalDateString(selectedDate),
        });
      }
      closeForm();
      await loadEntries(userId, selectedDate);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save food.');
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!userId) return;
    setError(null);
    try {
      await deleteEntry(entryId);
      await loadEntries(userId, selectedDate);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete entry.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setCalendarVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.dateLabel}>{formatDate(selectedDate)}</Text>
          <Text style={styles.dateSubLabel}>{formatSubDate(selectedDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={onProfile} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      ) : (
        <>
          <CircularCalorieTracker consumed={totalConsumed} goal={calorieGoal} />

          <ScrollView style={styles.foodSection} showsVerticalScrollIndicator={false}>
            <View style={styles.foodSectionHeader}>
              <Text style={styles.foodSectionTitle}>Today's Food</Text>
              <TouchableOpacity style={styles.addButton} onPress={openAddForm} activeOpacity={0.85}>
                <Ionicons name="add" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            {entries.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No food logged for this day</Text>
                <Text style={styles.emptySubText}>Tap the + button to add food</Text>
              </View>
            ) : (
              <View style={styles.foodList}>
                {entries.map((entry) => (
                  <SwipeableFoodItem
                    key={entry.id}
                    name={entry.food.name}
                    caloriesPerServing={entry.food.calories_per_serving}
                    servings={entry.servings}
                    icon={entry.food.icon}
                    onEdit={() => openEditForm(entry.id)}
                    onDelete={() => handleDeleteEntry(entry.id)}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </>
      )}

      <Modal
        visible={foodFormVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeForm}
      >
        <AddFood
          key={editingEntry?.entryId ?? 'new'}
          initialFood={editingEntry ? {
            name: editingEntry.name,
            caloriesPerServing: editingEntry.caloriesPerServing,
            servings: editingEntry.servings,
            icon: editingEntry.icon,
          } : undefined}
          onBack={closeForm}
          onSubmit={handleSubmit}
        />
      </Modal>

      <Modal
        visible={calendarVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <DatePicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onClose={() => setCalendarVisible(false)}
        />
      </Modal>
    </View>
  );
}
