import {StyleSheet} from 'react-native';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';

export const textInputStyles = StyleSheet.create({
  container: {
    marginVertical: styleNumbers.space,
    width: '100%',
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: styleNumbers.borderWidth,
    borderColor: Colors.getTheme().borderColor,
    borderRadius: styleNumbers.borderRadius,
    backgroundColor: Colors.getTheme().background,
    ...CommonStyles.shadowStyle,
  },
  input: {
    flex: 1,
    height: styleNumbers.buttonSize,
    paddingHorizontal: styleNumbers.space,
    color: Colors.getTheme().text,
    fontSize: styleNumbers.textSize,
  },
  labelContainer: {
    position: 'absolute',
    top: -styleNumbers.buttonSize / 2,
    left: styleNumbers.space,
    backgroundColor: Colors.getTheme().background,
    paddingHorizontal: styleNumbers.space / 2,
    zIndex: 1,
  },
  label: {
    fontSize: styleNumbers.textSize * 0.85,
    color: Colors.getTheme().text,
    fontWeight: styleNumbers.fontWeight,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: styleNumbers.space / 2,
    paddingHorizontal: styleNumbers.space / 2,
  },
  error: {
    color: Colors.getTheme().error || 'red',
    fontSize: styleNumbers.textSize * 0.8,
    fontWeight: styleNumbers.fontWeight,
  },
  icon: {
    padding: styleNumbers.space,
    color: Colors.getTheme().icon,
  },
  focusedInput: {
    borderColor: Colors.getTheme().button,
  },
  errorInput: {
    borderColor: Colors.getTheme().error || 'red',
  },
});
