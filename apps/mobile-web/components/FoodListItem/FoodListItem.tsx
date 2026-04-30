import { View, Text } from 'react-native';

import { styles } from './FoodListItem.styles';

interface Props {
  name: string;
  caloriesPerServing: number;
  servings: number;
  icon?: string;
}

export default function FoodListItem({ name, caloriesPerServing, servings, icon = '🍽️' }: Props) {
  const totalCalories = caloriesPerServing * servings;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.icon}>{icon}</Text>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.meta}>
            {caloriesPerServing} cal × {servings} {servings === 1 ? 'serving' : 'servings'}
          </Text>
        </View>
      </View>
      <Text style={styles.totalCalories}>{totalCalories}</Text>
    </View>
  );
}
