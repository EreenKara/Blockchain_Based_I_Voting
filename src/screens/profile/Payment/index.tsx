import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';
import ButtonComponent from '@components/Button/Button';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
type ScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Payment'>;

const PaymentScreen: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ButtonComponent
        title="Kart Ekle"
        onPress={() => navigation.navigate('AddCard')}
      />
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: styleNumbers.space * 2,
    backgroundColor: Colors.getTheme().background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
