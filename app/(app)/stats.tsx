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
import { useMonthlyComparison, useWeeklyStats } from "@/hooks/useApi";
import { styles } from "../../styles";

export default function StatsScreen() {
  // Fetch weekly stats and monthly comparison
  const {
    data: weeklyStats,
    loading: loadingWeekly,
    error: weeklyError,
    refresh: refreshWeekly,
  } = useWeeklyStats();

  const {
    data: monthlyComparison,
    loading: loadingMonthly,
    error: monthlyError,
    refresh: refreshMonthly,
  } = useMonthlyComparison();

  // Combine loading and error states
  const isLoading = loadingWeekly || loadingMonthly;
  const error = weeklyError || monthlyError;

  // Combined refresh function
  const handleRefresh = React.useCallback(() => {
    refreshWeekly();
    refreshMonthly();
  }, [refreshWeekly, refreshMonthly]);

  // Helper to format duration (in minutes) as "Xh Ym"
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 32 }]}
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
