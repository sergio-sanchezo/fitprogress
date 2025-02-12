import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Measurements } from "../../../types";
import { styles } from "../../../styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MeasurementsScreen() {
  const router = useRouter();
  const [measurements, setMeasurements] = useState<Measurements>({
    date: new Date().toISOString(),
    chest: 0,
    waist: 0,
    hips: 0,
    leftArm: 0,
    rightArm: 0,
    leftThigh: 0,
    rightThigh: 0,
    leftCalf: 0,
    rightCalf: 0,
  });

  const handleSave = () => {
    // Aquí iría la lógica para guardar las medidas
    Alert.alert("Éxito", "Medidas guardadas correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const renderMeasurementInput = (label: string, key: keyof Measurements) => (
    <View style={styles.measurementField}>
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
        placeholder="0"
      />
      <Text style={styles.measurementUnit}>cm</Text>
    </View>
  );

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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar Medidas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
