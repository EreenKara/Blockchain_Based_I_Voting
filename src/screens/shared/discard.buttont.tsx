import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonComponent from '@components/Button/Button';
import Colors from '@styles/common/colors';

interface DiscardButtonComponentProps {
  onPress: () => void;
}

const DiscardButtonComponent: React.FC<DiscardButtonComponentProps> = ({
  onPress,
}) => {
  return (
    <ButtonComponent style={styles.button} title="İptal Et" onPress={onPress} />
  );
};

export default DiscardButtonComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.getTheme().errorButton,
  },
});
