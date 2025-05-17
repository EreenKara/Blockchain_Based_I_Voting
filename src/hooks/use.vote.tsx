import {useState, useEffect} from 'react';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {candidateService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from './Modular/use.async';
import CandidateViewModel from '@viewmodels/candidate.viewmodel';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import DetailedElectionViewModel from '@viewmodels/detailed.election.viewmodel';

export default function useVote() {
  const {
    execute: giveVote,
    loading,
    error,
    success,
  } = useAsync<void>(
    (electionId, candidateId, accessType: 'public' | 'private') => {
      if (accessType === 'public')
        return electionService.giveVotePublic(electionId, candidateId);
      else return electionService.giveVotePrivate(electionId, candidateId);
    },
    {
      showNotificationOnError: true,
      successMessage: 'Election fetched successfully',
    },
  );

  const {
    execute: fetchCandidates,
    data: candidates,
    loading: fetchCandidatesLoading,
    error: fetchCandidatesError,
    success: fetchCandidatesSuccess,
  } = useAsync<CandidateViewModel[]>(electionId =>
    candidateService.getCandidatesByElectionId(electionId),
  );
  const {
    execute: getElection,
    data: election,
    loading: accessLoading,
    error: accessError,
    success: accessSuccess,
  } = useAsync<DetailedElectionViewModel>(electionId =>
    electionService.getElectionByElectionId(electionId),
  );

  return {
    giveVote,
    loading,
    error,
    success,
    fetchCandidates,
    candidates,
    fetchCandidatesLoading,
    fetchCandidatesError,
    fetchCandidatesSuccess,
    getElection,
    election,
    accessLoading,
    accessSuccess,
    accessError,
  };
}
