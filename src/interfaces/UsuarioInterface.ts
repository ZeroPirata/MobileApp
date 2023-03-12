import { User } from "firebase/auth/react-native";
export interface Usuario extends User {
  displayName: string;
  email: string;
  assets?: {
    profile: string;
    background: string;
  };
}
