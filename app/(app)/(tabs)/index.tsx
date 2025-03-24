import { View } from 'react-native';
import { useSession } from '../../../ctx';
import { Text } from 'react-native-paper';

export default function Home() {
  const { signOut } = useSession();

  return (
    <View>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
