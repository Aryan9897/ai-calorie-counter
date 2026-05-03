import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './AddFood.styles';

const FOOD_ICONS = ['🍎', '🥗', '🍕', '🍔', '🥤', '🍞', '🍳', '🥑', '🍌', '🥛', '☕', '🍽️'];
const ICON_ROWS = [FOOD_ICONS.slice(0, 6), FOOD_ICONS.slice(6)];

interface FoodData {
  name: string;
  caloriesPerServing: number;
  servings: number;
  icon: string;
}

interface Props {
  initialFood?: FoodData;
  onBack: () => void;
  onSubmit: (food: FoodData) => void;
}

export default function AddFood({ initialFood, onBack, onSubmit }: Props) {
  const isEditing = !!initialFood;

  const [name, setName] = useState(initialFood?.name ?? '');
  const [calories, setCalories] = useState(initialFood?.caloriesPerServing.toString() ?? '');
  const [servings, setServings] = useState(initialFood?.servings.toString() ?? '1');
  const [selectedIcon, setSelectedIcon] = useState(initialFood?.icon ?? '🍽️');

  const handleSubmit = () => {
    if (!name.trim() || !calories) return;
    onSubmit({
      name: name.trim(),
      caloriesPerServing: parseInt(calories, 10),
      servings: parseFloat(servings) || 1,
      icon: selectedIcon,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Food' : 'Add Food'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.field}>
          <Text style={styles.label}>Food Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g., Chicken Salad"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="sentences"
            autoCorrect={false}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Calories per Serving</Text>
          <TextInput
            style={styles.input}
            value={calories}
            onChangeText={setCalories}
            placeholder="e.g., 350"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Servings</Text>
          <TextInput
            style={styles.input}
            value={servings}
            onChangeText={setServings}
            placeholder="e.g., 1"
            placeholderTextColor="#9CA3AF"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Icon</Text>
          <View style={styles.iconSection}>
            {ICON_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.iconRow}>
                {row.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[styles.iconButton, selectedIcon === icon && styles.iconButtonSelected]}
                    onPress={() => setSelectedIcon(icon)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.iconText}>{icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit} activeOpacity={0.85}>
          <Ionicons name={isEditing ? 'checkmark' : 'add'} size={20} color="#fff" />
          <Text style={styles.addButtonText}>{isEditing ? 'Update Food' : 'Add Food'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
