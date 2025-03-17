import {StyleSheet} from 'react-native';
import styleNumbers from '@styles/common/style.numbers';
import Colors, {ColorsSchema} from '@styles/common/colors';
const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: styleNumbers.space,
      backgroundColor: colors.background,
    },
    picker: {
      marginVertical: styleNumbers.space,
      borderRadius: styleNumbers.borderRadius,
      borderWidth: 1,

      backgroundColor: colors.transition,
    },
    addCandidateButton: {
      marginTop: styleNumbers.space * 2,
    },
    headerContainer: {
      marginBottom: styleNumbers.space * 2,
    },
    headerText: {
      marginTop: styleNumbers.space * 2,
      textAlign: 'center',
    },
    button: {
      marginTop: styleNumbers.space * 2,
      marginBottom: styleNumbers.space * 2,
    },
    footerContainer: {
      marginTop: 'auto', // Bu satır eklendi
    },
  });

export default createStyles;
