// app/(app)/progress/capture.tsx
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { styles } from "../../../styles";
import { progressApi } from "../../../services/api";
import { uploadImage } from "../../../services/storage";
import { useAuth } from "../../../contexts/AuthContext";

export default function CaptureScreen() {
  const [type, setType] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoType, setPhotoType] = useState<"front" | "side" | "back">(
    "front"
  );
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();
  const { user } = useAuth();
  const cameraRef = React.useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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

  const handleUpload = async (uri: string) => {
    try {
      setLoading(true);

      // Generate a unique path for the image
      const timestamp = Date.now();
      const path = `progress-photos/${user?.uid}/${timestamp}.jpg`;

      // Upload to Firebase Storage directly
      await uploadImage(uri, path, {
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
        onComplete: async (downloadUrl) => {
          // Save the reference in your backend
          await progressApi.saveImageReference(downloadUrl, photoType);
          Alert.alert("Éxito", "Foto guardada correctamente");
          router.back();
        },
        onError: (error) => {
          console.error("Upload error:", error);
          Alert.alert("Error", "No se pudo guardar la foto");
        },
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la foto");
      console.error(error);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.7, // Reduce quality for better performance
      });

      if (photo) {
        await handleUpload(photo.uri);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo capturar la foto");
    }
  };

  const pickImage = async () => {
    if (loading) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      await handleUpload(result.assets[0].uri);
    }
  };

  const toggleCameraType = () => {
    setType((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={type} ref={cameraRef}>
        <View style={styles.photoTypeSelector}>
          {(["front", "side", "back"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.photoTypeButton,
                photoType === t && styles.photoTypeButtonSelected,
              ]}
              onPress={() => setPhotoType(t)}
              disabled={loading}
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
          <TouchableOpacity
            style={styles.controlButton}
            onPress={pickImage}
            disabled={loading}
          >
            <Ionicons name="images" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.uploadProgress}>
                <ActivityIndicator color="white" size="large" />
                <Text style={styles.uploadProgressText}>
                  {Math.round(uploadProgress)}%
                </Text>
              </View>
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleCameraType}
            disabled={loading}
          >
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
