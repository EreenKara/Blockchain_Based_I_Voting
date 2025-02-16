import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import {styles} from './index.style';
import MapAnimationComponent from '@components/TurkeyMap/MapAnimation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetComponent from '@components/BottomSheet/BottomSheet';
import HistoryCardComponent from '@icomponents/HistoryCard/history.card';
import ElectionCardComponent from '@icomponents/ElectionCard/election.card';
type ElectionsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Elections'
>;
const ElectionsScreen: React.FC<ElectionsScreenProps> = () => {
  const [selectedSehirID, setSelectedSehirID] = useState<number | null>(null);
  const [selectedSehirName, setSelectedSehirName] = useState<string | null>(
    null,
  );
  const [index, setIndex] = useState<number>(-1);

  const onSehirPressed = (id: number, sehir: string) => {
    setSelectedSehirID(id);
    setSelectedSehirName(sehir);
    setIndex(0);
  };
  return (
    <>
      <View style={[styles.container, {flex: 1}]}>
        <View style={styles.mapContainer}>
          <GestureHandlerRootView>
            <MapAnimationComponent onPress={onSehirPressed} />
          </GestureHandlerRootView>
        </View>
        <View style={styles.popularElectionsContainer}>
          <View style={{flex: 1}}>
            <ElectionCardComponent title="Popüler Seçimler" />
          </View>
        </View>
        {index >= 0 && (
          <View style={styles.bottomContainer}>
            <BottomSheetComponent index={index} setIndex={setIndex}>
              <HistoryCardComponent cityName={selectedSehirName} />
            </BottomSheetComponent>
          </View>
        )}
      </View>
    </>
  );
};

export default ElectionsScreen;
