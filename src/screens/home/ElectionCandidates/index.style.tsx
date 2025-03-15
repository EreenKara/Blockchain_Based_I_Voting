import {StyleSheet} from 'react-native';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: styleNumbers.space,
    backgroundColor: Colors.getTheme().background,
  },
  picker: {
    marginVertical: styleNumbers.space,
    borderRadius: styleNumbers.borderRadius,
    borderWidth: 1,

    borderColor: Colors.getTheme().borderColor,
    backgroundColor: Colors.getTheme().transition,
  },
  addCandidateButton: {
    marginTop: styleNumbers.space * 2,
  },
  headerContainer: {
    marginBottom: styleNumbers.space * 2,
  },
  headerText: {
    marginTop: styleNumbers.space * 2,
    textAlign: 'center',
  },
  button: {
    marginTop: styleNumbers.space * 2,
    marginBottom: styleNumbers.space * 2,
  },
});

export default styles;
