import { useEffect, useRef } from 'react';
import { Animated, Easing, View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import {
  SIZE,
  RADIUS,
  STROKE_WIDTH,
  CIRCUMFERENCE,
  styles,
} from './CircularCalorieTracker.styles';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CENTER = SIZE / 2;

const TRACK_COLOR = '#DCFCE7';
const PROGRESS_COLOR = '#22C55E';
const OVER_COLOR = '#EF4444';

interface Props {
  consumed: number;
  goal: number;
}

export default function CircularCalorieTracker({ consumed, goal }: Props) {
  const safeGoal = goal > 0 ? goal : 1;
  const isOverGoal = consumed > goal && goal > 0;
  const remaining = goal - consumed;

  const fraction = Math.min(consumed / safeGoal, 1);
  const targetOffset = CIRCUMFERENCE - fraction * CIRCUMFERENCE;

  const animatedOffset = useRef(new Animated.Value(CIRCUMFERENCE)).current;

  useEffect(() => {
    Animated.timing(animatedOffset, {
      toValue: targetOffset,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [targetOffset, animatedOffset]);

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <Svg width={SIZE} height={SIZE}>
          {/* Track — faded, represents remaining */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={isOverGoal ? '#FEE2E2' : TRACK_COLOR}
            strokeWidth={STROKE_WIDTH}
          />
          {/* Progress — vivid, animates in on mount and on change */}
          <AnimatedCircle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={isOverGoal ? OVER_COLOR : PROGRESS_COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={animatedOffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${CENTER}, ${CENTER}`}
          />
        </Svg>

        <View style={styles.centerContent}>
          <Text style={[styles.consumed, isOverGoal && styles.consumedOver]}>
            {consumed}
          </Text>
          <Text style={styles.goalLabel}>
            {goal === 0 ? 'no goal set' : `of ${goal} cal`}
          </Text>
          <Text style={[styles.remainingLabel, isOverGoal && styles.remainingLabelOver]}>
            {goal === 0
              ? 'set a goal in profile'
              : isOverGoal
              ? `${Math.abs(remaining)} over goal`
              : `${remaining} remaining`}
          </Text>
        </View>
      </View>
    </View>
  );
}
