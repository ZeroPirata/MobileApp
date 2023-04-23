export interface IAlertas {
  requestfriends?: IFriendRequest[];
  grupInvite?: IGrupo[];
}

export interface IFriendRequest {
  idUser: string;
  idRequest: string;
  email: string;
  data: string;
  avatar: string;
}

export interface IGrupo {
  idGroup: string;
  idRequest: string;
  avatar: string;
  data: number;
  name: string;
}
