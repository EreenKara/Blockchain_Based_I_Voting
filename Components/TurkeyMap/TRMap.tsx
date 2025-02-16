import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import TRMap from './TRMap.json';

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
  onPress: (id: number, sehir: string) => void;
}

const TRMapComponent = ({onPress}: TRMapComponentProps): JSX.Element => {
  const [selectedSehir, setSelectedSehir] = useState<number | null>(null);

  const handleClick = (id: number, sehir: string): void => {
    setSelectedSehir(id);
    onPress(id, sehir);
  };

  const mapData = TRMap as TRMapData;

  return (
    <Svg
      width="100%"
      height="150%"
      viewBox={`0 -150 1000 1000`}
      preserveAspectRatio="xMidYMid meet"
      fill={mapData.fill}
      stroke={mapData.stroke}
      strokeWidth={mapData.strokeWidth}>
      {mapData.sehirler.map(sehir => (
        <G
          key={sehir.id}
          onPress={() => handleClick(sehir.id, sehir.sehir)}
          fill={selectedSehir === sehir.id ? 'green' : mapData.fill}>
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
