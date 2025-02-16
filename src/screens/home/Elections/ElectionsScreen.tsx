import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import {logService} from '@services/log/LogService';
import type {Election} from '@services/log/types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
import ButtonComponent from '@components/Button/Button';

type CurrentElectionsProps = NativeStackScreenProps<
  HomeStackParamList,
  'CurrentElections'
>;

export const CurrentElectionsScreen: React.FC<CurrentElectionsProps> = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadElections = useCallback(async () => {
    try {
      const currentElections = await logService.getCurrentElections();
      setElections(currentElections);
      setError(null);
    } catch (err) {
      setError('Seçimler yüklenirken bir hata oluştu');
      console.error('Load elections error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadElections();
  }, [loadElections]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadElections();
  }, [loadElections]);

  const calculateTimeRemaining = useCallback((endDate: string): string => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = Math.max(0, end.getTime() - now.getTime());

    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    if (days > 0) {
      return `${days} gün ${hours} saat`;
    }
    return `${hours} saat`;
  }, []);

  const handleVote = useCallback(async (electionId: string) => {
    // Oy verme işlemi için hazırlık
    console.log('Vote for election:', electionId);
  }, []);

  const renderItem = useCallback(
    ({item}: {item: Election}) => (
      <Card style={CommonStyles.viewStyles.card}>
        <Card.Content>
          <Title style={CommonStyles.textStyles.title}>{item.title}</Title>
          <Paragraph>{item.description}</Paragraph>
          <View style={styles.dateContainer}>
            <Paragraph style={styles.dateText}>
              Başlangıç: {new Date(item.startDate).toLocaleDateString('tr-TR')}
            </Paragraph>
            <Paragraph style={styles.dateText}>
              Bitiş: {new Date(item.endDate).toLocaleDateString('tr-TR')}
            </Paragraph>
          </View>
          <Paragraph style={styles.remainingTime}>
            Kalan Süre: {calculateTimeRemaining(item.endDate)}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <ButtonComponent title="Oy Ver" onPress={() => handleVote(item.id)} />
          <ButtonComponent
            title="Detaylar"
            onPress={() => console.log('Details:', item.id)}
          />
        </Card.Actions>
      </Card>
    ),
    [calculateTimeRemaining, handleVote],
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Paragraph style={styles.errorText}>{error}</Paragraph>
        <Button mode="contained" onPress={loadElections}>
          Tekrar Dene
        </Button>
      </View>
    );
  }

  if (elections.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Paragraph>Aktif seçim bulunmamaktadır</Paragraph>
        <Button
          mode="outlined"
          onPress={loadElections}
          style={styles.retryButton}>
          Yenile
        </Button>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: styleNumbers.spaceLarge,
  },
  listContent: {
    padding: styleNumbers.space,
  },
  card: {
    ...CommonStyles.shadowStyle,
    marginBottom: styleNumbers.space,
  },
  dateContainer: {
    marginVertical: styleNumbers.spaceLittle,
  },
  dateText: {
    ...CommonStyles.textStyles.paragraph,
    color: Colors.getTheme().text,
    fontSize: styleNumbers.textSize,
  },
  remainingTime: {
    color: Colors.getTheme().button,
    fontWeight: 'bold',
    marginTop: styleNumbers.spaceLittle / 2,
  },
  errorText: {
    ...CommonStyles.textStyles.paragraph,
    color: Colors.getTheme().error,
    marginBottom: styleNumbers.space,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: styleNumbers.spaceLittle,
  },
});

export default CurrentElectionsScreen;
