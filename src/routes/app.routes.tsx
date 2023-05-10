import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { TabRoutes } from "./tabs.routes";
import { CreatePost } from "../screens/app/CreatePost";
import { SeePost } from "../screens/app/SeePost";
import { EditPost } from "../screens/app/EditPost";
import { ListSearchedUser } from "../screens/app/ListUsers";
import { ChatBeetwen, CreateGrupo } from "../screens/app";
import { useAuthentication } from "../hooks/useAuthentication";
import { EmailVerifed } from "../screens/auth";

const AppRoutes: React.FC = () => {
  const { user } = useAuthentication();
  if (user?.emailVerified === false) {
    return <EmailVerifed />;
  }
  return (
    <Navigator
      initialRouteName="TabsRoutes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SeePost" component={SeePost} />
      <Screen name="CreatePost" component={CreatePost} />
      <Screen name="CreateGrupo" component={CreateGrupo} />
      <Screen name="TabsRoutes" component={TabRoutes} />
      <Screen name="EditPost" component={EditPost} />
      <Screen name="ChatBeetwen" component={ChatBeetwen} />
      <Screen name="ListSearchedUser" component={ListSearchedUser} />
    </Navigator>
  );
};

export { AppRoutes };
