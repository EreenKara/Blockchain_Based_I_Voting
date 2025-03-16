import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStyles} from '@hooks/Modular/use.styles';
import {ColorsSchema} from '@styles/common/colors';

const PersonalInformationScreen = () => {
  const styles = useStyles(createStyles);
  return (
    <View>
      <Text>PersonalInformationScreen</Text>
    </View>
  );
};

export default PersonalInformationScreen;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
