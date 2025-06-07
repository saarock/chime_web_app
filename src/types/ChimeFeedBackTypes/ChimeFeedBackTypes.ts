export interface Feedback {
  userId?: string;            // Optional, MongoDB ObjectId as string
  email: string;
  rating: number;             // 1 to 5
  category: 'video-quality' | 'audio-quality' | 'connection' | 'features' | 'other';
  callQuality?: number;       // 1 to 5, optional
  easeOfUse?: number;         // 1 to 5, optional
  wouldRecommend: boolean;
  features: string[];         // List of features mentioned
  feedback?: string;          // Optional feedback text
  improvements?: string;      // Optional improvements text
  submittedAt?: Date;         // Optional submission date
}