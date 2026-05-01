import { StyleSheet } from 'react-native';

const GREEN = '#22c55e';
const GREEN_DARK = '#16a34a';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerBackButton: {
    padding: 8,
    marginLeft: -8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 24,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  monthNavButton: {
    padding: 8,
    borderRadius: 20,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  dayLabelsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    paddingVertical: 8,
  },
  calendarGrid: {
    gap: 2,
  },
  calendarRow: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    margin: 2,
  },
  dayCellSelected: {
    backgroundColor: GREEN,
  },
  dayCellToday: {
    backgroundColor: '#f0fdf4',
  },
  dayText: {
    fontSize: 14,
    color: '#111827',
  },
  dayTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  dayTextToday: {
    color: GREEN_DARK,
    fontWeight: '600',
  },
  dayTextFuture: {
    color: '#D1D5DB',
  },
  dayTextHidden: {
    color: 'transparent',
  },
  quickSelect: {
    marginTop: 32,
    gap: 8,
  },
  quickSelectButton: {
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  quickSelectText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
});
