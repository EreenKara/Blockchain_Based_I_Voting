import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';

interface CandidateItemComponentProps {
  candidate: CandidateViewModel;
}

const CandidateItemComponent: React.FC<CandidateItemComponentProps> = ({
  candidate,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: candidate.image}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={CommonStyles.textStyles.title}>
          Aday ismi: {candidate.name}
        </Text>
        <Text style={CommonStyles.textStyles.subtitle}>
          Oy sayisi: {candidate.votes}
        </Text>
      </View>
    </View>
  );
};

export default CandidateItemComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.getTheme().background,
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...CommonStyles.shadowStyle,
  },
  imageContainer: {
    width: '65%',
    marginRight: styleNumbers.space * 2,
    backgroundColor: Colors.getTheme().transition,
  },
  image: {
    height: 300,
  },
  infoContainer: {
    padding: styleNumbers.space,
    width: '30%',
    backgroundColor: Colors.getTheme().transition,
    gap: styleNumbers.space * 2,
  },
});
