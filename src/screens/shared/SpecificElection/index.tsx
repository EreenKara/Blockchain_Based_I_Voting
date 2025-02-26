import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './index.style';
import {SpecificElectionScreenProps} from '@screens/type';
import PieChartComponent from '@components/PieChart/pie.chart';
import CommonStyles from '@styles/common/commonStyles';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import ActivityIndicatorComponent from '@shared/activity.indicator';
import {Dimensions} from 'react-native';
import ChartLegendComponent from '@components/ChartLegend/chart.legend.style';
import CandidateItemComponent from '@icomponents/CandidateItem/candidate.item';
import ProgressBarComponent from '@components/ProgressBar/progress.bar';
import {ProgressView} from '@react-native-community/progress-view';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import {useSearchContext} from '@contexts/search.context';
const windowHeight = Dimensions.get('window').height;

const SpecificElectionScreen: React.FC<SpecificElectionScreenProps> = ({
  route,
}) => {
  const {election} = route.params;
  const [loading, setLoading] = useState(true);
  const [electionData, setElectionData] = useState<any>(null);
  const {search} = useSearchContext();
  const [candidates, setCandidates] = useState<CandidateViewModel[]>([]);
  const loadElectionData = async () => {
    setLoading(true);
    const mockData = [
      new CandidateViewModel('1', 'A', '#FF6B6B', 35),
      new CandidateViewModel('2', 'B', '#4ECDC4', 25),
      new CandidateViewModel('3', 'C', '#45B7D1', 20),
      new CandidateViewModel('4', 'D', '#96CEB4', 10),
      new CandidateViewModel('5', 'F', '#ffffff', 10),
    ];
    setCandidates(mockData);

    setLoading(false);
  };
  useEffect(() => {
    loadElectionData();
  }, []);

  if (loading) {
    return <ActivityIndicatorComponent />;
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={CommonStyles.textStyles.title}>{election.name}</Text>
          <Text style={CommonStyles.textStyles.subtitle}>{search.city}</Text>
        </View>
        <View style={styles.progressView}>
          <Text
            style={[CommonStyles.textStyles.subtitle, {textAlign: 'center'}]}>
            Seçimin Bitmesine: Tarih - Tarih
          </Text>
          <View
            style={{
              marginTop: styleNumbers.space * 2,
              marginBottom: styleNumbers.space * 2,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <ProgressView
              progressViewStyle="bar"
              style={{
                height: 30,
                width: '75%',
                marginHorizontal: styleNumbers.space * 2,
              }}
              progressTintColor="red"
              trackTintColor={Colors.getTheme().indicator}
              progress={0.7}
            />
            <Text
              style={[
                CommonStyles.textStyles.subtitle,
                {color: Colors.getTheme().text},
              ]}>
              ....%
            </Text>
          </View>
        </View>
        <View style={styles.pieChartContainer}>
          <View style={{height: windowHeight * 0.3}}>
            <PieChartComponent
              chartSize={windowHeight * 0.3}
              data={candidates}
            />
          </View>
          <View>
            <ChartLegendComponent candidates={candidates} />
          </View>
        </View>

        <View style={styles.candidateContainer}>
          {candidates.map((candidate, index) => (
            <View key={index} style={styles.candidateItem}>
              <CandidateItemComponent candidate={candidate} />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
};

export default SpecificElectionScreen;
