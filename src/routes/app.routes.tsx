import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { TabRoutes } from "./tabs.routes";
import { CreatePost } from "../screens/app/CreatePost";
import { SeePost } from "../screens/app/SeePost";
import { EditPost } from "../screens/app/EditPost";

const AppRoutes: React.FC = () => {
  return (
    <Navigator
      initialRouteName="TabsRoutes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SeePost" component={SeePost} />
      <Screen name="CreatePost" component={CreatePost} />
      <Screen name="TabsRoutes" component={TabRoutes} />
      <Screen name="EditPost" component={EditPost} />
    </Navigator>
  );
};

export { AppRoutes };
