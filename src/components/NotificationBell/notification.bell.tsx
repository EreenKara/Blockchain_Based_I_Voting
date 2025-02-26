import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import NotificationViewModel from '@viewmodels/notification.viewmodel';
import CenteredModalComponent from '@components/Modal/CenteredModal/centered.modal';
import NotificationItemComponent from '@icomponents/NotificationItem/notification.item';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
interface NotificationBellComponentProps {
  notifications: NotificationViewModel[];
}

const NotificationBellComponent = ({
  notifications,
}: NotificationBellComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={styles.headerRight}>
        <Image
          style={styles.bellIcon}
          source={require('@assets/images/bell.png')}
        />
        {notifications.length > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{notifications.length}</Text>
          </View>
        )}
      </TouchableOpacity>
      <CenteredModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {notifications.map((notification, index) => (
          <NotificationItemComponent
            key={index}
            reasonTitle={notification.reasonTitle}
            sender={notification.sender}
            notificationCount={notification.notificationCount}
            time={notification.time}
            image={notification.image}
          />
        ))}
      </CenteredModalComponent>
    </>
  );
};

export default NotificationBellComponent;

const styles = StyleSheet.create({
  headerRight: {
    marginLeft: 'auto',
  },
  bellIcon: {
    tintColor: Colors.getTheme().icon,
    width: styleNumbers.iconSize * 1.5,
    height: styleNumbers.iconSize * 1.5,
  },
  badgeContainer: {
    zIndex: -1,
    position: 'absolute',
    top: -5,
    right: -5,
    borderWidth: 2,
    borderColor: Colors.getTheme().error,
    backgroundColor: Colors.getTheme().transition,
    borderRadius: styleNumbers.borderRadius,
    padding: styleNumbers.space * 0.2,
  },
  badgeText: {
    ...CommonStyles.textStyles.subtitle,
    color: Colors.getTheme().text,
  },
});
