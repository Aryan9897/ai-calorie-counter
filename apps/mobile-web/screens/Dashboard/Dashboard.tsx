import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CircularCalorieTracker from '@/components/CircularCalorieTracker/CircularCalorieTracker';
import FoodListItem from '@/components/FoodListItem/FoodListItem';
import AddFood from '@/screens/AddFood/AddFood';
import DatePicker from '@/screens/DatePicker/DatePicker';
import { styles } from './Dashboard.styles';

interface Props {
  onProfile: () => void;
}

export default function Dashboard({ onProfile }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addFoodVisible, setAddFoodVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [foods, setFoods] = useState<Array<{ id: string; name: string; caloriesPerServing: number; servings: number; icon?: string }>>([]);
  const calorieGoal = 0;
  const totalConsumed = foods.reduce((sum, food) => sum + food.caloriesPerServing * food.servings, 0);

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
            onPress={() => setAddFoodVisible(true)}
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

      <Modal
        visible={addFoodVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setAddFoodVisible(false)}
      >
        <AddFood
          onBack={() => setAddFoodVisible(false)}
          onAddFood={(food) => {
            setFoods((prev) => [...prev, { ...food, id: String(Date.now()) }]);
            setAddFoodVisible(false);
          }}
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
