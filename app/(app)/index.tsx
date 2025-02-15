// app/(app)/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutCard } from "../../components/WorkoutCard";
import { styles } from "./../../styles";
import { useWorkouts, useSuggestedWorkouts } from "@/hooks/useApi";

export default function HomeScreen() {
  const router = useRouter();
  const {
    data: workouts,
    loading: loadingWorkouts,
    error: errorWorkouts,
    refresh: refreshWorkouts,
  } = useWorkouts();

  const {
    data: suggestedWorkouts,
    loading: loadingSuggested,
    error: suggestedError,
    refresh: refreshSuggested,
  } = useSuggestedWorkouts();

  // Combine all loading states
  const isLoading = loadingWorkouts || loadingSuggested;

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    // Refresh both data sources simultaneously
    await Promise.all([refreshWorkouts(), refreshSuggested()]);
  }, [refreshWorkouts, refreshSuggested]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={["#4CAF50"]}
            tintColor="#4CAF50"
            title="Actualizando..."
            titleColor="#666"
          />
        }
      >
        {/* Rutinas Disponibles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rutinas Disponibles</Text>
          {loadingWorkouts ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : errorWorkouts ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Error: {errorWorkouts.message}
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={refreshWorkouts}
              >
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          ) : workouts && workouts.length === 0 ? (
            <Text style={styles.emptyStateText}>
              No hay rutinas disponibles por el momento.
            </Text>
          ) : (
            <View style={styles.bentoGrid}>
              {workouts &&
                workouts.slice(0, 6).map((workout) => (
                  <WorkoutCard
                    key={workout._id}
                    workout={workout}
                    onPress={() =>
                      router.push({
                        pathname: "/workouts/[id]",
                        params: { id: workout._id },
                      })
                    }
                  />
                ))}
              {workouts && workouts.length > 6 && (
                <TouchableOpacity
                  style={styles.viewMoreButton}
                  onPress={() => router.replace("/workouts")}
                >
                  <Text style={styles.sectionLink}>Ver más rutinas</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Consejos de FitAI */}
        <View style={styles.section}>
          <Link href="/chat" asChild>
            <TouchableOpacity style={styles.aiChatButton}>
              <Ionicons name="chatbubble-ellipses" size={24} color="white" />
              <Text style={styles.aiChatButtonText}>Consultar a FitAI</Text>
              <Text style={styles.aiChatSubtext}>
                Obtén consejos personalizados para tu entrenamiento
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Próximas Rutinas Inteligentes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Rutinas</Text>
          {loadingSuggested ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : suggestedError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Error: {suggestedError.message}
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={refreshSuggested}
              >
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          ) : suggestedWorkouts && suggestedWorkouts.length > 0 ? (
            <View style={styles.upcomingWorkouts}>
              {suggestedWorkouts.map((workout) => {
                const workoutDate = new Date(workout.date);
                const day = workoutDate.toLocaleDateString("es-ES", {
                  weekday: "long",
                });
                const time = workoutDate.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <TouchableOpacity
                    key={workout._id}
                    style={styles.upcomingWorkoutCard}
                    onPress={() => router.replace(`/workouts/${workout._id}`)}
                  >
                    <Text style={styles.upcomingWorkoutDay}>{day}</Text>
                    <Text style={styles.upcomingWorkoutName}>
                      {workout.name}
                    </Text>
                    <Text style={styles.upcomingWorkoutTime}>
                      {time} • {workout.duration} min
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <Text style={styles.emptyStateText}>
              No hay rutinas próximas programadas.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
