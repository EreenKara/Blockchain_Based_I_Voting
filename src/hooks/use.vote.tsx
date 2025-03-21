import {useState, useEffect} from 'react';
import {electionService} from '@services/backend/concrete/service.container.instances';

export default function useVote() {
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
