import {Text, View, FlatList, ScrollView} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import styles from './index.style';
import ExtendedPickerComponent, {ChildRef} from '@icomponents/ExtendedPicker';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import CandidateInputItemComponent from '@icomponents/CandidateInputItem';
import CommonStyles from '@styles/common/commonStyles';
import ButtonComponent from '@components/Button/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
type Props = NativeStackScreenProps<HomeStackParamList, 'ElectionCandidates'>;

const ElectionCandidatesScreen: React.FC<Props> = ({navigation}) => {
  const [pickers, setPickers] = useState<number>(2);
  const pickerRefs = useRef<React.RefObject<ChildRef>[]>([]);
  const [candidates, setCandidates] = useState<CandidateViewModel[]>([
    {
      id: '',
      name: '',
      color: '#000000',
      votes: 100,
      image: '',
    },
    {
      id: '',
      name: '',
      color: '#000000',
      votes: 100,
      image: '',
    },
  ]);

  const handleSubmit = useCallback(() => {
    navigation.navigate('ElectionChoices');
  }, []);

  const addCandidate = useCallback(() => {
    setPickers(prev => prev + 1);
    setCandidates(prev => [
      ...prev,
      {
        id: '',
        name: '',
        color: '#000000',
        votes: 0,
        image: '',
      },
    ]);
  }, []);
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[CommonStyles.textStyles.title, styles.headerText]}>
          Aday Seçimi
        </Text>
      </View>
      {Array.from({length: pickers}).map((_, index) => {
        if (!pickerRefs.current[index]) {
          pickerRefs.current[index] = React.createRef<ChildRef>();
        }
        return (
          <ExtendedPickerComponent
            key={index}
            ref={pickerRefs.current[index]}
            style={styles.picker}
            content={
              <CandidateInputItemComponent
                candidate={candidates[index]}
                setCandidate={candidate => {
                  setCandidates(prev => {
                    // Şu anki candidate dizisini kopyalıyoruz
                    const updated = [...prev];
                    // İlgili index'teki adayı güncel “candidate” objesiyle değiştiriyoruz
                    updated[index] = candidate;
                    return updated;
                  });
                }}
              />
            }
            title={candidates[index].name || 'Aday Seçimi'}
            icon={require('@assets/images/candidate.png')}
          />
        );
      })}
      <ButtonComponent
        style={styles.addCandidateButton}
        title="Aday Ekle"
        onPress={addCandidate}
      />
      <ButtonComponent
        style={styles.button}
        title="To Choices"
        onPress={handleSubmit}
      />
    </KeyboardAwareScrollView>
  );
};

export default ElectionCandidatesScreen;
