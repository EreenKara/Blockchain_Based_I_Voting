import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
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
type VoteScreenProps = NativeStackScreenProps<SharedStackParamList, 'Vote'>;

const candidates: CandidateViewModel[] = [
  {
    id: '1',
    color: '#000000',
    votes: 2,
    name: 'EREN',
    image: '',
    userId: null,
  },
  {
    id: '2',
    color: '#123123',
    votes: 2,
    name: 'Esma',
    image: '',
    userId: null,
  },
];

const VoteScreen: React.FC<VoteScreenProps> = ({navigation}) => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useStyles(createStyles);
  const [done, setDone] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );

  let {giveVote, loading, error} = useVote();
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
  if (done) {
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
          {candidates.map(candidate => (
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
      <ButtonComponent title="Oyunu Gonder" onPress={() => {}} />
    </View>
  );
};

export default VoteScreen;
