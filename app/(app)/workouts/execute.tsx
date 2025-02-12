import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { styles } from "../../../styles";
import { Workout, ExerciseInProgress } from "../../../types";
import { RestTimer } from "../../../components/RestTimer";
import { ExerciseProgress } from "../../../components/ExerciseProgress";
import { Ionicons } from "@expo/vector-icons";

export default function ExecuteWorkoutScreen() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  // Información dummy predefinida
  const workout: Workout = {
    id: "1",
    name: "Rutina de Ejemplo",
    exercises: [
      {
        id: "1",
        name: "Press de Banca",
        muscleGroup: "Pecho",
        totalSets: 4,
        reps: 12,
        weight: 60,
      },
      {
        id: "2",
        name: "Aperturas",
        muscleGroup: "Pecho",
        totalSets: 3,
        reps: 15,
        weight: 14,
      },
    ],
    date: new Date().toISOString(),
    duration: 60,
  };

  const [exercisesProgress, setExercisesProgress] = useState<
    ExerciseInProgress[]
  >(
    workout.exercises.map((exercise) => ({
      ...exercise,
      sets: Array.from({ length: exercise.totalSets }, (_, i) => ({
        setNumber: i + 1,
        reps: exercise.reps,
        weight: exercise.weight,
        completed: false,
      })),
    }))
  );

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

  const handleFinishWorkout = () => {
    Alert.alert(
      "Finalizar Rutina",
      "¿Estás seguro de que quieres finalizar la rutina?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Finalizar",
          style: "destructive",
          onPress: () => {
            // Aquí iría la lógica para guardar el progreso
            Alert.alert("Rutina finalizada");
          },
        },
      ]
    );
  };

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
