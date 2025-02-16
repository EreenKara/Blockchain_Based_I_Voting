import {StyleSheet} from 'react-native';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: styleNumbers.space,
    marginHorizontal: styleNumbers.space,
    marginVertical: styleNumbers.space / 2,
    backgroundColor: Colors.getTheme().cardBackground,
    borderRadius: styleNumbers.borderRadius,
    ...CommonStyles.shadowStyle,
  },
  itemText: {
    ...CommonStyles.textStyles.paragraph,
  },
});

export default styles;
