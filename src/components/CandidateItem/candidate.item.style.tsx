import {StyleSheet} from 'react-native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.getTheme().transition,
    ...CommonStyles.shadowStyle,
  },
});

export default styles;
