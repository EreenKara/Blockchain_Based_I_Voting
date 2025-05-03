import {Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MapAnimationComponent from '@components/TurkeyMap/MapAnimation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetComponent from '@components/BottomSheet/BottomSheet';
import HistoryCardComponent from '@icomponents/HistoryCard/history.card';
import ElectionCardComponent from '@icomponents/ElectionCard/election.card';
import {HomeStackParamList} from '@navigation/types';
import {useSearchContext} from '@contexts/search.context';
import {useElection} from '@hooks/use.election';
import {ElectionType} from '@enums/election.type';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';
import {BaseElectionViewModel} from '@viewmodels/base.election.viewmodel';
import ActivityIndicatorComponent from '@screens/shared/activity.indicator';
import {Button} from 'react-native-paper';
import ButtonComponent from '@components/Button/Button';

type ElectionsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Elections'
>;

const ElectionsScreen: React.FC<ElectionsScreenProps> = () => {
  const styles = useStyles(createStyles);
  const [index, setIndex] = useState<number>(-1);
  // asagidaki baglanir baglanmaz otomatik fetch ediyor electionslari.
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
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Popüler Seçimler</Text>
            </View>
            {loading ? (
              <ActivityIndicatorComponent />
            ) : (
              <ElectionCardComponent
                title="Popüler Seçimler"
                items={elections as BaseElectionViewModel[]}
              />
            )}
          </View>
        </View>
        {search.city && index !== -1 && (
          <View style={styles.bottomContainer}>
            <BottomSheetComponent index={index} setIndex={setIndex}>
              <HistoryCardComponent />
            </BottomSheetComponent>
          </View>
        )}
      </View>
    </>
  );
};

export default ElectionsScreen;
