import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    minWidth: 200,
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

  // Compact input
  compactInput: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    width: 100,
  },

  // Calorie row
  calorieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  calorieSuffix: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Activity level trigger
  activityValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  activityValueText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  activityPlaceholder: {
    color: '#9CA3AF',
    fontWeight: '400',
  },

  // Height row: [input] ft [input] in
  heightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heightInput: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    width: 56,
    textAlign: 'center',
  },
  unitLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  // Weight row
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  unitToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  unitToggleOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  unitToggleSelected: {
    backgroundColor: '#22c55e',
  },
  unitToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  unitToggleTextSelected: {
    color: '#ffffff',
  },

  // Activity level modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalSheet: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '100%',
    overflow: 'hidden',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  modalOptionTextSelected: {
    color: '#22c55e',
    fontWeight: '600',
  },

  // Error
  error: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 12,
  },

  // Save
  saveButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
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
