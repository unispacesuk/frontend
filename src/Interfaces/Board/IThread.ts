export interface IThread {
  id: number;
  title: string;
  content: string;
  board?: string | string[]; // dodgy code here
  username?: string;
  avatar?: string;
  createdAt?: Date;
  boardTitle?: string;
  catTitle?: string;
}
