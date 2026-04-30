import { Link } from 'expo-router';
import { View, Text } from 'react-native';

import { styles } from './NotFound.styles';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen</Text>
      </Link>
    </View>
  );
}
