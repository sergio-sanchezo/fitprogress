import {
  useMonthlyComparison,
  useWeeklyStats,
  useWeightLogs,
} from "@/hooks/useApi";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WeightChart } from "../../components/WeightChart";
import { styles } from "../../styles";

export default function StatsScreen() {
  // Fetch all required data
  const {
    data: weightLogs,
    loading: loadingWeight,
    error: weightError,
    refresh: refreshWeight,
  } = useWeightLogs();

  const {
    data: weeklyStats,
    loading: loadingWeekly,
    refresh: refreshWeekly,
  } = useWeeklyStats();

  const {
    data: monthlyComparison,
    loading: loadingMonthly,
    refresh: refreshMonthly,
  } = useMonthlyComparison();

  // Combine all loading states
  const isLoading = loadingWeight || loadingWeekly || loadingMonthly;

  // Combine refresh functions
  const handleRefresh = React.useCallback(() => {
    refreshWeight();
    refreshWeekly();
    refreshMonthly();
  }, [refreshWeight, refreshWeekly, refreshMonthly]);

  if (weightError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Error: {weightError.message}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={["#4CAF50"]}
            tintColor="#4CAF50"
          />
        }
      >
        <View style={styles.chartWrapper}>
          <WeightChart logs={weightLogs || []} loading={loadingWeight} />
        </View>

        {/* Workouts This Month */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="fitness" size={24} color="#4CAF50" />
            <Text style={styles.statTitle}>Entrenamientos Este Mes</Text>
          </View>

          {loadingMonthly ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : (
            <>
              <Text style={styles.statValue}>
                {weeklyStats?.totalWorkouts || 0}
              </Text>
              <Text
                style={[
                  styles.statSubtext,
                  (monthlyComparison?.workoutChange ?? 0) > 0
                    ? styles.positiveChange
                    : styles.negativeChange,
                ]}
              >
                {(monthlyComparison?.workoutChange ?? 0) > 0 ? "+" : ""}
                {(monthlyComparison?.workoutChange ?? 0).toFixed(1)}% comparado
                con el mes anterior
              </Text>
            </>
          )}
        </View>

        {/* Total Weight Lifted */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="barbell" size={24} color="#4CAF50" />
            <Text style={styles.statTitle}>Peso Levantado Total</Text>
          </View>

          {loadingWeekly ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : (
            <>
              <Text style={styles.statValue}>
                {(weeklyStats?.totalWeight || 0).toLocaleString()} kg
              </Text>
              <Text style={styles.statSubtext}>Esta semana</Text>
            </>
          )}
        </View>

        {/* Total Training Time */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="time" size={24} color="#4CAF50" />
            <Text style={styles.statTitle}>Tiempo Total Entrenando</Text>
          </View>

          {loadingWeekly ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : (
            <>
              <Text style={styles.statValue}>
                {formatDuration(weeklyStats?.totalDuration || 0)}
              </Text>
              <Text style={styles.statSubtext}>Esta semana</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
