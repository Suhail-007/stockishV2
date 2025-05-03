import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

const filterStyles = StyleSheet.create({
  container: {
    gap: 16
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  pageHeader: {
    marginBottom: 0
  },

  filterCol: {
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'space-between'
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  sortMenu: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },

  menuContent: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 8,
    marginHorizontal: 0
  },

  defaultRadius: {
    borderRadius: 8
  },

  flexAll: {
    flex: 1
  },

  textInput: {
    borderWidth: 1
  },
  textInputCont: {
    padding: 8
  },

  buttonCont: {
    marginTop: scale(30)
  }
});

export default filterStyles;
