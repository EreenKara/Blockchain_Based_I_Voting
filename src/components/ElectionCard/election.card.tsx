import React, {useState} from 'react';
import {View, Text, SafeAreaView, ListRenderItem} from 'react-native';
import ElectionCardItemComponent from '../ElectionCardItem/election.card.item';
import {electionCardStyles as styles} from './election.card.style';
import VirtualizedListComponent from '@components/List/virtualized.list';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
type ElectionNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const sampleItems: LightElectionViewModel[] = [
  {
    id: '1',
    name: 'Seçim 1',
    description: 'Seçim 1 açıklaması',
    image: '',
    startDate: '2021-01-01',
    endDate: '2021-01-01',
    city: 'İstanbul',
    color: '#000000',
  },
  {
    id: '2',
    name: 'Seçim 2',
    description: 'Seçim 2 açıklaması',
    image: '',
    startDate: '2021-01-01',
    endDate: '2021-01-01',
    city: 'İstanbul',
    color: '#000000',
  },
];

interface ElectionCardComponentProps {
  title: string;
  renderItem?: ListRenderItem<any>;
  items?: LightElectionViewModel[];
}

const ElectionCardComponent: React.FC<ElectionCardComponentProps> = ({
  title = 'Title girin',
  renderItem,
  items = sampleItems,
}) => {
  const navigation = useNavigation<ElectionNavigationProp>();

  const defaultRenderItem = ({item}: {item: LightElectionViewModel}) => (
    <ElectionCardItemComponent
      election={item}
      navigatePress={() =>
        navigation.navigate('SpecificElection', {
          election: item,
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
        renderItem={renderItem ? renderItem : defaultRenderItem}
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
