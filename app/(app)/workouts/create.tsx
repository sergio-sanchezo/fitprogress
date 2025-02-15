import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { workoutApi } from "../../../services/api";
import { Exercise } from "../../../types";
import { ExerciseSelector } from "../../../components/ExerciseSelector";

export default function CreateWorkoutScreen() {
  const router = useRouter();

  // Workout details state
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("strength");
  const [frequency, setFrequency] = useState("weekly");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Custom exercise modal state
  const [showCustomExerciseModal, setShowCustomExerciseModal] = useState(false);
  const [customExercise, setCustomExercise] = useState({
    name: "",
    muscleGroup: "",
    totalSets: "",
    reps: "",
    weight: "",
  });

  const workoutTypes = ["strength", "cardio", "flexibility", "mixed"];
  const frequencies = ["daily", "weekly", "monthly"];

  const handleAddExercise = (exercise: Exercise) => {
    setExercises((prev) => [...prev, exercise]);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises((prev) => prev.filter((e) => e._id !== id));
  };

  const handleSaveCustomExercise = async () => {
    if (!customExercise.name.trim()) {
      Alert.alert("Error", "Ingresa el nombre del ejercicio");
      return;
    }
    if (!customExercise.muscleGroup.trim()) {
      Alert.alert("Error", "Ingresa el grupo muscular");
      return;
    }
    if (
      !customExercise.totalSets.trim() ||
      isNaN(Number(customExercise.totalSets))
    ) {
      Alert.alert("Error", "Número de series inválido");
      return;
    }
    if (!customExercise.reps.trim() || isNaN(Number(customExercise.reps))) {
      Alert.alert("Error", "Número de repeticiones inválido");
      return;
    }
    if (!customExercise.weight.trim() || isNaN(Number(customExercise.weight))) {
      Alert.alert("Error", "Peso inválido");
      return;
    }

    const newExercise = await workoutApi.createCustomExercise({
      ...customExercise,
      totalSets: Number(customExercise.totalSets),
      reps: Number(customExercise.reps),
      weight: Number(customExercise.weight),
    });

    setExercises((prev) => [...prev, newExercise]);
    setShowCustomExerciseModal(false);
    setCustomExercise({
      name: "",
      muscleGroup: "",
      totalSets: "",
      reps: "",
      weight: "",
    });
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Ingresa un nombre para la rutina");
      return;
    }
    if (!duration.trim() || isNaN(Number(duration))) {
      Alert.alert("Error", "Ingresa una duración válida (en minutos)");
      return;
    }
    if (exercises.length === 0) {
      Alert.alert("Error", "Agrega al menos un ejercicio a la rutina");
      return;
    }

    try {
      const muscleGroups = Array.from(
        new Set(exercises.map((e) => e.muscleGroup))
      );
      const payload = {
        name: name.trim(),
        exercises: exercises.map((e) => e._id),
        duration: Number(duration),
        frequency,
        type,
        muscleGroups,
        date: new Date().toISOString(),
      };

      await workoutApi.create(payload);
      Alert.alert("Éxito", "Rutina guardada correctamente");
      router.back();
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo guardar la rutina: " + (error as Error).message
      );
    }
  };

  console.log(exercises);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Basic Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Básica</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la rutina"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Duración (minutos)"
              placeholderTextColor="#666"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Rutina</Text>
          <View style={styles.optionsGrid}>
            {workoutTypes.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  type === option && styles.optionButtonActive,
                ]}
                onPress={() => setType(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    type === option && styles.optionTextActive,
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Frequency Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frecuencia</Text>
          <View style={styles.optionsGrid}>
            {frequencies.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  frequency === option && styles.optionButtonActive,
                ]}
                onPress={() => setFrequency(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    frequency === option && styles.optionTextActive,
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Exercises Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejercicios</Text>
          <ExerciseSelector onSelect={handleAddExercise} />

          <TouchableOpacity
            style={styles.customExerciseButton}
            onPress={() => setShowCustomExerciseModal(true)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
            <Text style={styles.customExerciseButtonText}>
              Crear Ejercicio Personalizado
            </Text>
          </TouchableOpacity>

          {exercises.map((exercise) => (
            <View key={exercise._id} style={styles.exerciseCard}>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.exerciseDetails}>
                  <View style={styles.muscleGroupBadge}>
                    <Text style={styles.muscleGroupText}>
                      {exercise.muscleGroup}
                    </Text>
                  </View>
                  <Text style={styles.setsInfo}>
                    {exercise.totalSets}×{exercise.reps} • {exercise.weight}kg
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveExercise(exercise._id)}
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

        {/* Custom Exercise Modal */}
        <Modal
          visible={showCustomExerciseModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowCustomExerciseModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Crear Ejercicio Personalizado
              </Text>

              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Nombre del ejercicio"
                  placeholderTextColor="#666"
                  value={customExercise.name}
                  onChangeText={(text) =>
                    setCustomExercise((prev) => ({ ...prev, name: text }))
                  }
                />
              </View>

              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Grupo muscular"
                  placeholderTextColor="#666"
                  value={customExercise.muscleGroup}
                  onChangeText={(text) =>
                    setCustomExercise((prev) => ({
                      ...prev,
                      muscleGroup: text,
                    }))
                  }
                />
              </View>

              <View style={styles.modalInputRow}>
                <View
                  style={[
                    styles.modalInputContainer,
                    { flex: 1, marginRight: 8 },
                  ]}
                >
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Series"
                    placeholderTextColor="#666"
                    value={customExercise.totalSets}
                    onChangeText={(text) =>
                      setCustomExercise((prev) => ({
                        ...prev,
                        totalSets: text,
                      }))
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View
                  style={[
                    styles.modalInputContainer,
                    { flex: 1, marginLeft: 8 },
                  ]}
                >
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Repeticiones"
                    placeholderTextColor="#666"
                    value={customExercise.reps}
                    onChangeText={(text) =>
                      setCustomExercise((prev) => ({ ...prev, reps: text }))
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Peso (kg)"
                  placeholderTextColor="#666"
                  value={customExercise.weight}
                  onChangeText={(text) =>
                    setCustomExercise((prev) => ({ ...prev, weight: text }))
                  }
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancelButton]}
                  onPress={() => setShowCustomExerciseModal(false)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalSaveButton]}
                  onPress={handleSaveCustomExercise}
                >
                  <Text style={styles.modalButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1a1a1a",
    fontFamily: "Poppins_400Regular",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  optionButtonActive: {
    backgroundColor: "#4CAF50",
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  optionTextActive: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
  },
  customExerciseButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  customExerciseButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#4CAF50",
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  exerciseDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  muscleGroupBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  muscleGroupText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#4CAF50",
  },
  setsInfo: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  removeButton: {
    padding: 8,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 16,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  modalInputContainer: {
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1a1a1a",
    fontFamily: "Poppins_400Regular",
  },
  modalInputRow: {
    flexDirection: "row",
    gap: 8,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
  },
  modalCancelButton: {
    backgroundColor: "#ff4444",
    marginRight: 8,
  },
  modalSaveButton: {
    backgroundColor: "#4CAF50",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
