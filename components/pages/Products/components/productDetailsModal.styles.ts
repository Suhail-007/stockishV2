import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  detailsContainer: {
    paddingVertical: 13,

    flexDirection: 'column',
    gap: 8
  },
  detailRow: {
    borderRadius: 8,
    overflow: 'hidden',
    paddingInline: 16,
    paddingBlock: 8
  },
  label: {
    opacity: 0.7
  },
  value: {
    fontWeight: '500'
  }
});
