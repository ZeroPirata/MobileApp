import FontsLoadedFunction from "./src/utils/fontsLoaded";
import { ThemeProvider } from "styled-components/native";
import { ActivityIndicator, LogBox, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import "./src/configs/firebase";
import { registerRootComponent } from "expo";

import { Routes } from "./src/routes/index";
import themes from "./src/styles/themes";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { AppState, AppStateStatus, NativeEventSubscription } from 'react-native';
LogBox.ignoreAllLogs();
export default function App() {
  const handleAppStateChange = (newAppState: AppStateStatus) => {
    if (newAppState === 'inactive') {
      console.log('O aplicativo foi fechado');
    }
  };
  useEffect(() => {
    const subscription: NativeEventSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange  // Correção na chamada da função
    );
    return () => {
      subscription.remove();
    };
  }, []);
  const fontsLoaded = FontsLoadedFunction.FontsLoadedFunction();
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <ThemeProvider theme={themes}>
      <StatusBar
        style="light"
        translucent
        backgroundColor={themes.COLORS.TEXT_and_BACKGROUND.GRAY3}
      />
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
