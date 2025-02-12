import { useWorkouts } from "@/hooks/useApi";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles";

export default function WorkoutsScreen() {
  const { data: workouts, loading, error, refresh } = useWorkouts();
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
          data={workouts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.workoutCard}
              onPress={() => {
                router.push(`/workouts/${item._id}` as any);
              }}
            >
              <Text style={styles.workoutName}>{item.name}</Text>
              <Text style={styles.durationText}>
                {item.duration} min • {item.exercises.length} ejercicios
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.workoutsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
