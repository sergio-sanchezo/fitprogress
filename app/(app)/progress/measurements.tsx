import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMeasurements } from "../../../hooks/useApi";
import { measurementApi } from "../../../services/api";
import { styles } from "../../../styles";
import { Measurements } from "../../../types";

export default function MeasurementsScreen() {
  const router = useRouter();
  const {
    data: existingMeasurements,
    loading: loadingHistory,
    refresh,
  } = useMeasurements();
  const [measurements, setMeasurements] = useState<Measurements>(
    {} as Measurements
  );
  const [loading, setLoading] = useState(false);

  // Get the latest measurements to show as placeholders
  const latestMeasurements = existingMeasurements?.[0];

  React.useEffect(() => {
    if (latestMeasurements) {
      // Pre-fill form with latest measurements as reference
      setMeasurements((prev) => ({
        ...prev,
        chest: latestMeasurements.chest,
        waist: latestMeasurements.waist,
        hips: latestMeasurements.hips,
        leftArm: latestMeasurements.leftArm,
        rightArm: latestMeasurements.rightArm,
        leftThigh: latestMeasurements.leftThigh,
        rightThigh: latestMeasurements.rightThigh,
        leftCalf: latestMeasurements.leftCalf,
        rightCalf: latestMeasurements.rightCalf,
      }));
    }
  }, [latestMeasurements]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await measurementApi.create(measurements);
      Alert.alert("Éxito", "Medidas guardadas correctamente", [
        {
          text: "OK",
          onPress: () => {
            refresh(); // Refresh the measurements list
            router.back();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar las medidas");
    } finally {
      setLoading(false);
    }
  };

  const renderMeasurementInput = (label: string, key: keyof Measurements) => {
    if (key === "date" || key === "_id") return null;

    return (
      <View style={styles.measurementField} key={key}>
        <Text style={styles.measurementLabel}>{label}</Text>
        <TextInput
          style={styles.measurementInput}
          value={measurements[key]?.toString()}
          onChangeText={(value) =>
            setMeasurements({
              ...measurements,
              [key]: parseFloat(value) || 0,
            })
          }
          keyboardType="numeric"
          placeholder={
            latestMeasurements ? latestMeasurements[key].toString() : "0"
          }
          placeholderTextColor="#666"
        />
        <Text style={styles.measurementUnit}>cm</Text>
      </View>
    );
  };

  const renderMeasurementHistory = () => {
    if (!existingMeasurements?.length) return null;

    return (
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Historial de Medidas</Text>
        {existingMeasurements.map((measurement, index) => (
          <View key={measurement._id || index} style={styles.historyCard}>
            <Text style={styles.historyDate}>
              {new Date(measurement.date).toLocaleDateString()}
            </Text>
            <View style={styles.historyGrid}>
              <View style={styles.historyRow}>
                <Text style={styles.historyLabel}>Pecho:</Text>
                <Text style={styles.historyValue}>{measurement.chest} cm</Text>
              </View>
              <View style={styles.historyRow}>
                <Text style={styles.historyLabel}>Cintura:</Text>
                <Text style={styles.historyValue}>{measurement.waist} cm</Text>
              </View>
              {/* Add more measurements as needed */}
            </View>
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => {
                // Show full details in a modal or navigate to detail screen
                Alert.alert(
                  "Detalles",
                  `
                  Pecho: ${measurement.chest} cm
                  Cintura: ${measurement.waist} cm
                  Cadera: ${measurement.hips} cm
                  Brazo Izq: ${measurement.leftArm} cm
                  Brazo Der: ${measurement.rightArm} cm
                  Muslo Izq: ${measurement.leftThigh} cm
                  Muslo Der: ${measurement.rightThigh} cm
                  Pant. Izq: ${measurement.leftCalf} cm
                  Pant. Der: ${measurement.rightCalf} cm
                `
                );
              }}
            >
              <Text style={styles.expandButtonText}>Ver Más</Text>
              <Ionicons name="chevron-down" size={16} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  if (loadingHistory) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerContent]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Registrar Medidas</Text>
          {renderMeasurementInput("Pecho", "chest")}
          {renderMeasurementInput("Cintura", "waist")}
          {renderMeasurementInput("Cadera", "hips")}
          {renderMeasurementInput("Brazo Izquierdo", "leftArm")}
          {renderMeasurementInput("Brazo Derecho", "rightArm")}
          {renderMeasurementInput("Muslo Izquierdo", "leftThigh")}
          {renderMeasurementInput("Muslo Derecho", "rightThigh")}
          {renderMeasurementInput("Pantorrilla Izquierda", "leftCalf")}
          {renderMeasurementInput("Pantorrilla Derecha", "rightCalf")}

          <TouchableOpacity
            style={[styles.saveButton, loading && styles.disabledButton]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.saveButtonText}>Guardar Medidas</Text>
            )}
          </TouchableOpacity>
        </View>

        {renderMeasurementHistory()}
      </ScrollView>
    </SafeAreaView>
  );
}
