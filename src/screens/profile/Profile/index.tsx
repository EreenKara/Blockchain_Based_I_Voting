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
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={
            user?.image
              ? {uri: user.image}
              : require('@assets/images/navlogo.png')
          }
        />
        <View style={styles.headerText}>
          <Text style={[CommonStyles.textStyles.title]}>
            {user?.name} {user?.surname}
          </Text>
          <Text style={[CommonStyles.textStyles.paragraph]}>{user?.email}</Text>
        </View>
      </View>

      {/* Menü Grupları */}
      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/person.png')}
          title="Kişisel Bilgiler"
          onPress={() => {}}
        />
        <MenuItemComponent
          icon={require('@assets/images/address.png')}
          title="Adres"
          onPress={() => {}}
        />
      </View>

      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/elections.png')}
          title="Oluşturduğun Seçimler"
          onPress={() => {}}
        />
        <MenuItemComponent
          icon={require('@assets/images/b-box.png')}
          title="Oy Kullandığın Seçimler"
          onPress={() => {}}
        />
        <MenuItemComponent
          icon={require('@assets/images/candidate.png')}
          title="Aday Olduğun Seçimler"
          onPress={() => {}}
        />
      </View>
      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/payment.png')}
          title="Ödeme"
          onPress={() => {
            navigation.navigate('Payment');
          }}
        />
      </View>
      <View style={styles.menuGroup}>
        <MenuItemComponent
          icon={require('@assets/images/settings.png')}
          title="Ayarlar"
          onPress={() => {}}
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
  header: {
    padding: styleNumbers.space * 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.getTheme().borderColor,
  },
  headerText: {
    marginLeft: styleNumbers.space * 2,
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
