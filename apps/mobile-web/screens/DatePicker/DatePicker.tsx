import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './DatePicker.styles';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export default function DatePicker({ selectedDate, onSelectDate, onClose }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const generateCalendarDays = (): (number | null)[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);
    while (days.length % 7 !== 0) days.push(null);

    return days;
  };

  const calendarDays = generateCalendarDays();
  const rows: (number | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    rows.push(calendarDays.slice(i, i + 7));
  }

  const dateFor = (day: number) =>
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

  const isSelected = (day: number | null) =>
    !!day && dateFor(day).toDateString() === selectedDate.toDateString();

  const isToday = (day: number | null) =>
    !!day && dateFor(day).toDateString() === today.toDateString();

  const isFuture = (day: number | null) => {
    if (!day) return false;
    const d = dateFor(day);
    d.setHours(0, 0, 0, 0);
    return d > today;
  };

  const handleSelect = (day: number) => {
    onSelectDate(dateFor(day));
    onClose();
  };

  const handleQuickSelect = (date: Date) => {
    onSelectDate(date);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={onClose} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Date</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.monthNav}>
          <TouchableOpacity
            style={styles.monthNavButton}
            onPress={() =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
            }
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          <TouchableOpacity
            style={styles.monthNavButton}
            onPress={() =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
            }
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View style={styles.dayLabelsRow}>
          {DAY_LABELS.map((label) => (
            <Text key={label} style={styles.dayLabel}>{label}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.calendarRow}>
              {row.map((day, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.dayCell,
                    isSelected(day) && styles.dayCellSelected,
                    isToday(day) && !isSelected(day) && styles.dayCellToday,
                  ]}
                  onPress={() => day && !isFuture(day) && handleSelect(day)}
                  disabled={!day || isFuture(day)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected(day) && styles.dayTextSelected,
                      isToday(day) && !isSelected(day) && styles.dayTextToday,
                      isFuture(day) && styles.dayTextFuture,
                      !day && styles.dayTextHidden,
                    ]}
                  >
                    {day ?? ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.quickSelect}>
          <TouchableOpacity
            style={styles.quickSelectButton}
            onPress={() => handleQuickSelect(new Date())}
            activeOpacity={0.7}
          >
            <Text style={styles.quickSelectText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickSelectButton}
            onPress={() => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              handleQuickSelect(yesterday);
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.quickSelectText}>Yesterday</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
