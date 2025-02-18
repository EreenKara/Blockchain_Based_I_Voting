import {StyleSheet} from 'react-native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    backgroundColor: Colors.getTheme().background,
    padding: styleNumbers.space,
    borderRadius: styleNumbers.borderRadius,
    ...CommonStyles.shadowStyle,
  },
});

export default styles;
