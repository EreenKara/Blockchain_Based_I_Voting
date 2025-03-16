import Colors, {ColorsSchema} from '@styles/common/colors';
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
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      height: '60%',
      width: '100%',
    },
  });

export default createStyles;
