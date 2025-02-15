import React, { useState, useEffect } from "react";
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
import { useExercises } from "../hooks/useApi";

interface ExerciseSelectorProps {
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseSelector({ onSelect }: ExerciseSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: exerciseDatabase, loading, error, refresh } = useExercises();

  // Local state for filtered exercises; update when the fetched data is available.
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (exerciseDatabase) {
      setFilteredExercises(exerciseDatabase);
    }
  }, [exerciseDatabase]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (exerciseDatabase) {
      const filtered = exerciseDatabase.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(text.toLowerCase()) ||
          exercise.muscleGroup.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  };

  const handleSelect = (exercise: Exercise) => {
    onSelect(exercise);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <TouchableOpacity style={styles.selectorButton} disabled>
        <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
        <Text style={styles.selectorButtonText}>Cargando ejercicios...</Text>
      </TouchableOpacity>
    );
  }

  if (error) {
    return (
      <TouchableOpacity style={styles.selectorButton} onPress={refresh}>
        <Ionicons name="alert-circle-outline" size={24} color="#FF4444" />
        <Text style={styles.selectorButtonText}>Error, reintentar</Text>
      </TouchableOpacity>
    );
  }

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
              keyExtractor={(item) => item._id}
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
