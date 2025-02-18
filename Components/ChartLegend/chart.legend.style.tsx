import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonStyles from '@styles/common/commonStyles';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';

interface ChartLegendComponentProps {
  candidates: CandidateViewModel[];
}

const ChartLegendComponent: React.FC<ChartLegendComponentProps> = ({
  candidates,
}) => {
  return (
    <View style={[styles.pieChartLegend]}>
      {candidates.map((candidate, index) => (
        <View style={[styles.legendItem]}>
          <View
            style={{
              backgroundColor: candidate.color,
              height: 30,
              width: 30,
            }}></View>
          <Text style={CommonStyles.textStyles.title}>{candidate.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default ChartLegendComponent;

const styles = StyleSheet.create({
  pieChartLegend: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: styleNumbers.space,
    backgroundColor: Colors.getTheme().transition,
    ...CommonStyles.shadowStyle,
  },
  legendItem: {
    margin: styleNumbers.space,
    marginRight: styleNumbers.space * 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: styleNumbers.space,
  },
});
