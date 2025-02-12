import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../../styles";
import { Exercise } from "../../types";
import { ExerciseSelector } from "../../components/ExerciseSelector";
import { Ionicons } from "@expo/vector-icons";

export default function CreateWorkoutScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleAddExercise = (exercise: Exercise) => {
    setExercises((prev) => [...prev, exercise]);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Por favor ingresa un nombre para la rutina");
      return;
    }
    if (exercises.length === 0) {
      Alert.alert("Error", "Agrega al menos un ejercicio a la rutina");
      return;
    }

    // Aquí iría la lógica para guardar la rutina
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Información de la Rutina</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la rutina"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Ejercicios</Text>
        <ExerciseSelector onSelect={handleAddExercise} />

        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.selectedExercise}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <TouchableOpacity
              onPress={() => handleRemoveExercise(exercise.id)}
              style={styles.removeButton}
            >
              <Ionicons name="close-circle" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Rutina</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
