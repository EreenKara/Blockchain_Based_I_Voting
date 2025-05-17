import {Text, View, FlatList, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList, SharedStackParamList} from '@navigation/types';
import ExtendedPickerComponent, {ChildRef} from '@icomponents/ExtendedPicker';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import CandidateInputItemComponent from '@icomponents/CandidateInputItem';
import CommonStyles from '@styles/common/commonStyles';
import ButtonComponent from '@components/Button/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';
import {useElectionCreationContext} from '@contexts/election.creation.context';
import useElectionCandidate from '@hooks/ElectionCreation/use.election.candidate';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';
type Props = NativeStackScreenProps<SharedStackParamList, 'ElectionCandidates'>;

const ElectionCandidatesScreen: React.FC<Props> = ({navigation, route}) => {
  const styles = useStyles(createStyles);
  const [pickers, setPickers] = useState<number>(2);
  const {electionId} = route.params;
  const pickerRefs = useRef<React.RefObject<ChildRef>[]>([]);
  const {
    candidates,
    users,
    success,
    submitting,
    handleElectionCandidateStep,
    setUserWrapper,
    updateCandidateAt,
    addCandidate,
  } = useElectionCandidate(electionId);

  const handleSubmit = () => {
    handleElectionCandidateStep([...candidates]);
  };
  useEffect(() => {
    if (success) navigation.navigate('DefaultCustom', {electionId});
  }, [success]);

  const addCandidateView = useCallback(() => {
    setPickers(prev => prev + 1);
    addCandidate();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}>
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
                setCandidate={updater => {
                  updateCandidateAt(index, updater);
                }}
                user={users[index]}
                setUser={user => {
                  setUserWrapper(index, user);
                }}
              />
            }
            title={candidates[index]?.name || 'Aday Seçimi'}
            icon={require('@assets/images/candidate.png')}
          />
        );
      })}
      <View style={styles.footerContainer}>
        <ButtonComponent
          style={styles.addCandidateButton}
          title="Aday Ekle"
          onPress={addCandidateView}
          disabled={submitting}
        />
        <ButtonComponent
          style={styles.button}
          title="To Choices"
          onPress={handleSubmit}
          disabled={submitting}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ElectionCandidatesScreen;
