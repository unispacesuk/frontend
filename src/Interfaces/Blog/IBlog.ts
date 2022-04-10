export interface IBlog {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  lastUpdated: Date;
  user: {
    username: string;
    avatar: string;
    firstName: string;
    lastName: string;
  };
  votes: any[];
  comments: any[];
  count: number;
}
