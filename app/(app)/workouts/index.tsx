import { useWorkouts } from "@/hooks/useApi";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles";

export default function WorkoutsScreen() {
  const { data: workouts, loading, error, refresh } = useWorkouts();
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={workouts}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.workoutsList}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refresh}
              colors={["#4CAF50"]}
              tintColor="#4CAF50"
              title="Actualizando..."
              titleColor="#666"
            />
          }
          ListHeaderComponent={
            <Link href="/workouts/create" asChild>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Nueva Rutina</Text>
              </TouchableOpacity>
            </Link>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.workoutCard}
              onPress={() => router.push(`/workouts/${item._id}`)}
            >
              <Text style={styles.workoutName}>{item.name}</Text>
              <Text style={styles.durationText}>
                {item.duration} min • {item.exercises.length} ejercicios
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
