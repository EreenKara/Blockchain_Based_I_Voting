import {StyleSheet, Text, View, Image, Animated, Easing} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CandidateViewModel from '@viewmodels/candidate.viewmodel';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import TextInputComponent from '@components/TextInput/text.input';
import ImagePickerComponent from '@icomponents/ImagePicker/image.picker';
import {ExtendedAsset} from '@hooks/useCamera';
import SearchBarModalComponent from '@components/SearchBarModal/search.bar.modal';
import ColorWheelPicker from '@components/ColorWheelPicker/color.wheel.picker';
import ColorPicker from '@components/ColorPicker/color.picker';

interface CandidateInputItemComponentProps {
  candidate: CandidateViewModel;
  setCandidate: (candidate: CandidateViewModel) => void;
}
// TODO: IMAGE'i candidate'in icerisindeki image'e atamak gerek.
const CandidateInputItemComponent: React.FC<
  CandidateInputItemComponentProps
> = ({candidate, setCandidate}) => {
  const [image, setImage] = useState<ExtendedAsset | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{translateX: slideAnim}],
        },
      ]}>
      <Animated.View style={styles.imageContainer}>
        <ImagePickerComponent
          outStyle={styles.image}
          image={image}
          fieldName="image"
          setFieldValue={(string, value) => {
            setImage(value);
            setCandidate({...candidate, image: value.uri});
          }}
          responsive={false}
        />
      </Animated.View>
      <Animated.View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <TextInputComponent
            label="Adı Soyadı"
            value={candidate.name}
            onChangeText={(text: string) => {
              console.log('selam', text);
              setCandidate({...candidate, name: text});
            }}
          />
        </View>
        <View style={styles.colorPicker}>
          <ColorWheelPicker
            size={300}
            onColorChange={(color: string) =>
              setCandidate({...candidate, color: color})
            }
          />
        </View>
        <View style={styles.colorPickerInfo}>
          <Text style={[CommonStyles.textStyles.subtitle]}>
            Seçtiğiniz renk
          </Text>
          <View
            style={{width: 30, height: 30, backgroundColor: candidate.color}}
          />
        </View>
        <View style={styles.infoItem}>
          <SearchBarModalComponent
            style={styles.searchBar}
            handleSearch={() => {}}
            title="Bir kullanıcı ile eslestirmek isterseniz arama yapınız"
            modalTitle="Kullanıcı Ara"
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default CandidateInputItemComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderRadius: styleNumbers.borderRadius,
    marginVertical: styleNumbers.space,
  },
  imageContainer: {
    width: '100%',
    borderRadius: styleNumbers.borderRadius,
    overflow: 'hidden',
  },
  image: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: styleNumbers.space * 2,
    padding: styleNumbers.space,
    width: '100%',
    gap: styleNumbers.space * 2,
    borderRadius: styleNumbers.borderRadius,
  },
  infoItem: {
    marginTop: styleNumbers.space * 2,
  },
  colorPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    marginTop: styleNumbers.space * 2,
  },
  colorPickerInfo: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: styleNumbers.space,
  },
  searchBar: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: Colors.getTheme().transition,
    borderColor: Colors.getTheme().borderColor,
    borderRadius: styleNumbers.borderRadius,
    padding: styleNumbers.space,
  },
});
