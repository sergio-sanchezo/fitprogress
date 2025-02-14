// components/WeightChart.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { WeightLog } from "../types";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";

interface WeightChartProps {
  logs: WeightLog[];
  loading?: boolean;
}

type TimeRange = "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";

export function WeightChart({ logs, loading }: WeightChartProps) {
  const { width } = useWindowDimensions();
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const [selectedPoint, setSelectedPoint] = useState<WeightLog | null>(null);

  // Calculate date ranges for filtering
  const dateRanges = useMemo(() => {
    const now = new Date();
    return {
      "1W": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      "1M": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      "3M": new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
      "6M": new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000),
      "1Y": new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
      ALL: new Date(0),
    };
  }, []);

  // Enhanced data processing with time range filtering and statistics
  const { sortedLogs, chartData, statistics } = useMemo(() => {
    if (!logs.length) {
      return {
        sortedLogs: [],
        chartData: null,
        statistics: {
          weightChange: 0,
          averageWeight: 0,
          minWeight: 0,
          maxWeight: 0,
        },
      };
    }

    // Sort and filter logs based on selected time range
    const filtered = [...logs]
      .filter((log) => new Date(log.date) >= dateRanges[timeRange])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (filtered.length === 0) {
      return {
        sortedLogs: [],
        chartData: null,
        statistics: {
          weightChange: 0,
          averageWeight: 0,
          minWeight: 0,
          maxWeight: 0,
        },
      };
    }

    // Calculate statistics
    const firstWeight = filtered[0].weight;
    const lastWeight = filtered[filtered.length - 1].weight;
    const weights = filtered.map((log) => log.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const averageWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
    const weightChange = ((lastWeight - firstWeight) / firstWeight) * 100;

    // Format dates and prepare chart data
    const chartData = {
      labels: filtered.map((log) => {
        const date = new Date(log.date);
        return timeRange === "1W"
          ? date.toLocaleDateString("es-ES", { weekday: "short" })
          : date.toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
            });
      }),
      datasets: [
        {
          data: filtered.map((log) => log.weight),
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };

    return {
      sortedLogs: filtered,
      chartData,
      statistics: {
        weightChange,
        averageWeight,
        minWeight,
        maxWeight,
      },
    };
  }, [logs, timeRange, dateRanges]);

  if (loading) {
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Progreso de Peso</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </View>
    );
  }

  const TimeRangeSelector = () => (
    <View style={styles.timeRangeContainer}>
      {(["1W", "1M", "3M", "6M", "1Y", "ALL"] as TimeRange[]).map((range) => (
        <TouchableOpacity
          key={range}
          style={[
            styles.timeRangeButton,
            timeRange === range && styles.timeRangeButtonActive,
          ]}
          onPress={() => setTimeRange(range)}
        >
          <Text
            style={[
              styles.timeRangeText,
              timeRange === range && styles.timeRangeTextActive,
            ]}
          >
            {range}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const StatisticsView = () => (
    <View style={styles.statisticsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Promedio</Text>
        <Text style={styles.statValue}>
          {statistics.averageWeight.toFixed(1)} kg
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Mínimo</Text>
        <Text style={styles.statValue}>
          {statistics.minWeight.toFixed(1)} kg
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Máximo</Text>
        <Text style={styles.statValue}>
          {statistics.maxWeight.toFixed(1)} kg
        </Text>
      </View>
    </View>
  );

  if (!logs.length) {
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Progreso de Peso</Text>
        </View>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No hay registros de peso disponibles
          </Text>
        </View>
      </View>
    );
  }

  const lastWeight = sortedLogs[sortedLogs.length - 1]?.weight;

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Progreso de Peso</Text>
        <View style={styles.weightInfo}>
          <Text style={styles.currentWeight}>{lastWeight} kg</Text>
          <View
            style={[
              styles.changeIndicator,
              ((s: any) => {
                const { color, ...rest } = s;
                return rest;
              })(
                statistics.weightChange > 0
                  ? styles.weightGain
                  : styles.weightLoss
              ),
            ]}
          >
            <Ionicons
              name={statistics.weightChange > 0 ? "arrow-up" : "arrow-down"}
              size={16}
              color={statistics.weightChange > 0 ? "#E53935" : "#4CAF50"}
            />
            <Text
              style={[
                styles.changeText,
                statistics.weightChange > 0
                  ? styles.weightGainText
                  : styles.weightLossText,
              ]}
            >
              {Math.abs(statistics.weightChange).toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>

      <TimeRangeSelector />

      {chartData && (
        <>
          <LineChart
            data={chartData}
            width={Math.min(width - 32, 400)}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#4CAF50",
              },
              propsForLabels: {
                fontSize: 11,
                fontFamily: "Poppins_400Regular",
              },
              formatYLabel: (value) => `${parseFloat(value).toFixed(1)}`,
            }}
            style={styles.chart}
            bezier
            withDots
            withVerticalLines={false}
            segments={5}
            onDataPointClick={({ value, index }) => {
              setSelectedPoint(sortedLogs[index]);
            }}
          />

          <StatisticsView />
        </>
      )}

      {selectedPoint && (
        <Animated.View style={styles.tooltipContainer}>
          <Text style={styles.tooltipDate}>
            {new Date(selectedPoint.date).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text style={styles.tooltipWeight}>{selectedPoint.weight} kg</Text>
        </Animated.View>
      )}
    </View>
  );
}
