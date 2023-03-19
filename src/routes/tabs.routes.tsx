import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTab } from "../screens/tab/Home";
import themes from "../styles/themes";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { Chat } from "../screens/tab/chat";
import { Settings } from "../screens/tab/settings";
import { Profile } from "../screens/tab/profile";
const { Navigator, Screen, Group } = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  return (
    <Navigator
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
      <Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? style.focus : style.view}>
              <AntDesign
                name="home"
                size={20}
                color={
                  focused
                    ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
                    : themes.COLORS.GRAY4
                }
              />
              <Text
                style={{
                  color: focused
                    ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
                    : themes.COLORS.GRAY4,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? style.focus : style.view}>
              <AntDesign
                name="user"
                size={20}
                color={
                  focused
                    ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
                    : themes.COLORS.GRAY4
                }
              />
              <Text
                style={{
                  color: focused
                    ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
                    : themes.COLORS.GRAY4,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
      <Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? style.focus : style.view}>
              <AntDesign
                name="message1"
                size={20}
                color={
                  focused
                    ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
                    : themes.COLORS.GRAY4
                }
              />
              <Text
                style={{
                  color: focused
                    ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
                    : themes.COLORS.GRAY4,
                }}
              >
                Chat
              </Text>
            </View>
          ),
        }}
      />
      <Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? style.focus : style.view}>
              <AntDesign
                name="setting"
                size={20}
                color={
                  focused
                    ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
                    : themes.COLORS.GRAY4
                }
              />
              <Text
                style={{
                  color: focused
                    ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
                    : themes.COLORS.GRAY4,
                }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Navigator>
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
