import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../styles";
import { ExerciseInProgress } from "../types";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseProgressProps {
  exercise: ExerciseInProgress;
  onSetComplete: (setNumber: number) => void;
  onUpdateSet: (
    setNumber: number,
    field: "reps" | "weight",
    value: number
  ) => void;
}

export function ExerciseProgress({
  exercise,
  onSetComplete,
  onUpdateSet,
}: ExerciseProgressProps) {
  return (
    <View style={styles.exerciseProgress}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.muscleGroup}>{exercise.muscleGroup}</Text>

      <View style={styles.setsContainer}>
        {exercise.sets.map((set, index) => (
          <View key={index} style={styles.setRow}>
            <Text style={styles.setNumber}>Serie {set.setNumber}</Text>
            <TextInput
              style={styles.setInput}
              value={set.reps.toString()}
              onChangeText={(value) =>
                onUpdateSet(set.setNumber, "reps", parseInt(value) || 0)
              }
              keyboardType="numeric"
              placeholder="Reps"
            />
            <TextInput
              style={styles.setInput}
              value={set.weight.toString()}
              onChangeText={(value) =>
                onUpdateSet(set.setNumber, "weight", parseInt(value) || 0)
              }
              keyboardType="numeric"
              placeholder="Kg"
            />
            <TouchableOpacity
              style={[
                styles.completeButton,
                set.completed && styles.completedButton,
              ]}
              onPress={() => onSetComplete(set.setNumber)}
              disabled={set.completed}
            >
              <Ionicons
                name={
                  set.completed
                    ? "checkmark-circle"
                    : "checkmark-circle-outline"
                }
                size={24}
                color={set.completed ? "#4CAF50" : "#666"}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
