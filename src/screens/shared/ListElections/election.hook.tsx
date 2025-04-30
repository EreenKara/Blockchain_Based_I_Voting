import {ElectionType} from '@enums/election.type';
import {electionService} from '@services/backend/concrete/service.container.instances';

const useGetElectionsFunction = (
  electionType: ElectionType,
): ((city: string) => Promise<any[]>) => {
  let getElectionFunc = null;
  switch (electionType) {
    case ElectionType.Past:
      getElectionFunc = electionService.getPastElections;
      break;
    case ElectionType.Current:
      getElectionFunc = electionService.getCurrentElections;
      break;
    case ElectionType.Upcoming:
      getElectionFunc = electionService.getUpcomingElections;
      break;
    case ElectionType.Popular:
      getElectionFunc = electionService.getPopularElections;
      break;
    case ElectionType.Search:
      getElectionFunc = electionService.getElectionsByUserId;
      break;
    case ElectionType.BeingCandidate:
      getElectionFunc = electionService.getElectionsByUserId;
      break;
    case ElectionType.Casted:
      getElectionFunc = electionService.getElectionsByUserId;
      break;
    case ElectionType.Created:
      getElectionFunc = electionService.getElectionsByUserId;
      break;
    default:
      getElectionFunc = electionService.getPastElections;
      break;
  }
  return getElectionFunc;
};

export {useGetElectionsFunction};
