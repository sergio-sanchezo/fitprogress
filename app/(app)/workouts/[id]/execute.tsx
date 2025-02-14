import { workoutApi } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExerciseProgress } from "../../../../components/ExerciseProgress";
import { RestTimer } from "../../../../components/RestTimer";
import { styles } from "../../../../styles";
import { Exercise, ExerciseInProgress } from "../../../../types";

interface WorkoutInstance {
  _id: string;
  templateId: {
    _id: string;
    name: string;
    exercises: Exercise[];
  };
  completed: boolean;
  completedAt?: string;
}

export default function ExecuteWorkoutScreen() {
  const { id } = useLocalSearchParams();
  const [workoutInstance, setWorkoutInstance] =
    useState<WorkoutInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [exercisesProgress, setExercisesProgress] = useState<
    ExerciseInProgress[]
  >([]);

  const getData = async () => {
    if (!id) {
      setError(new Error("No workout ID provided"));
      setLoading(false);
      return;
    }

    try {
      const instances = await workoutApi.getInstancesById(id as string);

      if (!instances || instances.length === 0) {
        throw new Error("No data received from server");
      }

      // Find any incomplete instance first
      let targetInstance = instances.find(
        (instance: any) => !instance.completed
      );

      // If no incomplete instance exists, use the most recent one as template
      if (!targetInstance) {
        targetInstance = instances[0]; // Most recent instance (sorted by date)
      }

      if (!targetInstance.templateId) {
        throw new Error("No template data found");
      }

      if (!Array.isArray(targetInstance.templateId.exercises)) {
        throw new Error("No exercises found in template");
      }

      setWorkoutInstance(targetInstance);

      // Initialize exercise progress
      const exercises = targetInstance.templateId.exercises;
      const initialProgress = exercises.map((exercise: Exercise) => ({
        _id: exercise._id,
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        totalSets: exercise.totalSets,
        reps: exercise.reps,
        weight: exercise.weight,
        sets: Array.from({ length: exercise.totalSets }, (_, index) => ({
          setNumber: index + 1,
          reps: exercise.reps,
          weight: exercise.weight,
          completed: false,
        })),
      }));

      setExercisesProgress(initialProgress);
    } catch (error) {
      console.error("Error fetching workout:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleSetComplete = (setNumber: number) => {
    setExercisesProgress((prev) => {
      const newProgress = [...prev];
      const exercise = newProgress[currentExerciseIndex];
      if (exercise && exercise.sets) {
        exercise.sets[setNumber - 1].completed = true;
      }
      return newProgress;
    });
    setShowTimer(true);
  };

  const handleUpdateSet = (
    setNumber: number,
    field: "reps" | "weight",
    value: number
  ) => {
    setExercisesProgress((prev) => {
      const newProgress = [...prev];
      const exercise = newProgress[currentExerciseIndex];
      if (exercise && exercise.sets) {
        exercise.sets[setNumber - 1][field] = value;
      }
      return newProgress;
    });
  };

  const handleFinishWorkout = async () => {
    if (!workoutInstance) return;

    // Validate all exercises are completed
    const allExercisesCompleted = exercisesProgress.every((exercise) =>
      exercise.sets.every((set) => set.completed)
    );

    if (!allExercisesCompleted) {
      Alert.alert(
        "Error",
        "Por favor completa todos los ejercicios antes de finalizar"
      );
      return;
    }

    Alert.alert(
      "Finalizar Rutina",
      "¿Estás seguro de que quieres finalizar la rutina?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Finalizar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);

              const completionData: any = {
                exercises: exercisesProgress.map((exercise) => ({
                  _id: exercise._id,
                  name: exercise.name,
                  muscleGroup: exercise.muscleGroup,
                  totalSets: exercise.totalSets,
                  reps: exercise.reps,
                  weight: exercise.weight,
                  sets: exercise.sets.map((set) => ({
                    setNumber: set.setNumber,
                    reps: set.reps,
                    weight: set.weight,
                    completed: set.completed,
                  })),
                })),
                completedAt: new Date().toISOString(),
                notes: "Workout completed successfully",
              };

              // Complete the workout
              await workoutApi.completeInstance(
                workoutInstance._id,
                completionData
              );

              Alert.alert(
                "Rutina finalizada",
                "Progreso guardado correctamente",
                [{ text: "OK", onPress: () => router.back() }]
              );
            } catch (error) {
              console.error("Error completing workout:", error);
              Alert.alert(
                "Error",
                "No se pudo guardar el progreso: " + (error as Error).message
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const allSetsCompleted = (exercise: ExerciseInProgress) => {
    return exercise.sets?.every((set) => set.completed) ?? false;
  };

  const currentExerciseCompleted = exercisesProgress[currentExerciseIndex]
    ? allSetsCompleted(exercisesProgress[currentExerciseIndex])
    : false;

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            title: "Ejecutar Rutina",
            headerShown: true,
            headerBackTitle: "Rutinas",
            headerStyle: {
              backgroundColor: "#1a1a1a",
            },
            headerTintColor: "#fff",
          }}
        />
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Cargando rutina...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            title: "Ejecutar Rutina",
            headerShown: true,
            headerBackTitle: "Rutinas",
            headerStyle: {
              backgroundColor: "#1a1a1a",
            },
            headerTintColor: "#fff",
          }}
        />
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setLoading(true);
              getData();
            }}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.retryButton, { marginTop: 10 }]}
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!workoutInstance || exercisesProgress.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            title: "Ejecutar Rutina",
            headerShown: true,
            headerBackTitle: "Rutinas",
            headerStyle: {
              backgroundColor: "#1a1a1a",
            },
            headerTintColor: "#fff",
          }}
        />
        <View style={styles.container}>
          <Text style={styles.errorText}>No se encontró la rutina</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: "Ejecutar Rutina",
          headerShown: true,
          headerBackTitle: "Rutinas",
          headerStyle: {
            backgroundColor: "#1a1a1a",
          },
          headerTintColor: "#fff",
        }}
      />
      <View style={styles.container}>
        <ScrollView style={styles.exerciseContainer}>
          <Text style={styles.workoutTitle}>
            {workoutInstance.templateId.name}
          </Text>

          {exercisesProgress[currentExerciseIndex] && (
            <ExerciseProgress
              exercise={exercisesProgress[currentExerciseIndex]}
              onSetComplete={handleSetComplete}
              onUpdateSet={handleUpdateSet}
            />
          )}

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentExerciseIndex === 0 && styles.disabledButton,
              ]}
              onPress={() => setCurrentExerciseIndex((prev) => prev - 1)}
              disabled={currentExerciseIndex === 0}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
              <Text style={styles.navButtonText}>Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                (currentExerciseIndex === exercisesProgress.length - 1 ||
                  !currentExerciseCompleted) &&
                  styles.disabledButton,
              ]}
              onPress={() => setCurrentExerciseIndex((prev) => prev + 1)}
              disabled={
                currentExerciseIndex === exercisesProgress.length - 1 ||
                !currentExerciseCompleted
              }
            >
              <Text style={styles.navButtonText}>Siguiente</Text>
              <Ionicons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.finishButton,
            !exercisesProgress.every(allSetsCompleted) && styles.disabledButton,
          ]}
          onPress={handleFinishWorkout}
          disabled={!exercisesProgress.every(allSetsCompleted)}
        >
          <Text style={styles.finishButtonText}>Finalizar Rutina</Text>
        </TouchableOpacity>

        {showTimer && (
          <RestTimer
            duration={60}
            onComplete={() => setShowTimer(false)}
            onCancel={() => setShowTimer(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
