// src/screens/home/PastElectionsScreen.tsx
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import type {Election} from '@services/log/types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';

type Props = NativeStackScreenProps<HomeStackParamList, 'PastElections'>;

const PastElectionsScreen: React.FC<Props> = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const loadElections = async () => {};

  useEffect(() => {
    loadElections();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadElections();
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    // Burada seçilen şehre göre seçim sonuçlarını filtreleme yapılacak
    console.log('Selected city:', cityName);
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
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => console.log('View results:', item.id)}>
          Sonuçları Görüntüle
        </Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => setShowMap(!showMap)}
        style={styles.mapButton}>
        {showMap ? 'Listeyi Göster' : 'Haritadan Seç'}
      </Button>
      (
      <FlatList
        data={elections}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      )
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
  mapContainer: {
    flex: 1,
    backgroundColor: Colors.getTheme().cardBackground,
  },
  card: {
    marginBottom: styleNumbers.space,
    ...CommonStyles.viewStyles.card,
  },
  dateContainer: {
    marginTop: styleNumbers.spaceLittle,
  },
  mapButton: {
    margin: styleNumbers.space,
  },
  cityCard: {
    margin: styleNumbers.space,
    ...CommonStyles.viewStyles.card,
  },
  infoCard: {
    margin: styleNumbers.space,
    marginBottom: styleNumbers.spaceLarge,
  },
  input: {
    margin: styleNumbers.space,
    backgroundColor: Colors.getTheme().cardBackground,
  },
  button: {
    margin: styleNumbers.space,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
  },
});

export default PastElectionsScreen;
