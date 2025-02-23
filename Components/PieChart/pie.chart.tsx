import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated as RNAnimated,
  Easing,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Pie, PolarChart} from 'victory-native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';

interface PieChartComponentProps {
  chartSize?: number;
  data?: CandidateViewModel[];
}
const PieChartComponent: React.FC<PieChartComponentProps> = ({
  chartSize = 350,
  data = [
    new CandidateViewModel('1', 'A', '#FF6B6B', 35),
    new CandidateViewModel('2', 'B', '#4ECDC4', 25),
    new CandidateViewModel('3', 'C', '#45B7D1', 20),
    new CandidateViewModel('4', 'D', '#96CEB4', 10),
    new CandidateViewModel('5', 'F', '#ffffff', 10),
  ],
}) => {
  const scaleAnimation = useRef(new RNAnimated.Value(0.6)).current;
  const fadeAnimation = useRef(new RNAnimated.Value(0)).current;
  useEffect(() => {
    RNAnimated.parallel([
      RNAnimated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      RNAnimated.sequence([
        RNAnimated.timing(scaleAnimation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        RNAnimated.spring(scaleAnimation, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const chartHeight = chartSize;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RNAnimated.View
        style={[
          styles.container,
          {
            height: chartHeight,
            transform: [{scale: scaleAnimation}],
            opacity: fadeAnimation,
          },
        ]}>
        <PolarChart
          data={data}
          labelKey="name"
          valueKey="votes"
          colorKey="color">
          <Pie.Chart innerRadius="40%" circleSweepDegrees={360} startAngle={0}>
            {({slice}: any) => (
              <Pie.Slice>
                <Pie.Label color={'white'} />
              </Pie.Slice>
            )}
          </Pie.Chart>
        </PolarChart>
      </RNAnimated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.getTheme().transition,
    padding: styleNumbers.space,
  },
});

export default PieChartComponent;
