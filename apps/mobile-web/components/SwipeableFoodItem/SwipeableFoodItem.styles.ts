import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  editAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  deleteAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deleteActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#DC2626',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemIcon: {
    fontSize: 24,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  meta: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  totalCalories: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});
