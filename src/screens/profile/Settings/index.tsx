import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';
import {ColorsSchema} from '@styles/common/colors';
import {useStyles} from '@hooks/Modular/use.styles';

type ScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

const SettingsScreen: React.FC<ScreenProps> = () => {
  const styles = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
