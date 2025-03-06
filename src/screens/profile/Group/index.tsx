import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicatorComponent,
} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import SearchBarComponent from '@components/SearchBar/search.bar';
import VirtualizedListComponent from '@components/List/virtualized.list';
import UserViewModel from '@viewmodels/user.viewmodel';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';
import MenuItemComponent from '@icomponents/MenuItem/menu.item';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {useUserProfileContext} from '@contexts/user.profile.context';
import ErrorScreenComponent from '@shared/error.screen';
import useGroup from '@hooks/use.group';
type GroupProps = NativeStackScreenProps<ProfileStackParamList, 'Group'>;

/* Item id 'si bu screen de zorunlu olarak verilmeli. */
const GroupScreen: React.FC<GroupProps> = ({navigation, route}) => {
  let {group: localGroup} = route.params;
  navigation.setOptions({
    headerTitle: `${localGroup.name} · Grup Üyeleri`,
  });
  const {group, loading, error, fetchGroup} = useGroup({
    groupId: localGroup.id,
    cache: true,
  });
  const {} = useUserProfileContext();

  useEffect(() => {
    fetchGroup();
  }, [localGroup]);

  const handleDelete = (userId: string) => {
    if (userId) {
    }
  };

  const renderRightActions = (userId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(userId)}>
        <Image
          source={require('@assets/images/trash_can.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    );
  };

  const renderUserItem = ({item}: {item: UserViewModel}) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id || '')}>
        <View style={styles.userItem}>
          <MenuItemComponent
            touchable={false}
            icon={
              item.image ? item.image : require('@assets/images/no-avatar.png')
            }
            title={`${item.name} ${item.surname}`}
            tintColor={Colors.getTheme().icon}
          />
        </View>
      </Swipeable>
    );
  };

  if (loading) {
    return <ActivityIndicatorComponent />;
  }
  if (error) {
    return (
      <ErrorScreenComponent
        fromScreen="Group"
        toScreen="Groups"
        error={error}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <SearchBarComponent
          inputStyle={{
            borderRadius: 0,
          }}
          handleSearch={() => {}}
        />

        <GestureHandlerRootView style={styles.listContainer}>
          <VirtualizedListComponent
            data={group?.users || []}
            renderItem={renderUserItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </GestureHandlerRootView>
      </View>
    </>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  userItem: {
    borderWidth: 1,
    borderColor: Colors.getTheme().borderColor,
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
  deleteButton: {
    borderWidth: 1,
    borderColor: Colors.getTheme().borderColor,
    padding: styleNumbers.space,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    ...CommonStyles.textStyles.paragraph,
    color: Colors.getTheme().background,
  },
  deleteIcon: {
    width: styleNumbers.iconSize,
    height: styleNumbers.iconSize,
  },
});
