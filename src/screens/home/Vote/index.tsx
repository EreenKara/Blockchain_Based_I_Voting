import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';
import useVote from '@hooks/use.vote';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {SharedStackParamList} from '@navigation/types';
import {RootStackParamList} from '@navigation/types';
import CandidateVoteItemComponent from '@icomponents/CandidateVoteItem/candidate.vote.item';
import CandidateViewModel from '@viewmodels/candidate.viewmodel';
import {FlatList} from 'react-native-gesture-handler';
import FlatListComponent from '@components/List/flat.list';
import ButtonComponent from '@components/Button/Button';
import ActivityIndicatorComponent from '@screens/shared/activity.indicator';
type VoteScreenProps = NativeStackScreenProps<SharedStackParamList, 'Vote'>;

const VoteScreen: React.FC<VoteScreenProps> = ({navigation, route}) => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useStyles(createStyles);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );
  const {electionId} = route.params;

  let {
    giveVote,
    loading,
    error,
    success,
    fetchCandidates,
    candidates,
    fetchCandidatesLoading,
    fetchCandidatesError,
    fetchCandidatesSuccess,
    getElection,
    election,
    accessLoading,
    accessSuccess,
    accessError,
  } = useVote();

  useEffect(() => {
    fetchCandidates(electionId);
    getElection(electionId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.blank}></View>
        <LottieView
          source={require('@assets/animations/lottie-electronic-letter.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <View style={styles.blank} />
      </View>
    );
  }
  if (success) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('@assets/animations/lottie-flying-letter.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            rootNavigation.navigate('Success', {
              success: 'Oy verildi',
              fromScreen: 'Vote',
              toScreen: 'Main',
            });
          }}
          style={styles.lottie}
        />
      </View>
    );
  }
  if (!candidates) {
    <ActivityIndicatorComponent />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seçeneklerden Birine Oy Ver</Text>
      </View>
      <ScrollView contentContainerStyle={{padding: 8}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {candidates?.map(candidate => (
            <View key={candidate.id} style={{width: '48%', marginVertical: 8}}>
              <CandidateVoteItemComponent
                candidate={candidate}
                selected={candidate.id === selectedCandidateId}
                onSelect={setSelectedCandidateId}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <ButtonComponent
        title="Oyunu Gonder"
        onPress={() => {
          giveVote(electionId, selectedCandidateId, election?.accessType);
        }}
      />
    </View>
  );
};

export default VoteScreen;
