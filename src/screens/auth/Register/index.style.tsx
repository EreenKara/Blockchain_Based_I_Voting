import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    flexGrow: 1,
  },
  input: {
    marginBottom: styleNumbers.space,
    ...CommonStyles.textStyles.paragraph,
  },
  errorText: {
    ...CommonStyles.textStyles.error,
    textAlign: 'center',
  },
  button: {
    ...CommonStyles.textStyles.paragraph,
    marginTop: styleNumbers.spaceLittle,
  },
  snackbar: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: Colors.getTheme().button,
  },
  viewTextInput: {
    marginTop: styleNumbers.spaceLarge,
  },
});

export default styles;
