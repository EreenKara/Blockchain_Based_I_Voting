import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';

type ScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

const SettingsScreen: React.FC<ScreenProps> = () => {
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
