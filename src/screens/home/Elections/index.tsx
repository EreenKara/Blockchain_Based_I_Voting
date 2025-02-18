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
import {SehirViewModel} from '@viewmodels/sehir.viewmodel';
import {ElectionService} from '@services/backend/concrete/election.service';
type ScreenProps = NativeStackScreenProps<HomeStackParamList>;

const ElectionsScreen: React.FC<ElectionsScreenProps> = () => {
  const [index, setIndex] = useState<number>(-1);
  const [elections, setElections] = useState<ElectionViewModel[]>([]);
  const navigation = useNavigation<ScreenProps>();
  const electionService = new ElectionService();

  const [selectedSehir, setSelectedSehir] = useState<SehirViewModel>(
    new SehirViewModel(0, ''),
  );

  const onSehirPressed = (id: number, sehir: string) => {
    setSelectedSehir(new SehirViewModel(id, sehir));
    setIndex(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await electionService.getAll();
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
            <ElectionCardComponent
              title="Popüler Seçimler"
              //items={elections}
              sehir={selectedSehir}
            />
          </View>
        </View>
        {index >= 0 && (
          <View style={styles.bottomContainer}>
            <BottomSheetComponent index={index} setIndex={setIndex}>
              <HistoryCardComponent sehir={selectedSehir} />
            </BottomSheetComponent>
          </View>
        )}
      </View>
    </>
  );
};

export default ElectionsScreen;
