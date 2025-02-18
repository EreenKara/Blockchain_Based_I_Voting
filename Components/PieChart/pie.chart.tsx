import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Pie, PolarChart} from 'victory-native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
interface PieChartComponentProps {
  data?: CandidateViewModel[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data = [
    new CandidateViewModel('1', 'A', '#FF6B6B', 35),
    new CandidateViewModel('2', 'B', '#4ECDC4', 25),
    new CandidateViewModel('3', 'C', '#45B7D1', 20),
    new CandidateViewModel('4', 'D', '#96CEB4', 10),
    new CandidateViewModel('5', 'F', '#ffffff', 10),
  ],
}) => {
  const screenWidth = Dimensions.get('window').width;
  const chartSize = screenWidth * 0.8;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={[styles.container, {height: chartSize}]}>
        <PolarChart
          data={data}
          labelKey="name"
          valueKey="votes"
          colorKey="color">
          <Pie.Chart innerRadius="40%" circleSweepDegrees={360} startAngle={0}>
            {({slice}: any) => <Pie.Slice />}
          </Pie.Chart>
        </PolarChart>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.getTheme().transition,
    padding: styleNumbers.space,
    borderRadius: styleNumbers.borderRadius,
    ...CommonStyles.shadowStyle,
  },
});

export default PieChartComponent;
