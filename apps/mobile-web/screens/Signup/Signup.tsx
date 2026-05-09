import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signUp, createProfile, signOut } from '@calorie/services';

import { styles } from './Signup.styles';

interface Props {
  onSignup: () => void;
  onBack: () => void;
}

export default function Signup({ onSignup, onBack }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [calorieGoal, setCalorieGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup() {
    if (!name || !email || !password || !age || !calorieGoal) {
      setError('All fields are required.');
      return;
    }
    const parsedAge = parseInt(age, 10);
    const parsedGoal = parseInt(calorieGoal, 10);
    if (isNaN(parsedAge) || isNaN(parsedGoal)) {
      setError('Age and calorie goal must be valid numbers.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const { user } = await signUp(email, password);
      if (!user) throw new Error('Sign up succeeded but no user was returned.');
      try {
        await createProfile({
          user_id: user.id,
          display_name: name,
          age: parsedAge,
          daily_calorie_goal: parsedGoal,
        });
      } catch (profileErr) {
        await signOut().catch(() => {});
        throw profileErr;
      }
      onSignup();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Ionicons name="pulse" size={32} color="#fff" />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your calorie tracking journey</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="John Doe"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="25"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Daily Calorie Goal</Text>
            <TextInput
              style={styles.input}
              value={calorieGoal}
              onChangeText={setCalorieGoal}
              placeholder="2000"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
            <Text style={styles.hint}>You can adjust this later in your profile</Text>
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
            onPress={handleSignup}
            activeOpacity={0.85}
            disabled={isLoading}
          >
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.signupButtonText}>Create Account</Text>
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
