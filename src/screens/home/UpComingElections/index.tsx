// src/screens/home/UpcomingElectionsScreen.tsx
import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Title, Paragraph, Text} from 'react-native-paper';
import type {Election} from '@services/log/types';
import {useFocusEffect} from '@react-navigation/native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import ActivityIndicatorComponent from '@shared/activity.indicator';
const UpcomingElectionsScreen: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadElections = async () => {};

  useFocusEffect(
    React.useCallback(() => {
      loadElections();
    }, []),
  );

  const calculateTimeToStart = (startDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const diff = start.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} gün ${hours} saat ${minutes} dakika`;
  };

  const renderItem = ({item}: {item: Election}) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={CommonStyles.textStyles.title}>{item.title}</Title>
        <Paragraph style={CommonStyles.textStyles.paragraph}>
          {item.description}
        </Paragraph>
        <View style={styles.dateContainer}>
          <Paragraph style={CommonStyles.textStyles.paragraph}>
            Başlangıç: {new Date(item.startDate).toLocaleString('tr-TR')}
          </Paragraph>
          <Paragraph style={CommonStyles.textStyles.paragraph}>
            Bitiş: {new Date(item.endDate).toLocaleString('tr-TR')}
          </Paragraph>
        </View>
        <Text style={styles.timeToStart}>
          Başlamasına: {calculateTimeToStart(item.startDate)}
        </Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicatorComponent size="large" />
      </View>
    );
  }

  if (elections.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>Gelecek seçim bulunmamaktadır</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={elections}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadElections();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    backgroundColor: Colors.getTheme().background,
  },
  centerContainer: {
    ...CommonStyles.viewStyles.centerContainer,
  },
  listContent: {
    padding: styleNumbers.space,
  },
  card: {
    marginBottom: styleNumbers.space,
    ...CommonStyles.viewStyles.card,
  },
  dateContainer: {
    marginTop: styleNumbers.spaceLittle,
  },
  timeToStart: {
    marginTop: styleNumbers.spaceLittle,
    color: Colors.getTheme().button,
    ...CommonStyles.textStyles.subtitle,
  },
});

export default UpcomingElectionsScreen;
