import {ElectionScreenType} from '@enums/election.screen.type';

const getElectionTexts = (electionType: ElectionScreenType) => {
  switch (electionType) {
    case ElectionScreenType.PastElections:
      return {
        title: 'Geçmiş Seçimler',
        description: 'Geçmiş seçimlerin listesi aşağıdadır.',
        errorTitle: 'Geçmiş seçim bulunmamaktadır',
      };
    case ElectionScreenType.CurrentElections:
      return {
        title: 'Güncel Seçimler',
        description: 'Güncel seçimlerin listesi aşağıdadır.',
        errorTitle: 'Aktif seçim bulunmamaktadır',
      };
    case ElectionScreenType.UpComingElections:
      return {
        title: 'Gelecek Seçimler',
        description: 'Gelecek seçimlerin listesi aşağıdadır.',
        errorTitle: 'Gelecek seçim bulunmamaktadır',
      };
    default:
      return {
        title: 'Seçimler',
        description: 'Seçimlerin listesi aşağıdadır.',
        errorTitle: 'Seçim bulunmamaktadır',
      };
  }
};

export default getElectionTexts;
