import {StyleSheet} from 'react-native';
import CommonStyles from '@styles/common/commonStyles';
import Colors, {ColorsSchema} from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    dateContainer: {
      marginTop: styleNumbers.space * 2,
    },
    title: {
      ...CommonStyles.textStyles.title,
      fontSize: styleNumbers.textSize * 2,
      textAlign: 'center',
    },
    formContainer: {
      flex: 1,
      backgroundColor: colors.background,
      padding: styleNumbers.space * 3,
    },
    scrollContainer: {
      paddingBottom: styleNumbers.space * 2,
    },
    imagePicker: {
      marginTop: styleNumbers.space * 2,
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      marginTop: styleNumbers.space * 2,
    },
    input: {},

    submitButton: {
      marginTop: styleNumbers.space,
      elevation: 0,
      width: '100%',
      alignSelf: 'flex-end',
    },

    addressContainer: {
      marginTop: styleNumbers.space * 2,
    },
    snackbar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

export default createStyles;
