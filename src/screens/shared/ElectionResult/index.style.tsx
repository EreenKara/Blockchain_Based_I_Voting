import {ColorsSchema} from '@styles/common/colors';
import {StyleSheet} from 'react-native';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingVertical: styleNumbers.space * 2,
    },
    headerText: {
      ...CommonStyles.textStyles.title,
      textAlign: 'center',
    },
    cannon: {
      width: 100,
      height: 100,
      tintColor: colors.icon,
    },
    cannonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

export default createStyles;
