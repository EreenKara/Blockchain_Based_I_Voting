import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';
import {useUserContext} from '@contexts/index';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import UserViewModel from '@viewmodels/user.viewmodel';
import {User} from '@entities/user.entity';
import CenteredModalComponent from '@components/Modal/CenteredModal/centered.modal';
import NotificationItemComponent from '@icomponents/NotificationItem/notification.item';
import NotificationViewModel from '@viewmodels/notification.viewmodel';
import NotificationBellComponent from '@icomponents/NotificationBell/notification.bell';
interface AvatarHeaderComponentProps {
  user?: User;
  notifications: NotificationViewModel[];
}

const AvatarHeaderComponent = ({
  user,
  notifications,
}: AvatarHeaderComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.header}>
      <Avatar.Image
        style={styles.avatar}
        size={80}
        source={
          user?.image
            ? {uri: user.image}
            : require('@assets/images/no-avatar.png')
        }
      />
      <View style={styles.headerText}>
        <Text style={[CommonStyles.textStyles.title]}>
          {user?.name} {user?.surname}
        </Text>
        <Text style={[CommonStyles.textStyles.paragraph]}>{user?.email}</Text>
      </View>
      <NotificationBellComponent notifications={notifications} />
    </View>
  );
};

export default AvatarHeaderComponent;

const styles = StyleSheet.create({
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

  avatar: {
    zIndex: 1,
    backgroundColor: Colors.getTheme().icon,
  },
});
