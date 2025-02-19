import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewProps,
  TextProps,
} from 'react-native';
import {textInputStyles as styles} from './text.input.style';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';

interface TextInputComponentProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: TextInputProps['style'];
  viewStyle?: ViewProps['style'];
  labelStyle?: TextProps['style'];
  multiline?: boolean;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  label = 'baslik',
  error,
  leftIcon,
  rightIcon,
  style,
  viewStyle,
  labelStyle,
  onFocus,
  onBlur,
  placeholderTextColor = Colors.getTheme().text + '80',
  multiline = false,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
          viewStyle,
        ]}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

        <TextInput
          {...restProps}
          style={[styles.input, style]}
          onFocus={e => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
        />

        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text
            style={{
              color: Colors.getTheme().error || 'red',
              marginRight: styleNumbers.space,
            }}>
            '📈'
          </Text>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default TextInputComponent;
