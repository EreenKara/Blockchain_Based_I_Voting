import {StyleSheet} from 'react-native';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: styleNumbers.space * 2,
    justifyContent: 'center',
    backgroundColor: Colors.getTheme().background,
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
  snackbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;
