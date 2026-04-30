import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './Profile.styles';

const ACTIVITY_LEVELS = [
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
  'Extra Active',
];

// Placeholder profile — will come from Supabase + Zustand
const DEFAULT_PROFILE = {
  name: 'Your Name',
  age: '25',
  calorieGoal: '2000',
  activityLevel: 'Moderately Active',
  height: "5'10\"",
  weight: '165 lbs',
};

interface Props {
  onBack: () => void;
  onLogout: () => void;
}

export default function Profile({ onBack, onLogout }: Props) {
  const [name, setName] = useState(DEFAULT_PROFILE.name);
  const [age, setAge] = useState(DEFAULT_PROFILE.age);
  const [calorieGoal, setCalorieGoal] = useState(DEFAULT_PROFILE.calorieGoal);
  const [activityLevel, setActivityLevel] = useState(DEFAULT_PROFILE.activityLevel);
  const [height, setHeight] = useState(DEFAULT_PROFILE.height);
  const [weight, setWeight] = useState(DEFAULT_PROFILE.weight);
  const [activityOpen, setActivityOpen] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [ageFocused, setAgeFocused] = useState(false);
  const [calorieFocused, setCalorieFocused] = useState(false);
  const [heightFocused, setHeightFocused] = useState(false);
  const [weightFocused, setWeightFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={20} color="#111827" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar + Name */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={48} color="#16a34a" />
          </View>
          <TextInput
            style={[styles.nameInput, nameFocused && styles.nameInputFocused]}
            value={name}
            onChangeText={setName}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
          />
        </View>

        {/* Age */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Age</Text>
          <TextInput
            style={[styles.cardInput, ageFocused && styles.cardInputFocused]}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            onFocus={() => setAgeFocused(true)}
            onBlur={() => setAgeFocused(false)}
          />
        </View>

        {/* Daily Calorie Goal */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Daily Calorie Goal</Text>
          <View style={styles.calorieRow}>
            <TextInput
              style={[styles.calorieInput, calorieFocused && styles.cardInputFocused]}
              value={calorieGoal}
              onChangeText={setCalorieGoal}
              keyboardType="number-pad"
              onFocus={() => setCalorieFocused(true)}
              onBlur={() => setCalorieFocused(false)}
            />
            <Text style={styles.calorieSuffix}>cal</Text>
          </View>
        </View>

        {/* Activity Level */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Activity Level</Text>
          <TouchableOpacity
            style={styles.activityValue}
            onPress={() => setActivityOpen((o) => !o)}
            activeOpacity={0.7}
          >
            <Text style={styles.activityValueText}>{activityLevel}</Text>
            <Ionicons
              name={activityOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#6B7280"
            />
          </TouchableOpacity>
          {activityOpen &&
            ACTIVITY_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.activityOption,
                  level === activityLevel && styles.activityOptionSelected,
                ]}
                onPress={() => {
                  setActivityLevel(level);
                  setActivityOpen(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.activityOptionText,
                    level === activityLevel && styles.activityOptionTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        {/* Physical Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Physical Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statField}>
              <Text style={styles.statLabel}>Height</Text>
              <TextInput
                style={[styles.statInput, heightFocused && styles.statInputFocused]}
                value={height}
                onChangeText={setHeight}
                onFocus={() => setHeightFocused(true)}
                onBlur={() => setHeightFocused(false)}
              />
            </View>
            <View style={styles.statField}>
              <Text style={styles.statLabel}>Weight</Text>
              <TextInput
                style={[styles.statInput, weightFocused && styles.statInputFocused]}
                value={weight}
                onChangeText={setWeight}
                onFocus={() => setWeightFocused(true)}
                onBlur={() => setWeightFocused(false)}
              />
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
