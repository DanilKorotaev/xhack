interface IUser {
  id: number;
  avatarUrl?: string;
  name: string;
  email: string;
  specialization: string;
  description: string;
  //tags: string[];
  isAvailableForSearching: boolean;
}

export default IUser;
