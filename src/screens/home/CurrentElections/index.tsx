// src/screens/home/CurrentElectionsScreen.tsx
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import {logService} from '@services/log/LogService';
import type {Election} from '@services/log/types';
import {useFocusEffect} from '@react-navigation/native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import ActivityIndicatorComponent from '@shared/activity.indicator';
import ButtonComponent from '@components/Button/Button';

const CurrentElectionsScreen: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadElections = async () => {
    try {
      const currentElections = await logService.getCurrentElections();
      setElections(currentElections);
    } catch (error) {
      console.error('Error loading elections:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Ekran her odaklandığında seçimleri yenile
  useFocusEffect(
    React.useCallback(() => {
      loadElections();
    }, []),
  );

  // Her 30 saniyede bir seçimleri güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      loadElections();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} gün ${hours} saat ${minutes} dakika`;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadElections();
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
            Başlangıç: {new Date(item.startDate).toLocaleDateString('tr-TR')}
          </Paragraph>
          <Paragraph style={CommonStyles.textStyles.paragraph}>
            Bitiş: {new Date(item.endDate).toLocaleDateString('tr-TR')}
          </Paragraph>
        </View>
        <Text style={styles.remainingTime}>
          Kalan Süre: {calculateTimeRemaining(item.endDate)}
        </Text>
      </Card.Content>
      <Card.Actions>
        <ButtonComponent
          title="Oy Ver"
          onPress={() => console.log('Vote for:', item.id)}
        />
        <ButtonComponent
          title="Detaylar"
          variant="outline"
          onPress={() => console.log('Details:', item.id)}
        />
      </Card.Actions>
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
        <Text style={CommonStyles.textStyles.title}>
          Aktif seçim bulunmamaktadır
        </Text>
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
        onRefresh={handleRefresh}
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
  remainingTime: {
    marginTop: styleNumbers.spaceLittle,
    color: Colors.getTheme().button,
    ...CommonStyles.textStyles.subtitle,
  },
});

export default CurrentElectionsScreen;
