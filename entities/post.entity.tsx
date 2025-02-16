export interface Post {
  id: string;
  socialMediaId: number; // FK
  candidateId: number; // FK
  content: string;
  image: string;
  likes: number;
  dislikes: number;
}

// dbo'larda buralara gelsin
