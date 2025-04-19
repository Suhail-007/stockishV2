import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import useThemeColors from '../../hooks/useThemeColors';
import PageTitle from '../PageTitle';

import { HeaderProps } from './types/Header.type';

/**
 * A simple header component with a back button and title.
 *
 */
const _Header = ({ title, showBack = false, rightActions, onBackPress }: HeaderProps) => {
  const navigation = useNavigation();
  const { colors } = useThemeColors();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: colors.background }]}>
      {showBack && <Appbar.BackAction onPress={handleBack} />}
      <Appbar.Content
        title={
          <PageTitle
            containerStyles={styles.pageTitle}
            title={title}
          />
        }></Appbar.Content>
      {rightActions}
    </Appbar.Header>
  );
};

const Header = memo(_Header);

export default Header;

const styles = StyleSheet.create({
  header: {
    elevation: 0
    // marginInline: moderateScale(10)
  },
  pageTitle: {
    marginBottom: 0
  }
});
