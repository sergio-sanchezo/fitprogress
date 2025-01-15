import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../styles";
import { WeightChart } from "../components/WeightChart";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleWeightLogs = [
  { date: "2024-01-01", weight: 73.2 },
  { date: "2024-01-15", weight: 74.5 },
  { date: "2024-02-01", weight: 75.8 },
  { date: "2024-02-15", weight: 77.2 },
];

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartWrapper}>
          <WeightChart logs={sampleWeightLogs} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Entrenamientos Este Mes</Text>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statSubtext}>
            +2 comparado con el mes anterior
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Peso Levantado Total</Text>
          <Text style={styles.statValue}>2,450 kg</Text>
          <Text style={styles.statSubtext}>Esta semana</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Tiempo Total Entrenando</Text>
          <Text style={styles.statValue}>8h 30m</Text>
          <Text style={styles.statSubtext}>Esta semana</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
