import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Avatar} from 'react-native-paper';
import {useAuthContext} from '@contexts/index';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  MainTabParamList,
  ProfileStackParamList,
  RootStackParamList,
} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ActivityIndicatorComponent from '@shared/activity.indicator';
import MenuItemComponent from '@icomponents/MenuItem/menu.item';
import {useUserContext} from '@contexts/index';
import AvatarHeaderComponent from '@icomponents/AvatarHeader/avatar.header';
import UserViewModel from '@viewmodels/user.viewmodel';
import {User} from '@entities/user.entity';
type ScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;
type RootProps = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC<ScreenProps> = ({navigation}) => {
  const rootNavigation = useNavigation<RootProps>();
  const {logout} = useAuthContext();
  const {user, fetchUserProfile} = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      fetchUserProfile();
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    rootNavigation.navigate('Auth');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicatorComponent />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profil Başlığı */}
      <AvatarHeaderComponent
        user={user ? user : undefined}
        notifications={[
          {
            reasonTitle: 'Group Invitation',
            sender: 'Eren Kara',
            notificationCount: 1,
            time: new Date(),
            image: '',
          },
          {
            reasonTitle: 'Group Invitation',
            sender: 'Ali Eren',
            notificationCount: 2,
            time: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
            image: '',
          },
        ]}
      />
      {/* Menü Grupları */}
      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/person.png')}
          title="Kişisel Bilgiler"
          tintColor={Colors.getTheme().icon}
          onPress={() => {
            navigation.navigate('PersonalInformation');
          }}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
        <MenuItemComponent
          icon={require('@assets/images/address.png')}
          title="Adres"
          tintColor={Colors.getTheme().icon}
          onPress={() => {
            navigation.navigate('AddressInformation');
          }}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
        <MenuItemComponent
          icon={require('@assets/images/group-people.png')}
          title="Grup Oluştur"
          tintColor={Colors.getTheme().icon}
          onPress={() => {
            navigation.navigate('Groups');
          }}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
      </View>

      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/elections.png')}
          title="Oluşturduğun Seçimler"
          tintColor={Colors.getTheme().icon}
          onPress={() => {
            navigation.navigate('CreatedElections');
          }}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
        <MenuItemComponent
          icon={require('@assets/images/b-box.png')}
          title="Oy Kullandığın Seçimler"
          tintColor={Colors.getTheme().icon}
          onPress={() => {
            navigation.navigate('CastedVotes');
          }}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
        <MenuItemComponent
          icon={require('@assets/images/candidate.png')}
          title="Aday Olduğun Seçimler"
          tintColor={Colors.getTheme().icon}
          onPress={() => {
            navigation.navigate('CandidateElections');
          }}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
      </View>
      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/payment.png')}
          title="Ödeme"
          tintColor={Colors.getTheme().icon}
          onPress={() => {
            navigation.navigate('Payment');
          }}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
      </View>
      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/settings.png')}
          title="Ayarlar"
          tintColor={Colors.getTheme().icon}
          onPress={() => {
            navigation.navigate('Settings');
          }}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
      </View>

      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/logout.png')}
          imageStyle={{tintColor: Colors.getTheme().error}}
          textStyle={{color: Colors.getTheme().error}}
          title="Çıkış Yap"
          onPress={handleLogout}
          tintColor={Colors.getTheme().error}
          rightIcon={require('@assets/images/right-arrow.png')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
    paddingHorizontal: styleNumbers.space * 2,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuGroup: {
    marginTop: styleNumbers.space,
    paddingHorizontal: styleNumbers.space,
    backgroundColor: Colors.getTheme().transition,
    padding: styleNumbers.space * 2,
    borderRadius: styleNumbers.borderRadius * 2,
    borderWidth: 1,
    borderColor: Colors.getTheme().transparentColor,
  },
});

export default ProfileScreen;
