import {StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';

interface ProgressBarProps {
  progress: number;
  height: number;
}
const ProgressBarComponent: React.FC<ProgressBarProps> = ({
  progress,
  height,
}) => {
  return <View style={[styles.container, {height: height}]}></View>;
};

export default ProgressBarComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressBar: {
    flexDirection: 'row',
    width: '100%',
  },
  progress: {
    backgroundColor: 'red',
  },
  remain: {
    backgroundColor: 'blue',
  },
});
