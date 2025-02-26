import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';

const GroupScreen = () => {
  return (
    <View style={styles.container}>
      <Text>GroupScreen</Text>
    </View>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
    paddingHorizontal: styleNumbers.space * 2,
    paddingVertical: styleNumbers.space * 3,
  },
});
