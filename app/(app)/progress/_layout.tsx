import { Stack } from "expo-router";

export default function ProgressLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="capture"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="compare"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="measurements"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
