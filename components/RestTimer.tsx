import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";

interface RestTimerProps {
  duration: number;
  onComplete: () => void;
  onCancel: () => void;
}

export function RestTimer({ duration, onComplete, onCancel }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <Modal transparent animationType="fade">
      <View style={styles.timerModalOverlay}>
        <View style={styles.timerModal}>
          <Text style={styles.timerTitle}>Descanso</Text>
          <Text style={styles.timerCount}>{timeLeft}s</Text>
          <TouchableOpacity style={styles.timerCancelButton} onPress={onCancel}>
            <Text style={styles.timerCancelText}>Saltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
