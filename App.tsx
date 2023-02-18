import FontsLoadedFunction from "./src/utils/fontsLoaded";
import { ThemeProvider } from "styled-components/native";
import { ActivityIndicator, LogBox, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import "./src/configs/firebase";
import { registerRootComponent } from "expo";

import { Routes } from "./src/routes/index";
import themes from "./src/styles/themes";
import { NavigationContainer } from "@react-navigation/native";

LogBox.ignoreAllLogs();
export default function App() {
  const fontsLoaded = FontsLoadedFunction.FontsLoadedFunction();
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <ThemeProvider theme={themes}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <View
        style={{
          backgroundColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
          flex: 1,
        }}
      >
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
}
registerRootComponent(App);
