
export interface UserLog {
  id: string;
  username: string;
  password: string;
  identityNumber: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  biography?: string;  
  isCandidate?: boolean; 
}

export interface LoginLog {
  username: string;
  timestamp: string;
  success: boolean;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  status: 'upcoming' | 'active' | 'completed';
}
  export interface Candidate {
    userId: string;
    electionId: string;
    biography: string;
    createdAt: string;
  }