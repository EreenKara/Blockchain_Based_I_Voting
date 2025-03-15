import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RadioButtonComponent from '@components/RadioButton/radio.button';

interface OptionGroupProps {
  title: string;
  options: string[];
  onOptionSelect?: (selectedOption: string) => void;
}

const OptionGroup: React.FC<OptionGroupProps> = ({
  title,
  options,
  onOptionSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handlePress = (option: string) => {
    setSelectedOption(option);
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.groupTitle}>{title}</Text>
      {options.map(option => (
        <RadioButtonComponent
          key={option}
          label={option}
          selected={selectedOption === option}
          onPress={() => handlePress(option)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default OptionGroup;
