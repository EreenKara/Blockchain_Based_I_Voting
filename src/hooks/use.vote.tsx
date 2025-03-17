import {useState, useEffect} from 'react';
import UserService from '@services/backend/concrete/user.service';
import {
  ServiceContainer,
  ServiceType,
} from '@services/backend/concrete/service.container';
import GroupViewModel from '@viewmodels/group.viewmodel';
import ElectionService from '@services/backend/concrete/election.service';

export default function useVote() {
  const electionService = ServiceContainer.getService(
    ServiceType.ElectionService,
  ) as ElectionService;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const giveVote = async (electionId: string, candidateId: string) => {
    try {
      setLoading(true);
      const response = await electionService.giveVote(electionId, candidateId);
      setLoading(false);
      return response;
    } catch (err) {
      setError('Oy verme işlemi sırasında bir hata oluştu.');
      setLoading(false);
    }
  };

  return {giveVote, loading, error};
}
