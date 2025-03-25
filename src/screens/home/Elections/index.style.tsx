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
    mapContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.4,
    },
    popularElectionsContainer: {
      flex: 0.6,
      width: '100%',
      height: '100%',
    },
    header: {
      backgroundColor: colors.transition,
      padding: styleNumbers.space,
      borderBottomWidth: styleNumbers.borderWidth,
      borderBottomColor: colors.borderColor,
    },
    headerTitle: {
      textAlign: 'center',
      ...CommonStyles.textStyles.title,
      marginBottom: styleNumbers.space,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      height: '60%',
      width: '100%',
    },
  });

export default createStyles;
