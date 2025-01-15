import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { styles } from "../../styles";
import { ProgressImage } from "../../types";
import { Ionicons } from "@expo/vector-icons";

const sampleImages: ProgressImage[] = [
  {
    id: "1",
    imageUrl: "https://placeholder.com/400x600",
    date: new Date().toISOString(),
    type: "front",
    notes: "Primera foto de progreso",
  },
  // Más fotos de ejemplo...
];

export default function ProgressScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      {/* Botones de acción */}
      <View style={styles.actionButtonGroup}>
        <Link href="/progress/capture" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.actionButtonText}>Nueva Foto</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/progress/measurements" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="resize" size={24} color="white" />
            <Text style={styles.actionButtonText}>Medidas</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Galería de fotos */}
      <View style={styles.photoGrid}>
        {sampleImages.map((image) => (
          <View key={image.id} style={styles.photoCard}>
            <Image
              source={{ uri: image.imageUrl }}
              style={styles.photo}
              resizeMode="cover"
            />
            <View style={styles.photoInfo}>
              <Text style={styles.photoDate}>
                {new Date(image.date).toLocaleDateString()}
              </Text>
              <Text style={styles.photoType}>
                {image.type.charAt(0).toUpperCase() + image.type.slice(1)}
              </Text>
              {image.notes && (
                <Text style={styles.photoNotes}>{image.notes}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
