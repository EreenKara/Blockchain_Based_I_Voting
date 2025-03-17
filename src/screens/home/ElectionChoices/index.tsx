import {ScrollView, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {HomeStackParamList, RootStackParamList} from '@navigation/types';
import OptionGroup from '@components/OptionGroup/option.group';
import {useElectionCreationContext} from '@contexts/election.creation.context';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';
import ButtonComponent from '@components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';

type Props = NativeStackScreenProps<HomeStackParamList, 'ElectionChoices'>;

interface Group {
  name: string;
  options: ElectionChoiceViewModel[];
}

interface SelectedGroup {
  name: string;
  option: ElectionChoiceViewModel;
}

const initialGroups: Group[] = [
  {
    name: 'Grup 1',
    options: [
      {
        id: '',
        name: 'Seçenek 1',
        group: 'Grup 1',
        description: 'Seçenek 1 açıklaması',
      },
      {
        id: '',
        name: 'Seçenek 2',
        group: 'Grup 1',
        description: 'Seçenek 2 açıklaması',
      },
    ],
  },
  {
    name: 'Grup 2',
    options: [
      {
        id: '',
        name: 'Seçenek 3',
        group: 'Grup 2',
        description: 'Seçenek 3 açıklaması',
      },
    ],
  },
  {
    name: 'Grup 3',
    options: [
      {
        id: '',
        name: 'Seçenek 4',
        group: 'Grup 3',
        description: 'Seçenek 4 açıklaması',
      },
    ],
  },
];

const ElectionChoicesScreen: React.FC<Props> = ({navigation}) => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useStyles(createStyles);
  const {handleElectionChoiceStep, submitting, errors} =
    useElectionCreationContext();
  const [groups] = useState<Group[]>(initialGroups);
  const [choices, setChoices] = useState<SelectedGroup[]>([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const getOptionDetails = useCallback(
    (optionName: string) => {
      for (const group of groups) {
        const found = group.options.find(choice => choice.name === optionName);
        if (found) {
          return {groupName: group.name, description: found.description};
        }
      }
      return {groupName: 'Bilinmeyen Grup', description: 'Seçenek bulunamadı'};
    },
    [groups],
  );

  const handleOptionSelected = useCallback(
    (selected: string) => {
      const {groupName, description} = getOptionDetails(selected);
      setChoices(prevChoices => {
        const updatedChoices = prevChoices.filter(
          choice => choice.name !== groupName,
        );
        return [
          ...updatedChoices,
          {
            name: groupName,
            option: {id: '', name: selected, group: groupName, description},
          },
        ];
      });
    },
    [getOptionDetails],
  );

  const handleSubmit = useCallback(async () => {
    const success = await handleElectionChoiceStep(
      choices.map(group => group.option),
    );
    setMessage(errors.choice ?? 'Başarıyla seçim oluşturuldu.');
    setVisible(true);
    if (success)
      rootNavigation.navigate('Success', {
        success: 'Başarıyla seçim oluşturuldu.',
        fromScreen: 'ElectionChoices',
        toScreen: 'Main',
      });
  }, [handleElectionChoiceStep]);

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {groups.map(group => (
          <View key={group.name} style={styles.optionContainer}>
            <OptionGroup
              title={`${group.name} Seçenekleri`}
              options={group.options.map(choice => choice.name)}
              onOptionSelect={handleOptionSelected}
            />
          </View>
        ))}
      </View>
      <ButtonComponent
        style={styles.button}
        title="Submit"
        onPress={handleSubmit}
        disabled={choices.length < groups.length || submitting.choice}
      />
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Tamam',
          onPress: () => setVisible(false),
        }}
        duration={3000}
        style={styles.snackbar}>
        {message}
      </Snackbar>
    </View>
  );
};

export default ElectionChoicesScreen;
