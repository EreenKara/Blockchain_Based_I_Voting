import React, {useState} from 'react';
import {View, Text, VirtualizedList, SafeAreaView} from 'react-native';
import ElectionCardItemComponent from '../ElectionCardItem/election.card.item';
import {electionCardStyles as styles} from './election.card.style';
import VirtualizedListComponent from '@components/List/virtualized.list';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {SehirViewModel} from '@viewmodels/sehir.viewmodel';
type ElectionNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const sampleItems: ElectionViewModel[] = [
  {
    id: '1',
    name: 'Seçim 1',
    description: 'Seçim 1 açıklaması',
    image: '',
    startDate: '2021-01-01',
    endDate: '2021-01-01',
  },
  {
    id: '2',
    name: 'Seçim 2',
    description: 'Seçim 2 açıklaması',
    image: '',
    startDate: '2021-01-01',
    endDate: '2021-01-01',
  },
];

interface ElectionCardComponentProps {
  title: string;
  items?: ElectionViewModel[];
  sehir: SehirViewModel;
}

const ElectionCardComponent: React.FC<ElectionCardComponentProps> = ({
  title = 'Title girin',
  sehir,
  items = sampleItems,
}) => {
  const navigation = useNavigation<ElectionNavigationProp>();

  const renderItem = ({item}: {item: ElectionViewModel}) => (
    <ElectionCardItemComponent
      election={item}
      navigatePress={() =>
        navigation.navigate('SpecificElection', {
          election: item,
          sehir: sehir,
        })
      }
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyList}>
      <Text style={styles.emptyText}>Gösterilecek seçim bulunamadı.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <VirtualizedListComponent
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        data={items}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </SafeAreaView>
  );
};

export default ElectionCardComponent;
