export interface Question {
  id: number;
  content: string;
  upvotes: number;
  createdAt: number;
  lastEdited: number;
  creator: Creator;
  category: Category;
  tags: string[];
  answers: Answer[];
}

export interface Answer {
  id: number;
  content: string;
  upvotes: number;
  createdAt: number;
  lastEdited: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Creator {
  id: number;
  username: string;
  email: string;
  role: string;
}
