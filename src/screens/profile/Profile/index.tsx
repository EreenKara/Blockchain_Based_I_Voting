import ButtonComponent from '@components/Button/Button';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Button, Card, Avatar} from 'react-native-paper';
import {useAuth} from '@contexts/index';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainTabParamList} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';

interface ProfileData {
  isCandidate: boolean;
  biography?: string;
  posts: number;
  followers: number;
  following: number;
}

type ScreenProps = NativeStackScreenProps<MainTabParamList, 'Profile'>;
type RootProps = NativeStackNavigationProp<RootStackParamList>;
const ProfileScreen: React.FC<ScreenProps> = ({navigation}) => {
  const rootNavigation = useNavigation<RootProps>();
  const [profileData, setProfileData] = useState<ProfileData>({
    isCandidate: false,
    biography: '',
    posts: 0,
    followers: 0,
    following: 0,
  });
  const {logout} = useAuth();
  const handleLogout = () => {
    logout();
    rootNavigation.navigate('Auth');
  };

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
          source={{uri: 'https://via.placeholder.com/80'}}
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
      <View>
        <ButtonComponent title="Çıkış Yap" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
  },
  header: {
    padding: styleNumbers.space,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: styleNumbers.space,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...CommonStyles.textStyles.subtitle,
    fontWeight: 'bold',
  },
  biographyCard: {
    margin: styleNumbers.space,
    ...CommonStyles.viewStyles.card,
  },
  buttonContainer: {
    padding: styleNumbers.space,
    gap: styleNumbers.space / 2,
  },
});

export default ProfileScreen;
