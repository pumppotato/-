
export interface Character {
  id: string;
  name: string;
  age: number;
  job: string;
  mbti: string;
  enneagram: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  personality: string;
  greeting: string;
  nsfwInfo: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
}

export type PostCategory = 'all' | 'notice' | 'suggestion' | 'praise';

export interface Post {
  id: number;
  category: PostCategory;
  author: string;
  content: string;
  likes: number;
  commentsCount: number;
  time: string;
  commentsList?: Comment[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
