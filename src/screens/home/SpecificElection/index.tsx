import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Election} from '@entities/election.entity';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import {SpecificElectionScreenProps} from '@screens/type';

const SpecificElectionScreen: React.FC<SpecificElectionScreenProps> = ({
  route,
}) => {
  const {election} = route.params;
  const [electionData, setElectionData] = useState<any>(null);

  useEffect(() => {}, [election]);

  return (
    <View>
      <Text>{election.name}</Text>
    </View>
  );
};

export default SpecificElectionScreen;

const styles = StyleSheet.create({});
