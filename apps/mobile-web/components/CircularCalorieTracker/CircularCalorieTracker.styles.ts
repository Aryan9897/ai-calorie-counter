import { StyleSheet } from 'react-native';

export const SIZE = 220;
export const RADIUS = 82;
export const STROKE_WIDTH = 22;
export const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  svgWrapper: {
    width: SIZE,
    height: SIZE,
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consumed: {
    fontSize: 40,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -1,
  },
  consumedOver: {
    color: '#DC2626',
  },
  goalLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  remainingLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
  },
  remainingLabelOver: {
    color: '#EF4444',
  },
});
