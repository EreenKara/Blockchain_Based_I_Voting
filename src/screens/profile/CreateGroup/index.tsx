import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Colors, {ColorsSchema} from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import SearchBarComponent from '@components/SearchBar/search.bar';
import FlatListComponent from '@components/List/flat.list';
import UserViewModel from '@viewmodels/user.viewmodel';
import ButtonComponent from '@components/Button/Button';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {useStyles} from '@hooks/Modular/use.styles';
import AvatarHeaderComponent from '@icomponents/AvatarHeader/avatar.header';
import {TextInput} from 'react-native-paper';
import TextInputComponent from '@components/TextInput/text.input';
import useUsers from '@hooks/use.users';
import useCreateGroup from '@hooks/use.create.group';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';
import GroupViewModel from '@viewmodels/group.viewmodel';
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
];

/* Item id 'si bu screen de zorunlu olarak verilmeli. */
const CreateGroupScreen = () => {
  const styles = useStyles(createStyles);
  const {fetchUsers, users} = useUsers();
  const {createGroup} = useCreateGroup();
  const [selectedUsers, setSelectedUsers] = useState<LightUserViewModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [groupName, setGroupName] = useState<string>('');

  const handleSearch = useCallback((text: string) => {
    console.log('text', text);
    setSearchQuery(text);
    /*const filteredUsers = initialUsers.filter(user =>
      user.name?.toLowerCase().includes(text.toLowerCase()),
    );
    setUsers(filteredUsers);*/
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = useCallback(
    (userId: string) => {
      setSelectedUsers(prev => {
        const isSelected = prev.some(user => user.id === userId);
        return isSelected
          ? prev.filter(user => user.id !== userId) // Kullanıcı seçiliyse, çıkar
          : [...prev, users?.find(user => user.id === userId)!]; // Kullanıcı seçili değilse, ekle
      });
    },
    [users], // 🔥 `users` bağımlılık olarak eklendi
  );

  const renderUserItem = ({item}: {item: UserViewModel}) => {
    const isSelected = selectedUsers.some(user => user.id === item.id);

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
        <View>
          <TextInputComponent
            value={groupName}
            onChangeText={setGroupName}
            style={{marginBottom: styleNumbers.space}}
            placeholder="Grup Adı"></TextInputComponent>
        </View>
        <SearchBarComponent
          debounceTime={300}
          modalTitle="Kişi Arayın"
          handleSearch={handleSearch}
          debounce={true}
        />
        <View style={styles.listContainer}>
          <FlatListComponent
            data={searchQuery ? users ?? [] : selectedUsers}
            ListEmptyComponent={
              <Text
                style={[
                  {...CommonStyles.textStyles.subtitle},
                  {textAlign: 'center'},
                ]}>
                {searchQuery ? 'Kişi bulunamadı' : 'Seçilen kişiler yok'}
              </Text>
            }
            renderItem={renderUserItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.createGroupButton}>
          <ButtonComponent
            title="Seçilen Kişilerden Grup Oluştur"
            onPress={() => {
              const group: GroupViewModel = {
                id: '',
                name: groupName,
                users: selectedUsers,
              };
              console.log('group olusturulurken kullancılar. ', group.users);
              createGroup(group);
            }}
            style={styles.createGroupButton}
          />
        </View>
      </View>
    </>
  );
};

export default CreateGroupScreen;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.placeholder,
    },
    groupButton: {
      width: styleNumbers.iconSize * 2,
      height: styleNumbers.iconSize * 2,
      borderRadius: styleNumbers.borderRadius * 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.borderColor,
      backgroundColor: colors.background,
    },
    selectedGroupButton: {
      backgroundColor: colors.button,
      borderColor: colors.button,
    },
    plusIcon: {
      ...CommonStyles.textStyles.paragraph,
      fontSize: styleNumbers.textSize * 2,
    },
    selectedPlusIcon: {
      color: colors.background,
    },
    createGroupButton: {
      marginTop: styleNumbers.space,
    },
  });
