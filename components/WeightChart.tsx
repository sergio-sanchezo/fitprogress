import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { WeightLog } from "../types";
import { styles } from "../styles";

interface WeightChartProps {
  logs: WeightLog[];
}

export function WeightChart({ logs }: WeightChartProps) {
  const { width } = useWindowDimensions(); // Obtiene el ancho actual de la ventana

  const data = {
    labels: logs.map((log) => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        data: logs.map((log) => log.weight),
      },
    ],
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Progreso de Peso</Text>
      <LineChart
        data={data}
        width={Math.min(width - 40, 400)} // Limita el ancho máximo para pantallas grandes
        height={250}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: { fontSize: 12 },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}
