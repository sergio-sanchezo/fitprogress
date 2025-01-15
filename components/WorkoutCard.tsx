import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";
import { Workout } from "../types";

interface WorkoutCardProps {
  workout: Workout;
  onPress?: () => void;
}

export function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.bentoCard} onPress={onPress}>
      <View style={styles.bentoCardIcon}>
        <Ionicons name="barbell-outline" size={28} color="#4CAF50" />
      </View>
      <Text style={styles.bentoCardTitle}>{workout.name}</Text>
      <Text style={styles.bentoCardText}>
        {workout.exercises.length} ejercicios
      </Text>
      <Text style={styles.bentoCardSubtext}>
        {workout.duration} min •{" "}
        {workout.exercises.reduce((sum, e) => sum + e.totalSets, 0)} series
      </Text>
    </TouchableOpacity>
  );
}
