import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Avatar } from 'react-native-paper';

interface ProfileData {
  isCandidate: boolean;
  biography?: string;
  posts: number;
  followers: number;
  following: number;
}

const ProfileScreen: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    isCandidate: false,
    biography: '',
    posts: 0,
    followers: 0,
    following: 0
  });

  const handleEditBiography = () => {
    // Biyografi düzenleme modalını aç
  };

  const handleCreatePost = () => {
    // Post oluşturma ekranına git
  };

  const handleSettings = () => {
    // Ayarlar ekranına git
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{ uri: 'https://via.placeholder.com/80' }}
        />
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.posts}</Text>
            <Text>Gönderiler</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.followers}</Text>
            <Text>Takipçiler</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.following}</Text>
            <Text>Takip</Text>
          </View>
        </View>
      </View>

      {profileData.isCandidate && (
        <Card style={styles.biographyCard}>
          <Card.Content>
            <Text variant="titleMedium">Biyografi</Text>
            <Text>{profileData.biography}</Text>
          </Card.Content>
        </Card>
      )}

      <View style={styles.buttonContainer}>
        {profileData.isCandidate ? (
          <>
            <Button mode="contained" onPress={handleEditBiography}>
              Biyografi Düzenle
            </Button>
            <Button mode="contained" onPress={handleCreatePost}>
              Post Paylaş
            </Button>
          </>
        ) : null}
        <Button mode="outlined" onPress={handleSettings}>
          Kullanıcı Ayarları
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  biographyCard: {
    margin: 16,
  },
  buttonContainer: {
    padding: 16,
    gap: 8,
  },
});

export default ProfileScreen;