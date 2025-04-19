import { Fragment, useMemo } from 'react';
import { Pressable } from 'react-native-gesture-handler';
import { Appbar, Icon } from 'react-native-paper';

import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';

import useThemeColors from '../../../hooks/useThemeColors';
import PageTitle from '../../PageTitle';

import productHeaderStyles from './productsHeader.styles';

const ProductsHeader = (props: BottomTabHeaderProps) => {
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      header: {
        backgroundColor: colors.background
      },
      addBtn: {
        backgroundColor: colors.primary
      }
    };
  }, [colors.background, colors.primary]);

  return (
    <Fragment>
      <Appbar.Header
        elevated
        style={[dynamicStyles.header]}>
        <PageTitle title={'Products'} />
        <Pressable
          onPress={() => router.push('/addProduct')}
          style={[productHeaderStyles.addBtn, dynamicStyles.addBtn]}>
          <Icon
            color={colors.textWhite}
            source={'plus'}
            size={20}
          />
        </Pressable>
      </Appbar.Header>
    </Fragment>
  );
};

export default ProductsHeader;
