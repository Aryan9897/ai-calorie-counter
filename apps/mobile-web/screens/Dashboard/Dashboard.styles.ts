import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateButton: {
    padding: 8,
    marginLeft: -8,
    borderRadius: 8,
  },
  dateLabel: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
  dateSubLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 1,
  },
  profileButton: {
    padding: 8,
    borderRadius: 999,
  },
  foodSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  foodSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  foodSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodList: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
  },
  emptySubText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 8,
  },
});
