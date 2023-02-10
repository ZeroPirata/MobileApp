import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { TabRoutes } from "./tabs.routes";
import { CreatePost } from "../screens/app/CreatePost";

const AppRoutes: React.FC = () => {
  return (
    <Navigator
      initialRouteName="TabsRoutes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="CreatePost" component={CreatePost} />
      <Screen name="TabsRoutes" component={TabRoutes} />
    </Navigator>
  );
};

export { AppRoutes };
