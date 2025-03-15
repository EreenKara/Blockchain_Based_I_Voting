import React from 'react';
import {
  VirtualizedList,
  VirtualizedListProps,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import Animated, {FadeIn, BounceIn} from 'react-native-reanimated';
import styles from './virtualized.list.style';

type VirtualizedListComponentProps = Omit<
  VirtualizedListProps<string>,
  'renderItem' | 'getItem' | 'getItemCount' | 'data'
> & {
  data: any[];
  renderItem: ListRenderItem<any>;
};

const VirtualizedListComponent: React.FC<VirtualizedListComponentProps> = ({
  data,
  renderItem,
  ...virtualizedListProps
}) => {
  const getItem = (_data: any[], index: number) => data[index];
  const getItemCount = (_data: any[]) => data.length;

  const myRenderItem = (listItemProps: ListRenderItemInfo<any>) => {
    const {index} = listItemProps;
    return (
      <Animated.View entering={BounceIn.duration(1000).delay(index * 100)}>
        {renderItem(listItemProps)}
      </Animated.View>
    );
  };

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(300)}>
      <VirtualizedList
        {...virtualizedListProps}
        data={data}
        initialNumToRender={10}
        renderItem={myRenderItem}
        keyExtractor={(_, index) => index.toString()}
        getItem={getItem}
        getItemCount={getItemCount}
        showsVerticalScrollIndicator={false}
        windowSize={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={30}
      />
    </Animated.View>
  );
};

export default VirtualizedListComponent;
