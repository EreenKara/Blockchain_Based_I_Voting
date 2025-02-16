import {StyleSheet} from 'react-native';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import {Dimensions} from 'react-native';
import CommonStyles from '@styles/common/commonStyles';

const {width} = Dimensions.get('window');

export const topModalStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -10,
    left: styleNumbers.space,
    right: styleNumbers.space,
    zIndex: 1000,
  },
  toastContainer: {
    backgroundColor: Colors.getTheme().cardBackground,
    paddingVertical: styleNumbers.space,
    paddingHorizontal: styleNumbers.spaceLarge,
    borderRadius: styleNumbers.borderRadius,
    width: width - styleNumbers.space * 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...CommonStyles.shadowStyle,
  },
  toastText: {
    color: Colors.getTheme().text,
    fontSize: styleNumbers.textSize,
    flex: 1,
  },
  iconContainer: {
    marginLeft: styleNumbers.space,
  },
});
