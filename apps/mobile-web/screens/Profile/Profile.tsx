import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentUserId, getProfile, updateProfile, signOut } from '@calorie/services';
import { ACTIVITY_LEVELS, WEIGHT_UNITS } from '@calorie/schemas';

import { styles } from './Profile.styles';

const ACTIVITY_DISPLAY: Record<typeof ACTIVITY_LEVELS[number], string> = {
  sedentary: 'Sedentary',
  lightly_active: 'Lightly Active',
  moderately_active: 'Moderately Active',
  very_active: 'Very Active',
  extra_active: 'Extra Active',
};

interface Props {
  onBack: () => void;
  onLogout: () => void;
}

export default function Profile({ onBack, onLogout }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [calorieGoal, setCalorieGoal] = useState('');
  const [activityLevel, setActivityLevel] = useState<typeof ACTIVITY_LEVELS[number] | ''>('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<typeof WEIGHT_UNITS[number]>('lb');
  const [activityOpen, setActivityOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const uid = await getCurrentUserId();
        if (!uid) return;
        setUserId(uid);
        const profile = await getProfile(uid);
        if (profile) {
          setName(profile.display_name);
          setAge(String(profile.age));
          setCalorieGoal(String(profile.daily_calorie_goal));
          setActivityLevel(
            profile.activity_level && (ACTIVITY_LEVELS as readonly string[]).includes(profile.activity_level)
              ? profile.activity_level as typeof ACTIVITY_LEVELS[number]
              : ''
          );
          const unit = (profile.weight_unit ?? 'lb') as typeof WEIGHT_UNITS[number];
          setWeightUnit(unit);
          if (profile.height != null) {
            const totalInches = Math.round(profile.height / 2.54);
            setHeightFt(String(Math.floor(totalInches / 12)));
            setHeightIn(String(totalInches % 12));
          }
          if (profile.weight != null) {
            const displayWeight = unit === 'lb' ? profile.weight * 2.20462 : profile.weight;
            setWeight(String(Math.round(displayWeight * 10) / 10));
          }
        }
      } catch (e) {
        setError('Failed to load profile.');
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  async function handleSave() {
    if (!userId) return;
    setError(null);
    setIsSaving(true);
    try {
      const totalCm = heightFt || heightIn
        ? Math.round((parseInt(heightFt || '0', 10) * 12 + parseInt(heightIn || '0', 10)) * 2.54)
        : null;
      const rawWeight = weight ? parseFloat(weight) : null;
      const weightKg = rawWeight != null
        ? weightUnit === 'lb' ? rawWeight * 0.453592 : rawWeight
        : null;
      await updateProfile(userId, {
        display_name: name,
        age: parseInt(age, 10),
        daily_calorie_goal: parseInt(calorieGoal, 10),
        activity_level: activityLevel || null,
        height: totalCm,
        weight: weightKg,
        weight_unit: weightUnit,
      });
      onBack();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save profile.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut();
    } finally {
      onLogout();
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

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
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />
        </View>

        {/* Age */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Age</Text>
          <TextInput
            style={styles.compactInput}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            placeholder="25"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Daily Calorie Goal */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Daily Calorie Goal</Text>
          <View style={styles.calorieRow}>
            <TextInput
              style={styles.compactInput}
              value={calorieGoal}
              onChangeText={setCalorieGoal}
              keyboardType="number-pad"
              placeholder="2000"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.calorieSuffix}>cal</Text>
          </View>
        </View>

        {/* Activity Level */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Activity Level</Text>
          <TouchableOpacity
            style={styles.activityValue}
            onPress={() => setActivityOpen(true)}
            activeOpacity={0.7}
          >
            <Text style={[styles.activityValueText, !activityLevel && styles.activityPlaceholder]}>
              {activityLevel ? ACTIVITY_DISPLAY[activityLevel] : 'Select level'}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Height */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Height</Text>
          <View style={styles.heightRow}>
            <TextInput
              style={styles.heightInput}
              value={heightFt}
              onChangeText={setHeightFt}
              keyboardType="number-pad"
              placeholder="5"
              placeholderTextColor="#9CA3AF"
              maxLength={1}
            />
            <Text style={styles.unitLabel}>ft</Text>
            <TextInput
              style={styles.heightInput}
              value={heightIn}
              onChangeText={setHeightIn}
              keyboardType="number-pad"
              placeholder="11"
              placeholderTextColor="#9CA3AF"
              maxLength={2}
            />
            <Text style={styles.unitLabel}>in</Text>
          </View>
        </View>

        {/* Weight */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Weight</Text>
          <View style={styles.weightRow}>
            <TextInput
              style={styles.compactInput}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              placeholder={weightUnit === 'lb' ? '165' : '75'}
              placeholderTextColor="#9CA3AF"
            />
            <View style={styles.unitToggle}>
              {WEIGHT_UNITS.map((u) => (
                <TouchableOpacity
                  key={u}
                  style={[styles.unitToggleOption, weightUnit === u && styles.unitToggleSelected]}
                  onPress={() => {
                    if (u === weightUnit || !weight) { setWeightUnit(u); return; }
                    const val = parseFloat(weight);
                    if (isNaN(val)) { setWeightUnit(u); return; }
                    const converted = u === 'lb' ? val * 2.20462 : val * 0.453592;
                    setWeight(String(Math.round(converted * 10) / 10));
                    setWeightUnit(u);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.unitToggleText, weightUnit === u && styles.unitToggleTextSelected]}>
                    {u}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        {/* Save */}
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          activeOpacity={0.85}
          disabled={isSaving}
        >
          {isSaving
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.saveButtonText}>Save Changes</Text>
          }
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Activity level modal */}
      <Modal
        visible={activityOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setActivityOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setActivityOpen(false)}
          activeOpacity={1}
        >
          <View style={styles.modalSheet}>
            {ACTIVITY_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                style={styles.modalOption}
                onPress={() => {
                  setActivityLevel(level);
                  setActivityOpen(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.modalOptionText,
                  level === activityLevel && styles.modalOptionTextSelected,
                ]}>
                  {ACTIVITY_DISPLAY[level]}
                </Text>
                {level === activityLevel && (
                  <Ionicons name="checkmark" size={16} color="#22c55e" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
