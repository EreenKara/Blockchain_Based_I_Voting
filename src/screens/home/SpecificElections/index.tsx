import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Election} from '@entities/election.entity';

interface SpecificElectionsScreenComponentProps {
  id: number;
  cityName: string;
}

const SpecificElectionsScreenComponent: React.FC<
  SpecificElectionsScreenComponentProps
> = ({id, cityName}) => {
  return (
    <View>
      <Text>SpecificElectionsScreenComponent</Text>
    </View>
  );
};

export default SpecificElectionsScreenComponent;

const styles = StyleSheet.create({});
