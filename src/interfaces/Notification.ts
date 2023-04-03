export interface IAlertas {
  requestfriends?: IFriendRequest[];
}

export interface IFriendRequest {
  index: number;
  name?: string;
  email?: string;
  id?: string;
  date?: number;
  avatar?: string;
}
