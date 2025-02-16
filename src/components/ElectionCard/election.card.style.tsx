import {StyleSheet} from 'react-native';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';

export const electionCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().transition,
  },
  listContainer: {
    backgroundColor: Colors.getTheme().background,
    flex: 1,
    paddingHorizontal: styleNumbers.space,
  },
  header: {
    padding: styleNumbers.space,
    borderBottomWidth: styleNumbers.borderWidth,
    borderBottomColor: Colors.getTheme().borderColor,
  },
  headerTitle: {
    textAlign: 'center',
    ...CommonStyles.textStyles.title,
    marginBottom: styleNumbers.space,
  },
  listContent: {
    paddingVertical: styleNumbers.space,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: styleNumbers.space * 2,
  },
  emptyText: {
    ...CommonStyles.textStyles.paragraph,
    textAlign: 'center',
  },
});
