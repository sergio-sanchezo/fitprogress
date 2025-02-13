import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutCard } from "../../components/WorkoutCard";
import { styles } from "./../../styles";
import { Workout } from "@/types";

// Datos de ejemplo para la demo
// Datos de ejemplo
function generateSampleWorkouts(n: number): Workout[] {
  const workouts = [];
  for (let i = 1; i <= n; i++) {
    workouts.push({
      _id: i.toString(),
      name: `Rutina ${i}`,
      exercises: [
        {
          _id: "1",
          name: "Ejercicio 1",
          muscleGroup: "Grupo Muscular",
          totalSets: 4,
          reps: 12,
          weight: 60,
        },
        {
          _id: "2",
          name: "Ejercicio 2",
          muscleGroup: "Grupo Muscular",
          totalSets: 3,
          reps: 15,
          weight: 14,
        },
      ],
      date: new Date().toISOString(),
      duration: 60,
    });
  }
  return workouts;
}

const sampleWorkouts = generateSampleWorkouts(10);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Rutina del Día */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rutinas Disponibles</Text>
          <View style={styles.bentoGrid}>
            {sampleWorkouts.slice(0, 6).map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                onPress={() =>
                  router.push({
                    pathname: "/workouts/[id]/execute",
                    params: { id: workout._id },
                  })
                }
              />
            ))}
            {sampleWorkouts.length > 6 && (
              <TouchableOpacity onPress={() => router.push("/workouts")}>
                <Text style={styles.sectionLink}>Ver más rutinas</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Consejos de FitAI */}
        <View style={styles.section}>
          <Link href="/chat" asChild>
            <TouchableOpacity style={styles.aiChatButton}>
              <Ionicons name="chatbubble-ellipses" size={24} color="white" />
              <Text style={styles.aiChatButtonText}>Consultar a FitAI</Text>
              <Text style={styles.aiChatSubtext}>
                Obtén consejos personalizados para tu entrenamiento
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Próximas Rutinas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Rutinas</Text>
          <View style={styles.upcomingWorkouts}>
            <TouchableOpacity style={styles.upcomingWorkoutCard}>
              <Text style={styles.upcomingWorkoutDay}>Mañana</Text>
              <Text style={styles.upcomingWorkoutName}>Pierna y Glúteos</Text>
              <Text style={styles.upcomingWorkoutTime}>09:00 AM • 45 min</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.upcomingWorkoutCard}>
              <Text style={styles.upcomingWorkoutDay}>Jueves</Text>
              <Text style={styles.upcomingWorkoutName}>Espalda y Bíceps</Text>
              <Text style={styles.upcomingWorkoutTime}>10:00 AM • 60 min</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
