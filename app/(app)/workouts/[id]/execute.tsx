import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../../../styles";
import { Workout, ExerciseInProgress, Exercise } from "../../../../types";
import { RestTimer } from "../../../../components/RestTimer";
import { ExerciseProgress } from "../../../../components/ExerciseProgress";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useApi } from "@/hooks/useApi";
import { workoutApi } from "@/services/api";

export default function ExecuteWorkoutScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {
    data: workout,
    loading,
    error,
  } = useApi(() => workoutApi.getById(id as string), [id]);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [exercisesProgress, setExercisesProgress] = useState<
    ExerciseInProgress[]
  >([]);

  useEffect(() => {
    if (workout) {
      setExercisesProgress(
        workout.exercises.map((exercise: Exercise) => ({
          ...exercise,
          sets: Array.from({ length: exercise.totalSets }, () => ({
            reps: 0,
            weight: 0,
            completed: false,
          })),
        }))
      );
    }
  }, [workout]);

  const handleSetComplete = (setNumber: number) => {
    setExercisesProgress((prev) => {
      const newProgress = [...prev];
      const exercise = newProgress[currentExerciseIndex];
      exercise.sets[setNumber - 1].completed = true;
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
      exercise.sets[setNumber - 1][field] = value;
      return newProgress;
    });
  };

  const handleFinishWorkout = async () => {
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
              // Here you would typically save the workout progress to the backend
              // For now, we'll just navigate back
              Alert.alert(
                "Rutina finalizada",
                "Progreso guardado correctamente",
                [{ text: "OK", onPress: () => router.back() }]
              );
            } catch (error) {
              Alert.alert("Error", "No se pudo guardar el progreso");
            }
          },
        },
      ]
    );
  };

  if (loading || !workout) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.exerciseContainer}>
        <Text style={styles.workoutTitle}>{workout.name}</Text>

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
              currentExerciseIndex === workout.exercises.length - 1 &&
                styles.disabledButton,
            ]}
            onPress={() => setCurrentExerciseIndex((prev) => prev + 1)}
            disabled={currentExerciseIndex === workout.exercises.length - 1}
          >
            <Text style={styles.navButtonText}>Siguiente</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.finishButton}
        onPress={handleFinishWorkout}
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
  );
}
