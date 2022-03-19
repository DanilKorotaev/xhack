interface IHackathon {
  id: number;
  isOnline: boolean;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  siteUrl: string;
  avatarUrl?: string;
  tags: [];
  teams: [];
}

export default IHackathon;
