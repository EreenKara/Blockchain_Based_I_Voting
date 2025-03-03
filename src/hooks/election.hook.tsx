import {ElectionType} from '@enums/election.type';
import {ElectionService} from '@services/backend/concrete/election.service';
import {ServiceType} from '@services/backend/concrete/service.container';
import {ServiceContainer} from '@services/backend/concrete/service.container';

const useGetElectionsFunction = (
  electionType: ElectionType,
): ((city: string) => Promise<any[]>) => {
  const electionService = ServiceContainer.getService(
    ServiceType.ElectionService,
  ) as ElectionService;

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
