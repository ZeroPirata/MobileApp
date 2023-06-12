import {IChat} from "../interfaces/Chat";
import {IPost, IImage} from "../interfaces/PostInterface";
import {InterfaceGrupoList} from "../interfaces/GruposInterface";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUp: undefined;
      CreatePost: undefined;
      TabsRoutes: {
        screen:
          | "Home"
          | "Notifications"
          | "Settings"
          | "Grupos"
          | "Chat"
          | "Profile";
      };
      CreateGrupo: undefined;
      SeePost: IPost;
      SeeGrupo: {
        Home: InterfaceGrupoList;
      };
      EditPost: IPost;
      ListSearchedUser: ListSearchedUsers[];
      ChatBeetwen: IChat;
    }
  }
}
