import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import SearchBarComponent from '@components/SearchBar/search.bar';
import VirtualizedListComponent from '@components/List/virtualized.list';
import UserViewModel from '@viewmodels/user.viewmodel';
import ButtonComponent from '@components/Button/Button';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';

const initialUsers: UserViewModel[] = [
  {
    id: '1',
    username: 'dalehouston',
    name: 'Dale',
    surname: 'Houston',
    identityNumber: '1234567890',
    email: 'dale@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '2',
    username: 'madgemurphy',
    name: 'Madge',
    surname: 'Murphy',
    identityNumber: '1234567890',
    email: 'madge@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '3',
    username: 'dalehouston',
    name: 'Dale',
    surname: 'Houston',
    identityNumber: '1234567890',
    email: 'dale@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '4',
    username: 'madgemurphy',
    name: 'Madge',
    surname: 'Murphy',
    identityNumber: '1234567890',
    email: 'madge@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '5',
    username: 'dalehouston',
    name: 'Dale',
    surname: 'Houston',
    identityNumber: '1234567890',
    email: 'dale@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '6',
    username: 'madgemurphy',
    name: 'Madge',
    surname: 'Murphy',
    identityNumber: '1234567890',
    email: 'madge@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '7',
    username: 'dalehouston',
    name: 'Dale',
    surname: 'Houston',
    identityNumber: '1234567890',
    email: 'dale@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '8',
    username: 'madgemurphy',
    name: 'Madge',
    surname: 'Murphy',
    identityNumber: '1234567890',
    email: 'madge@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '9',
    username: 'dalehouston',
    name: 'Dale',
    surname: 'Houston',
    identityNumber: '1234567890',
    email: 'dale@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '10',
    username: 'madgemurphy',
    name: 'Madge',
    surname: 'Murphy',
    identityNumber: '1234567890',
    email: 'madge@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '11',
    username: 'dalehouston',
    name: 'Dale',
    surname: 'Houston',
    identityNumber: '1234567890',
    email: 'dale@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
  {
    id: '12',
    username: 'madgemurphy',
    name: 'Madge',
    surname: 'Murphy',
    identityNumber: '1234567890',
    email: 'madge@example.com',
    phoneNumber: '1234567890',
    image: require('@assets/images/no-avatar.png'),
  },
];

/* Item id 'si bu screen de zorunlu olarak verilmeli. */
const CreateGroupScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredUsers = initialUsers.filter(user =>
      user.name?.toLowerCase().includes(text.toLowerCase()),
    );
    setUsers(filteredUsers);
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const renderUserItem = ({item}: {item: UserViewModel}) => {
    const isSelected = selectedUsers.includes(item.id || '');

    return (
      <View style={styles.userItem}>
        <Image
          source={
            item.image ? item.image : require('@assets/images/no-avatar.png')
          }
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {item?.name} {item?.surname}
          </Text>
          <Text style={styles.userTitle}>{item?.username}</Text>
        </View>
        <TouchableOpacity
          style={[styles.groupButton, isSelected && styles.selectedGroupButton]}
          onPress={() => handleUserSelect(item.id || '')}>
          <Text
            style={[styles.plusIcon, isSelected && styles.selectedPlusIcon]}>
            {isSelected ? '✓' : '+'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SearchBarComponent modalTitle="Kişi Arayın" handleSearch={() => {}} />
        <View style={styles.listContainer}>
          <VirtualizedListComponent
            data={users}
            renderItem={renderUserItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.createGroupButton}>
          <ButtonComponent
            title="Grup Oluştur"
            onPress={() => {}}
            style={styles.createGroupButton}
          />
        </View>
      </View>
    </>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
    padding: styleNumbers.space * 2,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: styleNumbers.space,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: styleNumbers.space * 1.5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: styleNumbers.space * 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...CommonStyles.textStyles.subtitle,
    marginBottom: styleNumbers.spaceLittle,
  },
  userTitle: {
    ...CommonStyles.textStyles.paragraph,
    color: Colors.getTheme().placeholder,
  },
  groupButton: {
    width: styleNumbers.iconSize * 2,
    height: styleNumbers.iconSize * 2,
    borderRadius: styleNumbers.borderRadius * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.getTheme().borderColor,
    backgroundColor: Colors.getTheme().background,
  },
  selectedGroupButton: {
    backgroundColor: Colors.getTheme().button,
    borderColor: Colors.getTheme().button,
  },
  plusIcon: {
    ...CommonStyles.textStyles.paragraph,
    fontSize: styleNumbers.textSize * 2,
  },
  selectedPlusIcon: {
    color: Colors.getTheme().background,
  },
  createGroupButton: {
    marginTop: styleNumbers.space,
  },
});
