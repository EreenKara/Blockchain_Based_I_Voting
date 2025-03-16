import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorsSchema} from '@styles/common/colors';
import {useStyles} from '@hooks/Modular/use.styles';

const CastedVotesScreen = () => {
  const styles = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text>CastedVotesScreen</Text>
    </View>
  );
};

export default CastedVotesScreen;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
