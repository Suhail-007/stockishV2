import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useTheme } from 'react-native-paper';

import Colors from '../constants/colors';

const useThemeColors = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const TYPED_COLORS = Colors[colorScheme as keyof typeof Colors];
  const memoizedTheme = useMemo(
    () => ({
      ...theme,
      colors: {
        ...theme.colors,
        ...TYPED_COLORS
      }
    }),
    [TYPED_COLORS, theme]
  );

  return memoizedTheme;
};

export default useThemeColors;
