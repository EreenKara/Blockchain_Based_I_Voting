import {StyleSheet} from 'react-native';
import CommonStyles from '@styles/common/commonStyles';
import {ColorsSchema} from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    formContainer: {
      flex: 1,
      backgroundColor: colors.background,
      padding: styleNumbers.space * 3,
    },
    scrollContainer: {
      paddingBottom: styleNumbers.space * 4,
    },
    nameBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: styleNumbers.space * 2,
    },
    label: {
      ...CommonStyles.textStyles.subtitle,
      flex: 1,
      textAlign: 'left',
    },
    value: {
      ...CommonStyles.textStyles.subtitle,
      flex: 2,
      textAlign: 'right',
    },
  });

export default createStyles;
