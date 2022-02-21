export interface IQuestion {
  id?: number;
  userId?: number;
  title?: string;
  description?: string;
  createdAt?: string;
  tags?: {};
  votes?: number;
  answers?: number;
}

export interface IAnswer {
  id?: number;
  content?: string;
  userId?: number;
  createdAt?: string;
  best?: boolean;
}
