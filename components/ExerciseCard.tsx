import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { Exercise } from "../types";

interface ExerciseCardProps {
  exercise: Exercise;
  onUpdateSet?: (
    setNumber: number,
    field: "reps" | "weight",
    value: number
  ) => void;
  onCompleteSet?: (setNumber: number) => void;
  isEditing?: boolean;
}

export function ExerciseCard({
  exercise,
  onUpdateSet,
  onCompleteSet,
  isEditing = false,
}: ExerciseCardProps) {
  return (
    <View style={styles.exerciseCard}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.muscleGroup}>{exercise.muscleGroup}</Text>

      {isEditing ? (
        <View style={styles.setsContainer}>
          {Array.from({ length: exercise.totalSets }).map((_, idx) => (
            <View key={idx} style={styles.setRow}>
              <Text style={styles.setNumber}>Set {idx + 1}</Text>
              <TextInput
                style={styles.setInput}
                placeholder="Reps"
                keyboardType="numeric"
                onChangeText={(value) =>
                  onUpdateSet?.(idx, "reps", parseInt(value))
                }
              />
              <TextInput
                style={styles.setInput}
                placeholder="Kg"
                keyboardType="numeric"
                onChangeText={(value) =>
                  onUpdateSet?.(idx, "weight", parseInt(value))
                }
              />
              <TouchableOpacity
                style={styles.completeSetButton}
                onPress={() => onCompleteSet?.(idx)}
              >
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.setsSummary}>
          <Text style={styles.setsText}>
            {exercise.totalSets} series × {exercise.reps} reps @{" "}
            {exercise.weight}kg
          </Text>
        </View>
      )}
    </View>
  );
}
