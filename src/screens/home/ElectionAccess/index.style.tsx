import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    padding: styleNumbers.space * 2,
    flex: 1,
  },
  headerContainer: {
    marginTop: styleNumbers.space,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  formContainer: {
    ...CommonStyles.viewStyles.container,
    flex: 1,
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
    ...CommonStyles.viewStyles.container,
    flex: 1,
    zIndex: 1000,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  groups: {
    padding: styleNumbers.space,
  },
  users: {
    marginTop: styleNumbers.space * 2,
    padding: styleNumbers.space,
    borderRadius: styleNumbers.borderRadius,
    borderWidth: 1,
    borderColor: Colors.getTheme().borderColor,
  },
  searchContainer: {
    marginTop: styleNumbers.space * 2,
    padding: styleNumbers.space,
    alignSelf: 'center',
  },
  userListContainer: {
    minHeight: 100,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  picker: {
    marginTop: styleNumbers.space,
    backgroundColor: Colors.getTheme().transition,
    borderWidth: 1,
    borderColor: Colors.getTheme().borderColor,
    borderRadius: styleNumbers.borderRadius,
  },
  button: {
    marginTop: styleNumbers.space,
  },
  reagent: {
    width: '100%',
    height: 5,
    backgroundColor: Colors.getTheme().button,
    marginVertical: styleNumbers.space * 2,
  },
});

export default styles;
