import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorsSchema} from '@styles/common/colors';
import {useStyles} from '@hooks/Modular/use.styles';

const CandidateElectionsScreen = () => {
  const styles = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text>CandidateElectionsScreen</Text>
    </View>
  );
};

export default CandidateElectionsScreen;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
