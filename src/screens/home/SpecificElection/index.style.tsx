import {Dimensions, StyleSheet} from 'react-native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    backgroundColor: Colors.getTheme().background,
    padding: styleNumbers.space,
    borderRadius: styleNumbers.borderRadius,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pieChartContainer: {},
  legendItem: {
    margin: styleNumbers.space,
    marginRight: styleNumbers.space * 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: styleNumbers.space,
  },
  candidateContainer: {
    width: '100%',
    alignItems: 'center',
  },
  candidateItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...CommonStyles.shadowStyle,
    marginBottom: styleNumbers.space * 2,
    marginTop: styleNumbers.space,
  },
  progressView: {
    width: '100%',
  },
});

export default styles;
