import { User } from "firebase/auth/react-native";
import { IFriendRequest } from "./Notification";
export interface Usuario {
  avatar?: string;
  name: string;
  email: string;
  id: string;
  background: {
    id: string;
    url: string;
  };
  friends: IFriendRequest[];
  chats?: string[];
}
