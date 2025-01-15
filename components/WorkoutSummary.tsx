import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Workout, ExerciseInProgress } from "../types";
import { styles } from "../styles";
import Animated, { FadeIn } from "react-native-reanimated";

interface WorkoutSummaryProps {
  workout: Workout;
  exercisesProgress: ExerciseInProgress[];
  duration: number;
  onClose: () => void;
  onSave: () => void;
}

export function WorkoutSummary({
  workout,
  exercisesProgress,
  duration,
  onClose,
  onSave,
}: WorkoutSummaryProps) {
  const totalWeight = exercisesProgress.reduce((acc, exercise) => {
    return (
      acc +
      exercise.sets.reduce((setAcc, set) => {
        return setAcc + (set.completed ? set.weight * set.reps : 0);
      }, 0)
    );
  }, 0);

  const completedSets = exercisesProgress.reduce((acc, exercise) => {
    return acc + exercise.sets.filter((set) => set.completed).length;
  }, 0);

  return (
    <Animated.View
      style={styles.summaryContainer}
      entering={FadeIn.duration(500)}
    >
      <ScrollView>
        <Text style={styles.summaryTitle}>Resumen del Entrenamiento</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{duration} min</Text>
            <Text style={styles.statLabel}>Duración</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalWeight} kg</Text>
            <Text style={styles.statLabel}>Peso Total</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{completedSets}</Text>
            <Text style={styles.statLabel}>Series Completadas</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Detalle por Ejercicio</Text>
        {exercisesProgress.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseSummary}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={styles.setsGrid}>
              {exercise.sets.map((set, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.setBox,
                    set.completed && styles.completedSetBox,
                  ]}
                >
                  <Text style={styles.setText}>
                    {set.reps} × {set.weight}kg
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summaryActions}>
        <TouchableOpacity
          style={[styles.summaryButton, styles.saveButton]}
          onPress={onSave}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.summaryButton, styles.closeButton]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
