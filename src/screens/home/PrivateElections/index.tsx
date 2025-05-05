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

type PrivateElectionsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'PrivateElections'
>;

const PrivateElectionsScreen: React.FC<PrivateElectionsScreenProps> = () => {
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
        {loading ? (
          <ActivityIndicatorComponent />
        ) : (
          <ElectionCardComponent
            title="Popüler Seçimler"
            items={elections as BaseElectionViewModel[]}
          />
        )}
      </View>
    </>
  );
};

export default PrivateElectionsScreen;
