import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MapAnimationComponent from '@components/TurkeyMap/MapAnimation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetComponent from '@components/BottomSheet/BottomSheet';
import HistoryCardComponent from '@icomponents/HistoryCard/history.card';
import ElectionCardComponent from '@icomponents/ElectionCard/election.card';
import {useNavigation} from '@react-navigation/native';
import {ElectionsScreenProps} from '@screens/type';
import {HomeStackParamList} from '@navigation/types';
import {useSearchContext} from '@contexts/search.context';
import {useElection} from '@hooks/use.election';
import {ElectionType} from '@enums/election.type';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';

type ScreenProps = NativeStackScreenProps<HomeStackParamList>;

const ElectionsScreen: React.FC<ElectionsScreenProps> = () => {
  const styles = useStyles(createStyles);
  const [index, setIndex] = useState<number>(-1);
  const navigation = useNavigation<ScreenProps>();
  const {elections, loading, fetchElections} = useElection(
    ElectionType.Popular,
  );

  const {search, updateSearch, clearSearch} = useSearchContext();

  const onSehirPressed = useCallback((sehir: string) => {
    updateSearch({city: sehir});
    setIndex(0);
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
        <View style={styles.bottomContainer}>
          <BottomSheetComponent index={index} setIndex={setIndex}>
            <HistoryCardComponent />
          </BottomSheetComponent>
        </View>
      </View>
    </>
  );
};

export default ElectionsScreen;
