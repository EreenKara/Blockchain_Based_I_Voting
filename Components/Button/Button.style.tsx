import {StyleSheet} from 'react-native';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';

export const buttonStyles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: styleNumbers.space * 1.5,
    paddingHorizontal: styleNumbers.space * 2,
    borderRadius: styleNumbers.borderRadius,
    minWidth: styleNumbers.buttonSize * 1.5,

    ...CommonStyles.shadowStyle,
  },
  primaryButton: {
    backgroundColor: Colors.getTheme().button,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: styleNumbers.borderWidth,
    borderColor: Colors.getTheme().button,
  },
  primaryText: {
    color: Colors.getTheme().background,
    fontSize: styleNumbers.textSize,
    fontWeight: styleNumbers.fontWeight,
  },
  outlineText: {
    color: Colors.getTheme().button,
    fontSize: styleNumbers.textSize,
    fontWeight: styleNumbers.fontWeight,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: Colors.getTheme().disabled,
  },
  icon: {
    marginRight: styleNumbers.space * 0.8,
  },
});
