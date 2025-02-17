import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styles} from './index.style';
import MapAnimationComponent from '@components/TurkeyMap/MapAnimation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetComponent from '@components/BottomSheet/BottomSheet';
import HistoryCardComponent from '@icomponents/HistoryCard/history.card';
import ElectionCardComponent from '@icomponents/ElectionCard/election.card';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {Election} from '@entities/election.entity';
import {ElectionsScreenProps} from '@screens/type';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {HomeStackParamList} from '@navigation/types';

type ScreenProps = NativeStackScreenProps<HomeStackParamList>;

const ElectionsScreen: React.FC<ElectionsScreenProps> = () => {
  const [selectedSehirID, setSelectedSehirID] = useState<number>(0);
  const [selectedSehirName, setSelectedSehirName] = useState<string>('');
  const [index, setIndex] = useState<number>(-1);
  const [elections, setElections] = useState<ElectionViewModel[]>([]);
  const navigation = useNavigation<ScreenProps>();

  const onSehirPressed = (id: number, sehir: string) => {
    setSelectedSehirID(id);
    setSelectedSehirName(sehir);
    setIndex(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/sehirler`);
        const data = await response.json();
        const electionViewModels = data.map(
          (election: Election) => new ElectionViewModel(election),
        );
        setElections(electionViewModels);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
            <ElectionCardComponent title="Popüler Seçimler" items={elections} />
          </View>
        </View>
        {index >= 0 && (
          <View style={styles.bottomContainer}>
            <BottomSheetComponent index={index} setIndex={setIndex}>
              <HistoryCardComponent
                cityId={selectedSehirID}
                cityName={selectedSehirName}
              />
            </BottomSheetComponent>
          </View>
        )}
      </View>
    </>
  );
};

export default ElectionsScreen;
