import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import TRMap from './TRMap.json';
import Colors from '@styles/common/colors';

interface Sehir {
  id: number;
  sehir: string;
  bolge: string;
  paths: Array<{
    d: string;
  }>;
}

interface TRMapData {
  fill: string;
  stroke: string;
  strokeWidth: number;
  sehirler: Sehir[];
}

interface TRMapComponentProps {
  onPress: (sehir: string) => void;
}

const TRMapComponent = ({onPress}: TRMapComponentProps): JSX.Element => {
  const [selectedSehir, setSelectedSehir] = useState<number | null>(null);

  const handleClick = (id: number, sehir: string): void => {
    setSelectedSehir(id);
    onPress(sehir);
  };

  const mapData = TRMap as TRMapData;

  return (
    <Svg
      width="100%"
      height="150%"
      viewBox={`0 -150 1000 1000`}
      preserveAspectRatio="xMidYMid meet"
      fill={Colors.getTheme().mapFill}
      stroke={Colors.getTheme().mapStroke}
      strokeWidth={mapData.strokeWidth}>
      {mapData.sehirler.map(sehir => (
        <G
          key={sehir.id}
          onPress={() => handleClick(sehir.id, sehir.sehir)}
          fill={
            selectedSehir === sehir.id
              ? Colors.getTheme().mapSelectedFill
              : Colors.getTheme().mapFill
          }
          stroke={
            selectedSehir === sehir.id
              ? Colors.getTheme().mapSelectedStroke
              : Colors.getTheme().mapStroke
          }
          strokeWidth={
            selectedSehir === sehir.id
              ? mapData.strokeWidth + 2
              : mapData.strokeWidth
          }>
          {sehir.paths.map((path, index) => (
            <Path key={index} d={path.d} />
          ))}
        </G>
      ))}
    </Svg>
  );
};

export default TRMapComponent;

const styles = StyleSheet.create({});
