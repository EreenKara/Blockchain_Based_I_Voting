import React, {useState} from 'react';
import {View, Text, VirtualizedList, SafeAreaView} from 'react-native';
import ElectionCardItemComponent from '../ElectionCardItem/election.card.item';
import {electionCardStyles as styles} from './election.card.style';
import CommonStyles from '../../../styles/common/commonStyles';
import VirtualizedListComponent from '../../../Components/List/virtualized.list';

interface CartItem {
  id: string;
  title: string;
  quantity: string;
  price: number;
  image: any;
}

const sampleItems: CartItem[] = [
  {
    id: '1',
    title: 'Lutfen items giriniz',
    quantity: '1kg, Price',
    price: 4.99,
    image: require('../../../assets/icon.png'),
  },
  {
    id: '2',

    title: 'Lutfen items giriniz',
    quantity: '4pcs, Price',
    price: 1.99,
    image: require('../../../assets/icon.png'),
  },
  {
    id: '3',
    title: 'Lutfen items giriniz',
    quantity: '12kg, Price',
    price: 3.0,
    image: require('../../../assets/icon.png'),
  },
  {
    id: '4',

    title: 'Lutfen items giriniz',
    quantity: '250gm, Price',
    price: 2.99,
    image: require('../../../assets/icon.png'),
  },
  {
    id: '5',
    title: 'Lutfen items giriniz',
    quantity: '250gm, Price',
    price: 2.99,
    image: require('../../../assets/icon.png'),
  },
  {
    id: '6',
    title: 'Lutfen items giriniz',
    quantity: '250gm, Price',
    price: 2.99,
    image: require('../../../assets/icon.png'),
  },
  {
    id: '7',
    title: 'Lutfen items giriniz',
    quantity: '250gm, Price',
    price: 2.99,
    image: require('../../../assets/icon.png'),
  },
  {
    id: '8',
    title: 'Lutfen items giriniz',
    quantity: '250gm, Price',
    price: 2.99,
    image: require('../../../assets/icon.png'),
  },
];

interface ElectionCardComponentProps {
  title: string;
  items?: CartItem[];
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, newQuantity: number) => void;
}

const ElectionCardComponent: React.FC<ElectionCardComponentProps> = ({
  title = 'Title girin',
  items = sampleItems,
  onRemoveItem,
  onUpdateQuantity,
}) => {
  const renderItem = ({item}: {item: CartItem}) => (
    <ElectionCardItemComponent
      title={item.title}
      quantity={item.quantity}
      price={item.price}
      image={item.image}
      onRemove={() => onRemoveItem?.(item.id)}
      onIncrement={() =>
        onUpdateQuantity?.(item.id, parseInt(item.quantity) + 1)
      }
      onDecrement={() =>
        onUpdateQuantity?.(item.id, parseInt(item.quantity) - 1)
      }
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyList}>
      <Text style={styles.emptyText}>Sepetinizde ürün bulunmamaktadır.</Text>
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
