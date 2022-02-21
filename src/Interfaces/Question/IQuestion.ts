export interface IQuestion {
  id?: number;
  title?: string;
  description?: string;
  createdAt?: string;
  tags?: {};
  votes?: number;
  answers?: number;
  // [key: string]: any;
}

export interface IAnswer {
  id?: number;
  content?: string;
  userId?: number;
  createdAt?: string;
}
