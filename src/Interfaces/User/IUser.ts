export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  roleId: number;
  email: string;
  privacy: {
    [index: string | 'profile' | 'blog']: boolean;
  };
}

export interface INotificationSettings {
  email: {
    articleComments: boolean;
    threadReplies: boolean;
    questionAnswers: boolean;
    privateMessages: boolean;
  };
  live: {
    articleReacted: boolean;
    questionUpvoted: boolean;
    threadStarred: boolean;
  };
}
