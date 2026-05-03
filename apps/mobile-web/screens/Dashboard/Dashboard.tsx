import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CircularCalorieTracker from '@/components/CircularCalorieTracker/CircularCalorieTracker';
import SwipeableFoodItem from '@/components/SwipeableFoodItem/SwipeableFoodItem';
import AddFood from '@/screens/AddFood/AddFood';
import DatePicker from '@/screens/DatePicker/DatePicker';
import { styles } from './Dashboard.styles';

interface FoodItem {
  id: string;
  name: string;
  caloriesPerServing: number;
  servings: number;
  icon: string;
}

interface Props {
  onProfile: () => void;
}

export default function Dashboard({ onProfile }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodFormVisible, setFoodFormVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const calorieGoal = 0;
  const totalConsumed = foods.reduce(
    (sum, food) => sum + food.caloriesPerServing * food.servings,
    0
  );

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
    setEditingFood(null);
    setFoodFormVisible(true);
  };

  const openEditForm = (id: string) => {
    const food = foods.find((f) => f.id === id);
    if (food) {
      setEditingFood(food);
      setFoodFormVisible(true);
    }
  };

  const handleSubmit = (food: Omit<FoodItem, 'id'>) => {
    if (editingFood) {
      setFoods((prev) =>
        prev.map((f) => (f.id === editingFood.id ? { ...f, ...food } : f))
      );
    } else {
      setFoods((prev) => [...prev, { ...food, id: String(Date.now()) }]);
    }
    closeForm();
  };

  const closeForm = () => {
    setFoodFormVisible(false);
    setEditingFood(null);
  };

  const handleDeleteFood = (id: string) => {
    setFoods((prev) => prev.filter((f) => f.id !== id));
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

      <CircularCalorieTracker consumed={totalConsumed} goal={calorieGoal} />

      <ScrollView style={styles.foodSection} showsVerticalScrollIndicator={false}>
        <View style={styles.foodSectionHeader}>
          <Text style={styles.foodSectionTitle}>Today's Food</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={openAddForm}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {foods.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No food logged for this day</Text>
            <Text style={styles.emptySubText}>Tap the + button to add food</Text>
          </View>
        ) : (
          <View style={styles.foodList}>
            {foods.map((food) => (
              <SwipeableFoodItem
                key={food.id}
                name={food.name}
                caloriesPerServing={food.caloriesPerServing}
                servings={food.servings}
                icon={food.icon}
                onEdit={() => openEditForm(food.id)}
                onDelete={() => handleDeleteFood(food.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={foodFormVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeForm}
      >
        <AddFood
          key={editingFood?.id ?? 'new'}
          initialFood={editingFood ?? undefined}
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
