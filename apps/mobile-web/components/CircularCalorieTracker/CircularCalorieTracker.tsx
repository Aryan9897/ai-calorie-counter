import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import {
  SIZE,
  RADIUS,
  STROKE_WIDTH,
  CIRCUMFERENCE,
  styles,
} from './CircularCalorieTracker.styles';

const CENTER = SIZE / 2;

interface Props {
  consumed: number;
  goal: number;
}

export default function CircularCalorieTracker({ consumed, goal }: Props) {
  const isOverGoal = consumed > goal;
  const remaining = goal - consumed;

  const progressPercent = Math.min((consumed / goal) * 100, 100);
  const progressOffset = CIRCUMFERENCE - (progressPercent / 100) * CIRCUMFERENCE;

  const overflowPercent = Math.min(Math.max(0, ((consumed - goal) / goal) * 100), 100);
  const overflowOffset = CIRCUMFERENCE - (overflowPercent / 100) * CIRCUMFERENCE;

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <Svg width={SIZE} height={SIZE}>
          {/* Track */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Progress */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#10b981"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${CENTER}, ${CENTER}`}
          />
          {/* Overflow */}
          {isOverGoal && (
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#ef4444"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              strokeDashoffset={overflowOffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${CENTER}, ${CENTER}`}
            />
          )}
        </Svg>

        <View style={styles.centerContent}>
          <Text style={[styles.consumed, isOverGoal && styles.consumedOver]}>
            {consumed}
          </Text>
          <Text style={styles.goalLabel}>of {goal} cal</Text>
          <Text style={[styles.remainingLabel, isOverGoal && styles.remainingLabelOver]}>
            {isOverGoal ? `${Math.abs(remaining)} over goal` : `${remaining} remaining`}
          </Text>
        </View>
      </View>
    </View>
  );
}
