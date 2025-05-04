import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const productsTableStyles = StyleSheet.create({
  tableContainer: {
    borderRadius: 12,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    overflow: 'hidden'
  },
  idColumn: {
    width: moderateScale(20),
    maxWidth: moderateScale(40),
    justifyContent: 'flex-start'
  },
  menuItem: {
    borderRadius: 8,
    alignItems: 'flex-start',
    marginInline: 8
  },
  menuItemCont: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    width: '100%'
  }
});

export default productsTableStyles;
