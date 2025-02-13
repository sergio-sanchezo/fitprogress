// app/(app)/stats.tsx
import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "../../styles";
import { WeightChart } from "../../components/WeightChart";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWeightLogs } from "@/hooks/useApi";

export default function StatsScreen() {
  const { data: weightLogs, loading, error, refresh } = useWeightLogs();

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <Text>Error: {error.message}</Text>
        </View>
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
        <View style={styles.chartWrapper}>
          <WeightChart logs={weightLogs || []} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Entrenamientos Este Mes</Text>
          {/* You can fetch the actual workouts count from your API */}
          <Text style={styles.statValue}>
            {weightLogs ? weightLogs.length : 0}
          </Text>
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
