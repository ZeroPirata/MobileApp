import { IPost, IImage } from "../interfaces/PostInterface";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUp: undefined;
      CreatePost: undefined;
      TabsRoutes: undefined;
      SeePost: IPost;
      EditPost: IPost;
    }
  }
}