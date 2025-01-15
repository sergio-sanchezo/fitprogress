import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Exercise } from "../types";
import { styles } from "../styles";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

// Base de datos de ejercicios predefinidos
const exerciseDatabase: Exercise[] = [
  {
    id: "1",
    name: "Press de Banca",
    muscleGroup: "Pecho",
    totalSets: 4,
    reps: 12,
    weight: 0,
  },
  {
    id: "2",
    name: "Sentadillas",
    muscleGroup: "Piernas",
    totalSets: 4,
    reps: 12,
    weight: 0,
  },
  {
    id: "3",
    name: "Peso Muerto",
    muscleGroup: "Espalda",
    totalSets: 4,
    reps: 12,
    weight: 0,
  },
  {
    id: "4",
    name: "Press Militar",
    muscleGroup: "Hombros",
    totalSets: 4,
    reps: 12,
    weight: 0,
  },
  // ... más ejercicios
];

interface ExerciseSelectorProps {
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseSelector({ onSelect }: ExerciseSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredExercises, setFilteredExercises] = useState(exerciseDatabase);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = exerciseDatabase.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(text.toLowerCase()) ||
        exercise.muscleGroup.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  const handleSelect = (exercise: Exercise) => {
    onSelect(exercise);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
        <Text style={styles.selectorButtonText}>Agregar Ejercicio</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Ejercicio</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar ejercicio..."
              value={searchText}
              onChangeText={handleSearch}
            />

            <FlatList
              data={filteredExercises}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
                  <TouchableOpacity
                    style={styles.exerciseItem}
                    onPress={() => handleSelect(item)}
                  >
                    <View>
                      <Text style={styles.exerciseName}>{item.name}</Text>
                      <Text style={styles.muscleGroup}>{item.muscleGroup}</Text>
                    </View>
                    <Ionicons name="add-circle" size={24} color="#4CAF50" />
                  </TouchableOpacity>
                </Animated.View>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
