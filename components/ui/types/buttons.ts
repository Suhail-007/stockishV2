export type TabBarButtonProps = {
  routeName: string;
  params?: Readonly<object | undefined>;
  isFocused: boolean;
  accessibilityLabel?: string;
  tabBarButtonTestID?: string;
  onPress: () => void;
  href?: string;
  onLongPress: () => void;
  label: string;
};
