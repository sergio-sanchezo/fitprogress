import { Stack } from "expo-router";

export default function WorkoutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a1a1a",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Rutinas",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Nueva Rutina",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
