import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { styles } from "../../../styles";

export default function CaptureScreen() {
  const [type, setType] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoType, setPhotoType] = useState<"front" | "side" | "back">(
    "front"
  );
  const router = useRouter();
  const cameraRef = React.useRef<CameraView>(null);

  if (!permission) {
    // Los permisos de la cámara aún se están cargando
    return <View />;
  }

  if (!permission.granted) {
    // Los permisos de la cámara no están concedidos aún
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Necesitamos acceso a la cámara para tomar fotos de progreso
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Dar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: false,
        exif: true,
      });

      if (photo) {
        // Aquí iría la lógica para guardar la foto
        Alert.alert("Éxito", "Foto capturada correctamente");
        router.back();
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo capturar la foto");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      // Aquí iría la lógica para guardar la foto seleccionada
      Alert.alert("Éxito", "Foto seleccionada correctamente");
      router.back();
    }
  };

  const toggleCameraType = () => {
    setType((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={type}>
        <View style={styles.photoTypeSelector}>
          {(["front", "side", "back"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.photoTypeButton,
                photoType === t && styles.photoTypeButtonSelected,
              ]}
              onPress={() => setPhotoType(t)}
            >
              <Text
                style={[
                  styles.photoTypeText,
                  photoType === t && styles.photoTypeTextSelected,
                ]}
              >
                {t === "front"
                  ? "Frente"
                  : t === "side"
                  ? "Lateral"
                  : "Espalda"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
            <Ionicons name="images" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleCameraType}
          >
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
