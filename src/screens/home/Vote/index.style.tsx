import {ColorsSchema} from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      ...CommonStyles.textStyles.title,
      color: colors.icon,
      fontSize: styleNumbers.textSize * 3,
    },
    blank: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      width: width,
      height: (height - width) / 2,
      backgroundColor: colors.transition,
    },
    lottie: {
      width: width,
      height: width,
    },
  });

export default createStyles;
