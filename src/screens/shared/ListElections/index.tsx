// src/screens/home/CurrentElectionsScreen.tsx
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import ActivityIndicatorComponent from '@shared/activity.indicator';
import ElectionCardComponent from '@icomponents/ElectionCard/election.card';
import {HomeStackParamList, ProfileStackParamList} from '@navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSearchContext} from '@contexts/search.context';
import getElectionTexts from './text.screen.type';
import {useGetElectionsFunction} from '../../../hooks/election.hook';
import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import {useElection} from '@hooks/use.election';
type ListElectionsScreenProps = NativeStackScreenProps<
  HomeStackParamList | ProfileStackParamList,
  'ListElections'
>;

const ListElectionsScreen: React.FC<ListElectionsScreenProps> = ({
  route,
  navigation,
}) => {
  const {type} = route.params;
  const {title, description, errorTitle} = getElectionTexts(type);
  const {elections, loading, fetchElections} = useElection(type);
  const {search} = useSearchContext();

  // Ekran her odaklandığında seçimleri yenile
  useFocusEffect(
    React.useCallback(() => {
      fetchElections();
    }, []),
  );
  // Her 30 saniyede bir seçimleri güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      fetchElections();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={CommonStyles.viewStyles.centerContainer}>
        <ActivityIndicatorComponent size="large" />
      </View>
    );
  }

  if (elections.length === 0) {
    return (
      <View style={CommonStyles.viewStyles.centerContainer}>
        <Text style={CommonStyles.textStyles.title}>{errorTitle}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ElectionCardComponent
        title={`${search.city} ${title}`}
        items={elections}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    backgroundColor: Colors.getTheme().background,
  },
});

export default ListElectionsScreen;
