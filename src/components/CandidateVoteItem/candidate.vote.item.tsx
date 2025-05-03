import {StyleSheet, Text, View, Image, Animated, Easing} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import CandidateViewModel from '@viewmodels/candidate.viewmodel';
import Colors, {ColorsSchema} from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import TextInputComponent from '@components/TextInput/text.input';
import ImagePickerComponent from '@icomponents/ImagePicker/image.picker';
import {ExtendedAsset} from '@hooks/useCamera';
import SearchBarModalComponent from '@components/SearchBarModal/search.bar.modal';
import ColorWheelPicker from '@components/ColorWheelPicker/color.wheel.picker';
import ColorPicker from '@components/ColorPicker/color.picker';
import {useStyles} from '@hooks/Modular/use.styles';
import CandidateCreateViewModel from '@viewmodels/candidate.create.viewmodel';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';
import SelectUserComponent from '@icomponents/SelectUser/select.user';
interface CandidateVoteItemComponentProps {
  candidate: CandidateViewModel;
}
// TODO: IMAGE'i candidate'in icerisindeki image'e atamak gerek.
const CandidateVoteItemComponent: React.FC<CandidateVoteItemComponentProps> = ({
  candidate,
}) => {
  const styles = useStyles(createStyles);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bir Aday İçin Oy Kullan</Text>
      </View>
      <View style={styles.candidateView}>
        <View style={styles.candidateContent}>
          <Image
            source={
              candidate?.image
                ? {uri: candidate.image}
                : require('@assets/images/candidate.png')
            }
          />
          <View style={styles.textView}>
            <Text style={styles.text}>
              {candidate.userId ? 'Adayın İsmi: ' : 'Seçeneğin İsmi: '}
            </Text>
            <Text style={styles.text}>{candidate.name}</Text>
          </View>
        </View>
        <View style={styles.vote}></View>
      </View>
    </View>
  );
};

export default CandidateVoteItemComponent;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: styleNumbers.space * 2,
      width: '100%',
      flexDirection: 'column',
      flexWrap: 'wrap',
      borderRadius: styleNumbers.borderRadius,
      marginVertical: styleNumbers.space,
    },
    header: {
      width: '100%',
      alignItems: 'center',
      marginHorizontal: 'auto',
    },
    title: {
      ...CommonStyles.textStyles.title,
    },
    text: {
      ...CommonStyles.textStyles.subtitle,
      margin: styleNumbers.space,
    },
    textView: {
      flexDirection: 'row',
    },
    imageContainer: {
      width: '100%',
      borderRadius: styleNumbers.borderRadius,
      overflow: 'hidden',
    },
    image: {
      height: 300,
    },
    candidateView: {
      width: '100%',
      borderColor: colors.borderColor,
      borderWidth: styleNumbers.borderWidth,
      backgroundColor: 'yellow',
    },
    vote: {},
    candidateContent: {
      flexDirection: 'column',
    },
  });
