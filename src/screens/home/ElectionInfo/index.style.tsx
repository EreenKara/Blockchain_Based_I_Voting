import {StyleSheet} from 'react-native';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';

const styles = StyleSheet.create({
  container: {
    marginTop: styleNumbers.space * 4,
    padding: styleNumbers.space,
    backgroundColor: Colors.getTheme().background,
  },
  scrollContainer: {
    paddingBottom: styleNumbers.space * 2,
  },
  inputContainer: {
    marginTop: styleNumbers.space * 2,
  },
  input: {},

  submitButton: {
    marginTop: styleNumbers.space,
  },

  addressContainer: {
    marginTop: styleNumbers.space * 2,
  },
});

export default styles;
