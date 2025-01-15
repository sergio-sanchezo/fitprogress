import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";

interface MetricProps {
  icon: string;
  value: string;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const Metric = ({ icon, value, label, trend }: MetricProps) => (
  <View style={styles.metricContainer}>
    <View style={styles.metricHeader}>
      <Ionicons name={icon as any} size={24} color="#4CAF50" />
      <View style={styles.metricContent}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
    </View>
    {trend && (
      <View
        style={[
          styles.trendContainer,
          { backgroundColor: trend.isPositive ? "#E8F5E9" : "#FFEBEE" },
        ]}
      >
        <Ionicons
          name={trend.isPositive ? "arrow-up" : "arrow-down"}
          size={16}
          color={trend.isPositive ? "#4CAF50" : "#E53935"}
        />
        <Text
          style={[
            styles.trendText,
            { color: trend.isPositive ? "#4CAF50" : "#E53935" },
          ]}
        >
          {Math.abs(trend.value)}%
        </Text>
      </View>
    )}
  </View>
);

export function ProgressMetrics() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Metric
          icon="scale"
          value="72.5 kg"
          label="Peso Actual"
          trend={{ value: -2.3, isPositive: true }}
        />
        <Metric
          icon="fitness"
          value="12"
          label="Entrenamientos"
          trend={{ value: 8.5, isPositive: true }}
        />
      </View>
      <View style={styles.row}>
        <Metric icon="barbell" value="2,450 kg" label="Peso Total" />
        <Metric icon="time" value="8h 30m" label="Tiempo Total" />
      </View>
      <View style={styles.separator} />
      <View style={styles.measurementsContainer}>
        <Text style={styles.measurementsTitle}>Últimas Medidas</Text>
        <View style={styles.measurementsGrid}>
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Pecho</Text>
            <Text style={styles.measurementValue}>98 cm</Text>
          </View>
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Cintura</Text>
            <Text style={styles.measurementValue}>82 cm</Text>
          </View>
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Brazos</Text>
            <Text style={styles.measurementValue}>36 cm</Text>
          </View>
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Piernas</Text>
            <Text style={styles.measurementValue}>58 cm</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
