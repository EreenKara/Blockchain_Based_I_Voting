import React, {useState} from 'react';
import {View, Text, VirtualizedList, SafeAreaView} from 'react-native';
import ElectionCardItemComponent from '../ElectionCardItem/election.card.item';
import {electionCardStyles as styles} from './election.card.style';
import CommonStyles from '../../../styles/common/commonStyles';
import VirtualizedListComponent from '../../../Components/List/virtualized.list';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
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
}

const ElectionCardComponent: React.FC<ElectionCardComponentProps> = ({
  title = 'Title girin',
  items = sampleItems,
}) => {
  const navigation = useNavigation<ElectionNavigationProp>();

  const renderItem = ({item}: {item: ElectionViewModel}) => (
    <ElectionCardItemComponent
      id={item.id}
      name={item.name}
      description={item.description}
      image={item.image}
      startDate={item.startDate}
      endDate={item.endDate}
      navigatePress={() =>
        navigation.navigate('SpecificElection', {election: item})
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
