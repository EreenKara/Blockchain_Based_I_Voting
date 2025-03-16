import Colors, {ColorsSchema} from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {StyleSheet} from 'react-native';

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      ...CommonStyles.textStyles.subtitle,
      marginVertical: styleNumbers.space,
      textAlign: 'center',
    },
    optionsContainer: {
      width: '70%',
      flexDirection: 'row',
      paddingHorizontal: styleNumbers.space,
      flexWrap: 'wrap',
    },
    button: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    snackbar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

export default createStyles;
