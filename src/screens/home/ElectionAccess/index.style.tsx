import Colors, {ColorsSchema} from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {StyleSheet} from 'react-native';

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      ...CommonStyles.viewStyles.container,
      padding: styleNumbers.space * 2,
    },
    headerContainer: {
      marginTop: styleNumbers.space,
    },

    addressContainer: {
      ...CommonStyles.viewStyles.container,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    headerText: {
      ...CommonStyles.textStyles.title,
      fontSize: styleNumbers.textSize * 2,
      textAlign: 'center',
    },
    subtitle: {
      ...CommonStyles.textStyles.subtitle,
      textAlign: 'center',
      marginBottom: styleNumbers.space,
    },
    footerContainer: {
      marginTop: 'auto',
      width: '100%',
    },
    groups: {
      padding: styleNumbers.space,
    },
    users: {
      marginTop: styleNumbers.space * 2,
      padding: styleNumbers.space,
      borderRadius: styleNumbers.borderRadius,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    searchContainer: {
      marginTop: styleNumbers.space * 2,
      padding: styleNumbers.space,
      alignSelf: 'center',
    },
    userListContainer: {
      minHeight: 100,
      maxHeight: 350,
    },
    picker: {
      marginTop: styleNumbers.space,
      backgroundColor: colors.transition,
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: styleNumbers.borderRadius,
    },
    pickerListStyle: {
      maxHeight: 250,
    },
    button: {
      marginTop: styleNumbers.space,
    },
    reagent: {
      width: '100%',
      height: 5,
      backgroundColor: colors.button,
      marginVertical: styleNumbers.space * 2,
    },
  });

export default createStyles;
