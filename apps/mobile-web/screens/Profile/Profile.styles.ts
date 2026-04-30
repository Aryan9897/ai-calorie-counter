import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    margin: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 120,
  },
  nameInputFocused: {
    borderBottomColor: '#22c55e',
  },

  // Cards
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  cardInput: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingVertical: 4,
  },
  cardInputFocused: {
    borderBottomColor: '#22c55e',
  },
  calorieRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  calorieInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingVertical: 4,
  },
  calorieSuffix: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },

  // Activity level picker
  activityValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityValueText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  activityOption: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  activityOptionSelected: {
    borderBottomColor: 'transparent',
  },
  activityOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  activityOptionTextSelected: {
    color: '#22c55e',
    fontWeight: '600',
  },

  // Physical stats grid
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statField: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  statInput: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingVertical: 4,
  },
  statInputFocused: {
    borderBottomColor: '#22c55e',
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
});
