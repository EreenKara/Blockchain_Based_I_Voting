import {
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import styles from './index.style';
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
import SearchBarComponent from '@components/SearchBar/search.bar';
import MenuItemComponent from '@icomponents/MenuItem/menu.item';
import useUsers from '@hooks/use.users';
import SearchBarModalComponent from '@components/SearchBarModal/search.bar.modal';
type Props = NativeStackScreenProps<HomeStackParamList, 'ElectionAccess'>;

const ElectionAccessScreen: React.FC<Props> = ({navigation, route}) => {
  const {accessType} = route.params;
  const {user} = useUserProfileContext();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const {handleElectionAccessStep, submitting, errors} =
    useElectionCreationContext();
  const formikRef = useRef<FormikProps<any>>(null);

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
            city: values.city,
            district: values.district,
          });
          console.log('result', result);
          setMessage(errors.access || 'Seçim başarıyla oluşturuldu.');
          if (result) {
            navigation.navigate('ElectionCandidates');
          }
        }}>
        {({values, handleChange, setFieldValue}) => {
          return (
            <KeyboardAwareScrollView
              contentContainerStyle={styles.formContainer}>
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
        setHandledGroups(Array.from(groups));
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
        ]);
      }
    }, [user?.id]);

    const addPicker = (values: FormValues) => {
      if (values.groups.length <= pickerNumber - 1) {
        setMessage('Daha fazla grup eklemeden önce bir seçim yapınız.');
        setVisible(true);
        return;
      }
      if (handledGroups.length > 0) {
        setPickerNumber(prev => prev + 1); // Yeni bir picker ekle
      } else {
        setMessage('Tüm grupları seçtiniz.');
        setVisible(true);
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
          console.log('result', result);

          setMessage(errors.access || 'Seçim başarıyla oluşturuldu.');
          if (result) {
            navigation.navigate('ElectionCandidates');
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
                <FlatList
                  data={Array.from({length: pickerNumber})}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({index}) => {
                    let data = Array.from(handledGroups);
                    if (values.groups[index]) {
                      if (
                        !data.find(
                          group => group.id === values.groups[index].id,
                        )
                      ) {
                        data.push(values.groups[index]);
                      }
                    }

                    return (
                      <ExtendedListPickerComponent
                        style={styles.picker}
                        key={index}
                        data={data}
                        selectedData={values.groups[index]}
                        setSelectedData={data =>
                          setFieldValue(`groups[${index}]`, data)
                        }
                        onNonSelect={onNonSelect}
                        onSelect={onSelect}
                        title={`${
                          values.groups[index]?.name || 'Pick a Group'
                        }`}
                        icon={require('@assets/images/group-people.png')}
                      />
                    );
                  }}
                />
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
                  {users.length <= 0 ? (
                    <Text style={styles.subtitle}>
                      Hiçbir kullanıcı seçilmedi
                    </Text>
                  ) : (
                    users
                      .filter(user =>
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
    <View style={styles.container}>
      {form}
      <View style={styles.footerContainer}>
        <ButtonComponent
          title="Seçim Oluştur"
          onPress={() => {
            if (formikRef.current) {
              formikRef.current.handleSubmit();
            }
          }}
          disabled={submitting.access}
        />

        <ButtonComponent
          title="To candidates page"
          onPress={() => {
            navigation.navigate('ElectionCandidates');
          }}
          disabled={submitting.access}
        />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={styles.snackbar}>
        {message}
      </Snackbar>
    </View>
  );
};

export default ElectionAccessScreen;
