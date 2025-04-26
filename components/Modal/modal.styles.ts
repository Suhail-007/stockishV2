import { StyleSheet } from 'react-native';

const modalStyles = StyleSheet.create({
  titleContainer: {
    paddingInline: 10,
    paddingBlock: 16,
    borderBottomWidth: 1
  },
  contentContainer: {
    minHeight: 300,
    borderRadius: 5,
    marginInline: 5,
    paddingInline: 10,
    paddingBlock: 16
  },
  modalContainer: {
    borderRadius: 5,
    marginInline: 5
  },
  footerContainer: {
    paddingInline: 10,
    paddingBlock: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8
  },
  footerActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8
  }
});

export default modalStyles;
