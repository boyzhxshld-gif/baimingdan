export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  JUDGE = 'JUDGE'
}

export enum RegistrationStatus {
  PENDING_UPLOAD = 'PENDING_UPLOAD',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ENDED = 'ENDED'
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO Date string
  category: string;
  imageUrl?: string;
}

export interface RegistrationRecord {
  id: string;
  competitionId: string;
  competitionTitle: string;
  applicantName: string;
  status: RegistrationStatus;
  workName?: string;
}

export interface TVProgram {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  airTime: string;
}