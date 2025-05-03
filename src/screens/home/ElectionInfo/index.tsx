import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {Snackbar} from 'react-native-paper';
import TextInputComponent from '@components/TextInput/text.input';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonComponent from '@components/Button/Button';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';
// Components
import StartToEndDateComponent from '@icomponents/StartToEndDate/start.to.end.date';
import ImagePickerComponent from '@icomponents/ImagePicker/image.picker';
import {ExtendedAsset} from '@hooks/useCamera';
import {useElectionCreationContext} from '@contexts/election.creation.context';
import {boolean} from 'yup';

type Props = NativeStackScreenProps<HomeStackParamList, 'ElectionInfo'>;

export interface FormValues {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: ExtendedAsset | null;
}

const ElectionInfoScreen: React.FC<Props> = ({navigation}) => {
  const styles = useStyles(createStyles);
  const {handleElectionInfoStep, electionId, submitting} =
    useElectionCreationContext();

  const [success, setSuccess] = useState(false);
  const handleSubmit = async (values: FormValues) => {
    console.log('Form Values:', values);
    await handleElectionInfoStep(values);
  };
  useEffect(() => {
    if (electionId) {
      navigation.navigate('Shared', {
        screen: 'PublicOrPrivate',
        params: {electionId: electionId},
      });
    }
  }, [electionId]);

  const initialValues: FormValues = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    image: null,
  };

  return (
    <KeyboardAwareScrollView
      style={styles.formContainer}
      contentContainerStyle={[styles.scrollContainer]}>
      <View>
        <Text style={styles.title}>Seçim Bilgileri</Text>
      </View>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({values, handleChange, setFieldValue}) => {
          return (
            <>
              <View style={styles.inputContainer}>
                <TextInputComponent
                  label="Seçim Başlığı"
                  value={values.title}
                  onChangeText={text => handleChange('title')(text)}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInputComponent
                  label="Açıklama"
                  value={values.description}
                  onChangeText={text => handleChange('description')(text)}
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                />
              </View>

              <StartToEndDateComponent
                containerStyle={styles.dateContainer}
                values={values}
                setFieldValue={setFieldValue}
              />

              <ImagePickerComponent
                outStyle={styles.imagePicker}
                image={values.image}
                fieldName="image"
                setFieldValue={setFieldValue}
                responsive={false}
              />
              <Button
                title="Go to Election Info"
                onPress={() =>
                  navigation.navigate('Shared', {
                    screen: 'PublicOrPrivate',
                    params: {electionId: electionId},
                  })
                }
              />
              <ButtonComponent
                title="Kaydet ve Erişilebilirlik Sayfasına Git"
                onPress={() => handleSubmit(values)}
                style={styles.submitButton}
                disabled={submitting.info}
              />
            </>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default ElectionInfoScreen;
