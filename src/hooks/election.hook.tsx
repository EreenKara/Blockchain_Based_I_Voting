import {ElectionType} from '@enums/election.type';
import {electionService} from '@services/backend/concrete/service.container.instances';

const useGetElectionsFunction = (
  electionType: ElectionType,
): ((city: string) => Promise<any[]>) => {
  let getElectionFunc = null;
  switch (electionType) {
    case ElectionType.Past:
      getElectionFunc = electionService.getPastElections;
    case ElectionType.Current:
      getElectionFunc = electionService.getCurrentElections;
    case ElectionType.Upcoming:
      getElectionFunc = electionService.getUpcomingElections;
    case ElectionType.Popular:
      getElectionFunc = electionService.getPopularElections;
    case ElectionType.Created:
      getElectionFunc = electionService.getElectionsByUserId;
    default:
      getElectionFunc = electionService.getPastElections;
  }
  return getElectionFunc;
};

export {useGetElectionsFunction};
