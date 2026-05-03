import { useRef } from 'react';
import { Animated, PanResponder, Platform, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './SwipeableFoodItem.styles';

const THRESHOLD = 80;

interface Props {
  name: string;
  caloriesPerServing: number;
  servings: number;
  icon?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SwipeableFoodItem({
  name,
  caloriesPerServing,
  servings,
  icon = '🍽️',
  onEdit,
  onDelete,
}: Props) {
  const pan = useRef(new Animated.Value(0)).current;
  const totalCalories = caloriesPerServing * servings;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5,
      onMoveShouldSetPanResponderCapture: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5,
      onPanResponderMove: (_, { dx }) => pan.setValue(dx),
      onPanResponderRelease: (_, { dx }) => {
        const snapBack = () =>
          Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
        if (dx > THRESHOLD) {
          snapBack();
          onEdit();
        } else if (dx < -THRESHOLD) {
          snapBack();
          onDelete();
        } else {
          snapBack();
        }
      },
    })
  ).current;

  return (
    <View style={styles.wrapper}>
      {/* Background action hints — PanResponder only fires on native, not web */}
      {Platform.OS !== 'web' && (
        <View style={styles.actions}>
          <View style={styles.editAction}>
            <Ionicons name="pencil" size={16} color="#2563EB" />
            <Text style={styles.editActionText}>Edit</Text>
          </View>
          <View style={styles.deleteAction}>
            <Text style={styles.deleteActionText}>Delete</Text>
            <Ionicons name="trash-outline" size={16} color="#DC2626" />
          </View>
        </View>
      )}

      {/* Sliding foreground */}
      <Animated.View
        style={[styles.item, { transform: [{ translateX: pan }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.left}>
          <Text style={styles.itemIcon}>{icon}</Text>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.meta}>
              {caloriesPerServing} cal × {servings}{' '}
              {servings === 1 ? 'serving' : 'servings'}
            </Text>
          </View>
        </View>
        <Text style={styles.totalCalories}>{totalCalories}</Text>
      </Animated.View>
    </View>
  );
}
