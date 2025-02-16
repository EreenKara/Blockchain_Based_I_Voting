import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Pie, PolarChart} from 'victory-native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';

interface PieChartComponentProps {
  data?: Array<{
    label: string;
    value: number;
    color: string;
  }>;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data = [
    {label: 'A', value: 35, color: '#FF6B6B'},
    {label: 'B', value: 25, color: '#4ECDC4'},
    {label: 'C', value: 20, color: '#45B7D1'},
    {label: 'D', value: 20, color: '#96CEB4'},
  ],
}) => {
  const screenWidth = Dimensions.get('window').width;
  const chartSize = screenWidth * 0.8;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={[styles.container, {height: chartSize}]}>
        <PolarChart
          data={data}
          labelKey="label"
          valueKey="value"
          colorKey="color">
          <Pie.Chart innerRadius="40%" circleSweepDegrees={360} startAngle={0}>
            {({slice}: any) => (
              <Pie.Slice>
                <Pie.SliceAngularInset
                  angularInset={{
                    angularStrokeWidth: 2,
                    angularStrokeColor: Colors.getTheme().background,
                  }}
                />
              </Pie.Slice>
            )}
          </Pie.Chart>
        </PolarChart>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.centerContainer,
    backgroundColor: Colors.getTheme().cardBackground,
    padding: styleNumbers.space,
    borderRadius: styleNumbers.borderRadius,
    ...CommonStyles.shadowStyle,
  },
});

export default PieChartComponent;
