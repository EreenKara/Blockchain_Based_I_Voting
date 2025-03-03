import {ElectionType} from '@enums/election.type';

const getElectionTexts = (electionType: ElectionType) => {
  switch (electionType) {
    case ElectionType.Past:
      return {
        title: 'Geçmiş Seçimler',
        description: 'Geçmiş seçimlerin listesi aşağıdadır.',
        errorTitle: 'Geçmiş seçim bulunmamaktadır',
      };
    case ElectionType.Current:
      return {
        title: 'Güncel Seçimler',
        description: 'Güncel seçimlerin listesi aşağıdadır.',
        errorTitle: 'Aktif seçim bulunmamaktadır',
      };
    case ElectionType.Upcoming:
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
