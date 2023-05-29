import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import themes from "../styles/themes";
import {
  HomeTab,
  Profile,
  Chat,
  Grupos,
  Notification,
  Settings,
} from "../screens/tab";

interface TabBarIconProps {
  focused: boolean;
}

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  const renderTabBarIcon = (
    name: keyof typeof AntDesign.glyphMap,
    focused: boolean,
    nameScreen: string
  ) => (
    <View style={[style.view, focused && style.focus]}>
      <AntDesign
        name={name}
        size={20}
        color={
          focused ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3 : themes.COLORS.GRAY4
        }
      />
      <Text
        style={{
          color: focused
            ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
            : themes.COLORS.GRAY4,
        }}
      >
        {nameScreen}
      </Text>
    </View>
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: themes.COLORS.GRAY6,
        tabBarActiveTintColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
        tabBarStyle: {
          height: 50,
          backgroundColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY3,
        },
        tabBarIconStyle: {
          width: "100%",
        },
      }}
    >
      <Tab.Screen
        key={"home"}
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            renderTabBarIcon("home", focused, "home"),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            renderTabBarIcon("profile", focused, "profile"),
        }}
      />
      <Tab.Screen
        name="Chat"
        key={"chat"}
        component={Chat}
        options={{
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            renderTabBarIcon("message1", focused, "chat"),
        }}
      />
      <Tab.Screen
        name="Grupos"
        key={"grupos"}
        component={Grupos}
        options={{
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            renderTabBarIcon("notification", focused, "grups"),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Notifications"
        key={"notificacao"}
        component={Notification}
        options={{
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            renderTabBarIcon("heart", focused, "alerts"),
        }}
      />
      <Tab.Screen
        key={"settings"}
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            renderTabBarIcon("setting", focused, "Config"),
        }}
      />
    </Tab.Navigator>
  );
};

export { TabRoutes };

const style = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  focus: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1.5,
    borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
    height: "100%",
  },
});
