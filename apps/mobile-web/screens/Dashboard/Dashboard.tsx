import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CircularCalorieTracker from '@/components/CircularCalorieTracker/CircularCalorieTracker';
import FoodListItem from '@/components/FoodListItem/FoodListItem';
import { styles } from './Dashboard.styles';

// Placeholder data — will be replaced by Zustand + Supabase
const CALORIE_GOAL = 2000;
const MOCK_FOODS = [
  { id: '1', name: 'Oatmeal', caloriesPerServing: 150, servings: 1, icon: '🥣' },
  { id: '2', name: 'Grilled Chicken', caloriesPerServing: 320, servings: 1.5, icon: '🍗' },
  { id: '3', name: 'Apple', caloriesPerServing: 95, servings: 1, icon: '🍎' },
];

interface Props {
  onProfile: () => void;
  onAddFood: () => void;
}

export default function Dashboard({ onProfile, onAddFood }: Props) {
  const today = new Date();
  const totalConsumed = MOCK_FOODS.reduce(
    (sum, food) => sum + food.caloriesPerServing * food.servings,
    0,
  );

  const formatDate = (date: Date) => {
    const todayDate = new Date();
    if (date.toDateString() === todayDate.toDateString()) return 'Today';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const formatSubDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.dateButton} activeOpacity={0.7}>
          <Text style={styles.dateLabel}>{formatDate(today)}</Text>
          <Text style={styles.dateSubLabel}>{formatSubDate(today)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={onProfile} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Circular Calorie Tracker */}
      <CircularCalorieTracker consumed={totalConsumed} goal={CALORIE_GOAL} />

      {/* Food List */}
      <ScrollView style={styles.foodSection} showsVerticalScrollIndicator={false}>
        <View style={styles.foodSectionHeader}>
          <Text style={styles.foodSectionTitle}>Today's Food</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAddFood} activeOpacity={0.85}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {MOCK_FOODS.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No food logged for this day</Text>
            <Text style={styles.emptySubText}>Tap the + button to add food</Text>
          </View>
        ) : (
          <View style={styles.foodList}>
            {MOCK_FOODS.map((food) => (
              <FoodListItem
                key={food.id}
                name={food.name}
                caloriesPerServing={food.caloriesPerServing}
                servings={food.servings}
                icon={food.icon}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
