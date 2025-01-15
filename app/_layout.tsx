import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: "#1a1a1a" },
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "#888",
          headerStyle: { backgroundColor: "#1a1a1a" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="workouts"
          options={{
            title: "Rutinas",
            tabBarIcon: ({ color }) => (
              <Ionicons name="fitness" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: "Progreso",
            tabBarIcon: ({ color }) => (
              <Ionicons name="camera" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Estadísticas",
            tabBarIcon: ({ color }) => (
              <Ionicons name="bar-chart-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "FitAI",
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
