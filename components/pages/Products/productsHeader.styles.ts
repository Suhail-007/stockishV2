import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const productHeaderStyles = StyleSheet.create({
  addBtn: {
    width: moderateScale(30),

    height: moderateScale(30),
    borderRadius: moderateScale(30 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10)
  }
});

export default productHeaderStyles;
