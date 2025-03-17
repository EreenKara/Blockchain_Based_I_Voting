import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';
import useVote from '@hooks/use.vote';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '@navigation/types';
import {RootStackParamList} from '@navigation/types';
type VoteScreenProps = NativeStackScreenProps<HomeStackParamList, 'Vote'>;

const VoteScreen: React.FC<VoteScreenProps> = ({navigation}) => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useStyles(createStyles);
  const [done, setDone] = useState(false);
  const {giveVote, loading, error} = useVote();
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
      <Text>VoteScreen</Text>
    </View>
  );
};

export default VoteScreen;
