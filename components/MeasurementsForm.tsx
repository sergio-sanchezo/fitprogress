import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Measurements } from "../types";
import { styles } from "../styles";

interface MeasurementsFormProps {
  onSave: (measurements: Measurements) => void;
  initialValues?: Measurements;
}

export function MeasurementsForm({
  onSave,
  initialValues,
}: MeasurementsFormProps) {
  const [measurements, setMeasurements] = useState<Measurements>(
    initialValues || {
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
    }
  );

  const handleSave = () => {
    onSave(measurements);
  };

  return (
    <ScrollView style={styles.container}>
      {Object.entries(measurements).map(([key, value]) => {
        if (key === "date") return null;
        return (
          <View key={key} style={styles.measurementField}>
            <Text style={styles.measurementLabel}>
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
            </Text>
            <TextInput
              style={styles.measurementInput}
              value={value.toString()}
              onChangeText={(text) =>
                setMeasurements({
                  ...measurements,
                  [key]: parseFloat(text) || 0,
                })
              }
              keyboardType="numeric"
              placeholder="0"
            />
            <Text style={styles.measurementUnit}>cm</Text>
          </View>
        );
      })}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Medidas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
