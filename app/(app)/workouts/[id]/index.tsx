// app/(app)/workouts/[id]/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExerciseCard } from "../../../../components/ExerciseCard";
import { workoutApi } from "../../../../services/api";

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [workoutDetail, setWorkoutDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    loadWorkout(controller.signal);
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (error) {
      router.replace("/workouts");
    }
  }, [error, router]);

  const loadWorkout = useCallback(
    async (signal: AbortSignal) => {
      try {
        setLoading(true);
        // Pass the signal to your fetch inside workoutApi.getWorkoutDetail (make sure it's supported)
        const data = await workoutApi.getWorkoutDetail(id as string, signal);
        setWorkoutDetail(data);
        setError(null);
      } catch (err) {
        // If the error is due to abort, do nothing
        if ((err as any).name === "AbortError") return;
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  const handleDelete = async () => {
    try {
      await workoutApi.delete(id as string);
      router.replace("/workouts");
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleStartWorkout = () => {
    router.push({
      pathname: "/workouts/[id]/execute",
      params: { id: workoutDetail._id },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            title: "Detalle de Rutina",
            headerShown: true,
            headerBackTitle: "Rutinas",
            headerStyle: { backgroundColor: "#1a1a1a" },
            headerTintColor: "#fff",
          }}
        />
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !workoutDetail) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            title: "Detalle de Rutina",
            headerShown: true,
            headerBackTitle: "Rutinas",
            headerStyle: { backgroundColor: "#1a1a1a" },
            headerTintColor: "#fff",
          }}
        />
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.errorText}>
            {error?.message || "No se pudo cargar la rutina"}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => loadWorkout(new AbortController().signal)}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Extract the workout template from the unified detail.
  const template = workoutDetail.templateId;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: template?.name || "Detalle de Rutina",
          headerShown: true,
          headerBackTitle: "Rutinas",
          headerStyle: { backgroundColor: "#1a1a1a" },
          headerTintColor: "#fff",
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.workoutHeader}>
          {/* You can show meta data from the template */}
          <View style={styles.workoutMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.metaText}>{template.duration} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="barbell-outline" size={20} color="#666" />
              <Text style={styles.metaText}>
                {template.exercises.length} ejercicios
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.exercisesContainer}>
          <Text style={styles.sectionTitle}>Ejercicios</Text>
          {template.exercises.map((exercise: any) => (
            <ExerciseCard
              key={exercise._id}
              exercise={exercise}
              isEditing={false}
            />
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.startButton]}
            onPress={handleStartWorkout}
          >
            <Ionicons name="play" size={24} color="white" />
            <Text style={styles.actionButtonText}>Comenzar Rutina</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={24} color="white" />
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flex: 1, padding: 16 },
  centerContent: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  errorText: {
    color: "#ff4444",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  workoutHeader: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  workoutMeta: { flexDirection: "row", alignItems: "center" },
  metaItem: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  metaText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  exercisesContainer: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 32,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  startButton: { backgroundColor: "#4CAF50" },
  deleteButton: { backgroundColor: "#ff4444" },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
});
