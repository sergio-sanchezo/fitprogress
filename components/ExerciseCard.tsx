// components/ExerciseCard.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
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
    <View style={styles.card}>
      {/* Exercise Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <View style={styles.muscleGroupBadge}>
            <Text style={styles.muscleGroupText}>{exercise.muscleGroup}</Text>
          </View>
        </View>
        {!isEditing && (
          <View style={styles.summaryBadge}>
            <Ionicons name="barbell-outline" size={16} color="#4CAF50" />
            <Text style={styles.summaryText}>
              {exercise.totalSets}×{exercise.reps} • {exercise.weight}kg
            </Text>
          </View>
        )}
      </View>

      {/* Sets Section */}
      {isEditing ? (
        <View style={styles.setsContainer}>
          {Array.from({ length: exercise.totalSets }).map((_, idx) => (
            <View key={idx} style={styles.setRow}>
              <View style={styles.setNumberContainer}>
                <Text style={styles.setNumber}>Serie {idx + 1}</Text>
              </View>

              <View style={styles.inputsContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      onUpdateSet?.(idx, "reps", parseInt(value))
                    }
                  />
                  <Text style={styles.inputLabel}>reps</Text>
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      onUpdateSet?.(idx, "weight", parseInt(value))
                    }
                  />
                  <Text style={styles.inputLabel}>kg</Text>
                </View>

                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => onCompleteSet?.(idx)}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.setsPreview}>
          {Array.from({ length: exercise.totalSets }).map((_, idx) => (
            <View key={idx} style={styles.setPreviewBadge}>
              <Text style={styles.setPreviewText}>{idx + 1}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  muscleGroupBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  muscleGroupText: {
    color: "#2E7D32",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  summaryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  summaryText: {
    color: "#1a1a1a",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  setsContainer: {
    gap: 12,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  setNumberContainer: {
    width: 80,
  },
  setNumber: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#666",
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "Poppins_400Regular",
  },
  completeButton: {
    padding: 8,
  },
  setsPreview: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  setPreviewBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  setPreviewText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#666",
  },
});
