import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import {Formik, FormikProps} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AddressPickerComponent from '@icomponents/AddressPicker/address.picker';
import GroupViewModel from '@viewmodels/group.viewmodel';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';
import {useElectionCreationContext} from '@contexts/election.creation.context';
import ButtonComponent from '@components/Button/Button';
import useGroups from '@hooks/use.groups';
import {useUserProfileContext} from '@contexts/user.profile.context';
import ExtendedListPickerComponent from '@icomponents/ExtendedListPicker';
import {Snackbar} from 'react-native-paper';
import MenuItemComponent from '@icomponents/MenuItem/menu.item';
import useUsers from '@hooks/use.users';
import SearchBarModalComponent from '@components/SearchBarModal/search.bar.modal';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';
import {useNotification} from '@contexts/notification.context';
import {SharedStackParamList} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import ErrorScreenComponent from '@screens/shared/error.screen';
import useElectionAccess from '@hooks/ElectionCreation/use.election.access';

type Props = NativeStackScreenProps<SharedStackParamList, 'ElectionAccess'>;

const ElectionAccessScreen: React.FC<Props> = ({navigation, route}) => {
  const homeNavigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const {showNotification} = useNotification();
  const styles = useStyles(createStyles);
  const {accessType, electionId} = route.params;
  const {user} = useUserProfileContext();

  const formikRef = useRef<FormikProps<any>>(null);
  if (electionId === null) {
    return (
      <ErrorScreenComponent
        error="Seçim ID'si bulunamadı."
        fromScreen="Access"
      />
    );
  }
  const {electionAccess, submitting, error, handleElectionAccessStep} =
    useElectionAccess(electionId);

  let form;
  if (accessType === 'public') {
    interface FormValues {
      city: string;
      district: string;
    }
    const initialValues: FormValues = {
      city: '',
      district: '',
    };

    form = (
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={async (values: FormValues) => {
          const result = await handleElectionAccessStep({
            accessType: 'public',
            cityId: values.city,
            districtId: values.district,
          });
          showNotification({
            message: error || 'Seçim başarıyla oluşturuldu.',
            type: 'success',
            modalType: 'snackbar',
          });
          if (result) {
            navigation.navigate('ElectionCandidates', {
              electionId,
            });
          }
        }}>
        {({values, handleChange, setFieldValue}) => {
          return (
            <KeyboardAwareScrollView
              contentContainerStyle={styles.addressContainer}>
              <AddressPickerComponent
                values={values}
                setFieldValue={setFieldValue}
              />
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    );
  } else {
    interface FormValues {
      groups: GroupViewModel[];
      users: LightUserViewModel[];
    }
    const initialValues: FormValues = {
      groups: [],
      users: [],
    };
    const onNonSelect = (item: GroupViewModel) => {
      handledGroups.push(item);
    };
    const onSelect = (item: GroupViewModel) => {
      setHandledGroups(prev => prev.filter(group => group.id !== item.id));
    };

    const [searchQuery, setSearchQuery] = useState('');
    const {users, fetchUsers} = useUsers();
    const {groups, fetchGroups} = useGroups();
    const [handledGroups, setHandledGroups] = useState<GroupViewModel[]>([]);
    const [pickerNumber, setPickerNumber] = useState(1); // Başlangıçta bir picker olacak

    useEffect(() => {
      if (user !== null) {
        fetchGroups(user.id);
        setHandledGroups(Array.from(groups || []));
        fetchUsers();
      } else {
        setHandledGroups([
          {
            id: '1',
            name: 'test',
            users: [],
          },
          {
            id: '2',
            name: 'test2',
            users: [],
          },
          {
            id: '3',
            name: 'test3',
            users: [],
          },
          {
            id: '4',
            name: 'test4',
            users: [],
          },
          {
            id: '5',
            name: 'test5',
            users: [],
          },
          {
            id: '6',
            name: 'test6',
            users: [],
          },
        ]);
      }
    }, [user?.id]);

    const addPicker = (values: FormValues) => {
      if (values.groups.length <= pickerNumber - 1) {
        showNotification({
          message: 'Daha fazla grup eklemeden önce bir seçim yapınız.',
          type: 'error',
          modalType: 'snackbar',
        });
        return;
      }
      if (handledGroups.length > 0) {
        setPickerNumber(prev => prev + 1); // Yeni bir picker ekle
      } else {
        showNotification({
          message: 'Tüm grupları seçtiniz.',
          type: 'success',
          modalType: 'snackbar',
        });
      }
    };

    form = (
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={async (values: FormValues) => {
          const result = await handleElectionAccessStep({
            accessType: 'private',
            groups: values.groups,
            users: values.users,
          });

          showNotification({
            message: error || 'Seçim başarıyla oluşturuldu.',
            type: 'success',
            modalType: 'snackbar',
          });
          if (result) {
            navigation.navigate('ElectionCandidates', {electionId});
          }
        }}>
        {({values, handleChange, setFieldValue}) => {
          /*
useEffect(() => {
  console.log('values.groups', values.groups);
  setFieldValue(
    'groups',
    values.groups.filter(group => group !== null),
  );
  if (values.groups.length < pickerNumber) {
    setPickerNumber(prev => prev - 1);
  }
}, [values.groups]);
*/
          return (
            <>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Grup Seçimi</Text>
              </View>
              <View style={styles.groups}>
                {Array.from({length: pickerNumber}).map((_, index) => {
                  let data = Array.from(handledGroups);
                  if (values.groups[index]) {
                    if (
                      !data.find(group => group.id === values.groups[index].id)
                    ) {
                      data.push(values.groups[index]);
                    }
                  }

                  return (
                    <ExtendedListPickerComponent
                      listStyle={styles.pickerListStyle}
                      style={styles.picker}
                      key={index}
                      data={data}
                      selectedData={values.groups[index]}
                      setSelectedData={data =>
                        setFieldValue(`groups[${index}]`, data)
                      }
                      onNonSelect={onNonSelect}
                      onSelect={onSelect}
                      title={`${values.groups[index]?.name || 'Pick a Group'}`}
                      icon={require('@assets/images/group-people.png')}
                    />
                  );
                })}
              </View>
              <ButtonComponent
                style={styles.button}
                title="Grup Ekle"
                onPress={() => addPicker(values)}
              />
              <View style={styles.reagent}></View>

              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Kullanıcı Seçimi</Text>
              </View>
              <View style={styles.searchContainer}>
                <SearchBarModalComponent
                  title="Kullanıcı Aramak İçin Tıkla"
                  handleSearch={() => {}}
                  modalTitle="Electiona Eklemek İçin Kullanıcı Ara"
                  searchBarTitle="Kullanıcı Ara"
                />
              </View>
              <View style={styles.users}>
                <View style={styles.headerContainer}>
                  <Text style={styles.subtitle}>Kullanıcılar</Text>
                </View>
                <View style={styles.userListContainer}>
                  {users && users.length <= 0 ? (
                    <Text style={styles.subtitle}>
                      Hiçbir kullanıcı seçilmedi
                    </Text>
                  ) : (
                    users
                      ?.filter(user =>
                        user.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                      )
                      .map(user => (
                        <MenuItemComponent
                          key={user.id}
                          icon={require('@assets/images/group-people.png')}
                          title={user.name}
                          onPress={() => {}}
                        />
                      ))
                  )}
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      nestedScrollEnabled={true}>
      {form}
      <View style={styles.footerContainer}>
        <ButtonComponent
          style={styles.button}
          title="Seçim Oluştur"
          onPress={() => {
            if (formikRef.current) {
              formikRef.current.handleSubmit();
            }
          }}
          disabled={submitting}
        />

        <ButtonComponent
          style={styles.button}
          title="To candidates page"
          onPress={() => {
            navigation.navigate('ElectionCandidates', {electionId});
          }}
          disabled={submitting}
        />
      </View>
    </ScrollView>
  );
};

export default ElectionAccessScreen;
