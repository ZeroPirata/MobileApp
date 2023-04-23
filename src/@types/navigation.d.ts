import { IChat } from "../interfaces/Chat";
import { IPost, IImage } from "../interfaces/PostInterface";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUp: undefined;
      CreatePost: undefined;
      TabsRoutes: undefined;
      CreateGrupo: undefined;
      SeePost: IPost;
      EditPost: IPost;
      ListSearchedUser: ListSearchedUsers[];
      ChatBeetwen: IChat;
    }
  }
}
