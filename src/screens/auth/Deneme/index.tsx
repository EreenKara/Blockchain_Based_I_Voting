import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SearchBarComponent from '@components/SearchBarModal/search.bar.modal';
import ShoppingCartComponent from '@icomponents/ShoppingCart';
import SearchBarModalComponent from '@components/SearchBarModal/search.bar.modal';
import ButtonComponent from '@components/Button/Button';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AuthStackParamList, RootStackParamList} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Deneme'>;

const DenemeScreen: React.FC<Props> = ({navigation}) => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return <View style={styles.container}></View>;
};

export default DenemeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
