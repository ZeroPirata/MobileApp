import { User } from "firebase/auth";
import { IFriendRequest } from "./Notification";

export interface ValidateList {
  list?: IFriendRequest[];
  user?: User | undefined;
  chats?: string[];
}
