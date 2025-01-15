import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles";
import type { Workout } from "../../types";

const sampleWorkouts: Workout[] = [
  {
    id: "1",
    name: "Pecho y Tríceps",
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
  },
  {
    id: "2",
    name: "Espalda y Bíceps",
    exercises: [
      {
        id: "1",
        name: "Dominadas",
        muscleGroup: "Espalda",
        totalSets: 3,
        reps: 10,
        weight: 0,
      },
      {
        id: "2",
        name: "Curl de Bíceps",
        muscleGroup: "Bíceps",
        totalSets: 3,
        reps: 12,
        weight: 15,
      },
    ],
    date: new Date().toISOString(),
    duration: 55,
  },
];

export default function WorkoutsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Botón Nueva Rutina */}
        <Link href="/workouts/create" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>Nueva Rutina</Text>
          </TouchableOpacity>
        </Link>

        {/* Lista de Rutinas */}
        <FlatList
          data={sampleWorkouts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.workoutCard}
              onPress={() => router.push(`/workouts/${item.id}` as any)}
            >
              <Text style={styles.workoutName}>{item.name}</Text>
              <Text style={styles.durationText}>
                {item.duration} min • {item.exercises.length} ejercicios
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.workoutsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
