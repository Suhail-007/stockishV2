import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const Settings = () => {
  return (
    <View>
      <Text>Settings</Text>

      <Button onPress={() => router.push('../setting-user-permissions')}>Permissions</Button>
    </View>
  );
};

export default Settings;
