import {useState, useEffect} from 'react';
import {candidateService} from '@services/backend/concrete/service.container.instances';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from './Modular/use.async';
import CandidateViewModel from '@viewmodels/candidate.viewmodel';
import DetailedElectionViewModel from '@viewmodels/detailed.election.viewmodel';

export default function useElectionResult() {
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
    execute: fetchElection,
    data: election,
    loading: fetchElectionLoading,
    error: fetchElectionError,
    success: fetchElectionSuccess,
  } = useAsync<DetailedElectionViewModel>(
    electionId => electionService.getElectionByElectionId(electionId),
    {
      showNotificationOnError: true,
      successMessage: 'Election fetched successfully',
    },
  );

  return {
    fetchCandidates,
    candidates,
    fetchCandidatesLoading,
    fetchCandidatesError,
    fetchCandidatesSuccess,
    fetchElection,
    election,
    fetchElectionLoading,
    fetchElectionError,
    fetchElectionSuccess,
  };
}
