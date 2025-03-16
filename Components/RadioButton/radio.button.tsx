import Colors from '@styles/common/colors';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface RadioButtonComponentProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  label,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.selectedRadio]}>
        {selected && <View style={styles.radioInnerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.getTheme().button,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: Colors.getTheme().button,
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.getTheme().button,
  },
  label: {
    fontSize: 16,
  },
});

export default RadioButtonComponent;
