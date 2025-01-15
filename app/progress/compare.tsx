import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ProgressImage } from "../../types";
import { styles } from "../../styles";

export default function CompareScreen() {
  const router = useRouter();
  const { images } = useLocalSearchParams();
  const [selectedImages] = useState<ProgressImage[]>(
    images ? JSON.parse(images as string) : []
  );

  return (
    <View style={styles.container}>
      <View style={styles.compareContainer}>
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: image.imageUrl }}
              style={styles.compareImage}
              resizeMode="cover"
            />
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {new Date(image.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="white" />
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
