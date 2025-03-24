import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

const SignUp = () => {
  return (
    <View>
      <Button onPress={() => router.canGoBack() && router.back()} icon={'arrow-left'} labelStyle={{ display: 'none' }}>
        Go back
      </Button>
      <Text>SignUp</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
