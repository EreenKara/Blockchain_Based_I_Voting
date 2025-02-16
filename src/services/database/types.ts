//kullanılmıyor
export interface User {
  id: number;
  username: string;
  password: string;
  identityNumber: string;
  phoneNumber: string;
  email: string;
  isCandidate: boolean;
  biography?: string;
  createdAt: string;
}
  
  export interface Election {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    createdBy: number;
    status: 'upcoming' | 'active' | 'completed';
  }
  
  export interface Vote {
    id: number;
    electionId: number;
    userId: number;
    candidateId: number;
    createdAt: string;
  }