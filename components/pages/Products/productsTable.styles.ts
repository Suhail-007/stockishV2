import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const productsTableStyles = StyleSheet.create({
  idColumn: {
    width: moderateScale(20),
    maxWidth: moderateScale(40),
    justifyContent: 'flex-start'
  },
  menuItem: {
    borderRadius: 8,
    alignItems: 'flex-start'
  },
  menuItemCont: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    width: '100%'
  }
});

export default productsTableStyles;
