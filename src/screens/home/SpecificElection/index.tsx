import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './index.style';
import {Election} from '@entities/election.entity';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import {SpecificElectionScreenProps} from '@screens/type';
import PieChartComponent from '@components/PieChart/pie.chart';
const SpecificElectionScreen: React.FC<SpecificElectionScreenProps> = ({
  route,
}) => {
  const {sehir, election} = route.params;
  const [electionData, setElectionData] = useState<any>(null);

  useEffect(() => {
    console.log(election);
  }, [election]);

  return (
    <View style={styles.container}>
      <Text>{election.name}</Text>
      <Text>{sehir.name}</Text>
      <PieChartComponent />
    </View>
  );
};

export default SpecificElectionScreen;
