import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';

import useThemeColors from '../../hooks/useThemeColors';

import CustomText from './CustomText';

interface DropdownItem {
  label: string;
  value: number;
}

interface CustomDropdownProps {
  visible: boolean;
  onDismiss: () => void;
  onShow: () => void;
  items: DropdownItem[];
  selectedValue: number;
  onSelect: (value: number) => void;
}

const CustomDropdown = ({ visible, onDismiss, onShow, items, selectedValue, onSelect }: CustomDropdownProps) => {
  const { colors } = useThemeColors();

  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      contentStyle={{ backgroundColor: colors.background }}
      anchor={
        <Pressable
          onPress={onShow}
          style={({ pressed }) => [
            styles.dropdownButton,
            { backgroundColor: colors.tertiary100, opacity: pressed ? 0.7 : 1 }
          ]}>
          <CustomText style={{ color: colors.tertiary }}>
            {items.find((item) => item.value === selectedValue)?.label}
          </CustomText>
        </Pressable>
      }>
      {items.map((item) => (
        <Menu.Item
          key={item.value}
          onPress={() => {
            onSelect(item.value);
            onDismiss();
          }}
          title={item.label}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    paddingBlock: 4,
    paddingInline: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center'
  }
});

export default memo(CustomDropdown);
