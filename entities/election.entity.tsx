export enum ElectionStatus {
  Upcoming = 'upcoming',
  Active = 'active',
  Completed = 'completed',
}

export enum ElectionAccessType {
  Public = 'public',
  Private = 'private',
}

export interface Election {
  id: number;
  createdBy: number; // FK, bir userId'i gösterir
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  status: ElectionStatus;
  accessType: ElectionAccessType;
  createdAt: string;
  updatedAt: string;
}

// dbo'larda buralara gelsin
