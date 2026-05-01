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

interface Props {
  onBack: () => void;
  onAddFood: (food: {
    name: string;
    caloriesPerServing: number;
    servings: number;
    icon: string;
  }) => void;
}

export default function AddFood({ onBack, onAddFood }: Props) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [servings, setServings] = useState('1');
  const [selectedIcon, setSelectedIcon] = useState('🍽️');

  const handleAdd = () => {
    if (!name.trim() || !calories) return;
    onAddFood({
      name: name.trim(),
      caloriesPerServing: parseInt(calories, 10),
      servings: parseFloat(servings) || 1,
      icon: selectedIcon,
    });
    onBack();
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
        <Text style={styles.headerTitle}>Add Food</Text>
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
        <TouchableOpacity style={styles.addButton} onPress={handleAdd} activeOpacity={0.85}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Food</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
