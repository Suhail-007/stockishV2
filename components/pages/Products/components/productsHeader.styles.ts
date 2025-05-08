import { StyleSheet } from 'react-native';

const productHeaderStyles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 26
  },

  input: {
    fontSize: 14,
    padding: 0,
    margin: 0,
    minHeight: 20
  },

  inputCont: {
    padding: 0,
    borderRadius: 8,
    flex: 1,
    height: 40
  },

  filterCont: {
    overflow: 'hidden',
    borderRadius: 8
  },

  filterBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden'
  }
});

export default productHeaderStyles;
