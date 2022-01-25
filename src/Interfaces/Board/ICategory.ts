import { IBoard } from './IBoard';

export interface ICategory {
  id: number;
  title: string;
  description: string;
  boards: IBoard[];
}
