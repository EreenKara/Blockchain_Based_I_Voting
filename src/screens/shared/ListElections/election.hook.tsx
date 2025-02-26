import {ElectionScreenType} from '@enums/election.screen.type';
import {ElectionService} from '@services/backend/concrete/election.service';

const useGetElectionsFunction = (
  electionType: ElectionScreenType,
): ((city: string) => Promise<any[]>) => {
  const electionService = new ElectionService();
  let getElectionFunc = null;
  switch (electionType) {
    case ElectionScreenType.PastElections:
      getElectionFunc = electionService.getElectionsByCity;
    case ElectionScreenType.CurrentElections:
      getElectionFunc = electionService.getElectionsByCity;
    case ElectionScreenType.UpComingElections:
      getElectionFunc = electionService.getElectionsByCity;
    default:
      getElectionFunc = electionService.getElectionsByCity;
  }
  return getElectionFunc;
};

export {useGetElectionsFunction};
