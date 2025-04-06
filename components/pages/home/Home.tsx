import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { useAppSelector } from '../../../store/store';
import PageTitle from '../../PageTitle';

const Home = () => {
  return (
    <View>
      <PageTitle showGreeting={true} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
