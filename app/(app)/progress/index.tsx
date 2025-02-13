import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProgressImages } from "../../../hooks/useApi";

const { width } = Dimensions.get("window");

export default function ProgressScreen() {
  const { data: images, loading, error, refresh } = useProgressImages();
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<"front" | "side" | "back">(
    "front"
  );

  // Filter images by selected type and sort them by date (oldest first)
  const filteredImages = images
    ? images.filter(
        (img: any) => img.type.toLowerCase() === selectedType.toLowerCase()
      )
    : [];
  const sortedImages = [...filteredImages].sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // For the compare section, get the earliest and latest images (if available)
  const compareLeft = sortedImages.length > 0 ? sortedImages[0] : null;
  const compareRight =
    sortedImages.length > 1 ? sortedImages[sortedImages.length - 1] : null;

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const closePhotoModal = () => {
    setModalVisible(false);
    setSelectedPhoto(null);
  };

  // Render a single timeline photo card
  const renderPhotoCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => openPhotoModal(item)}
      style={styles.photoCardContainer}
      accessible={true}
      accessibilityLabel={`Ver detalles de la foto tomada el ${new Date(
        item.date
      ).toLocaleDateString()}`}
    >
      <View style={styles.photoCard}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.photo}
          resizeMode="cover"
        />
        <View style={styles.photoInfo}>
          <Text style={styles.photoDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text style={styles.photoType}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
          {item.notes && <Text style={styles.photoNotes}>{item.notes}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && (!images || images.length === 0)) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text
          style={styles.errorText}
          accessible={true}
          accessibilityLabel={`Error: ${error.message}`}
        >
          Error: {error.message}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={refresh}
          accessible={true}
          accessibilityLabel="Reintentar"
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Action Buttons */}
      <View style={styles.actionButtonGroup}>
        <Link href="/progress/capture" asChild>
          <TouchableOpacity
            style={styles.actionButton}
            accessible={true}
            accessibilityLabel="Tomar nueva foto"
          >
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.actionButtonText}>Nueva Foto</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/progress/measurements" asChild>
          <TouchableOpacity
            style={styles.actionButton}
            accessible={true}
            accessibilityLabel="Ver medidas"
          >
            <Ionicons name="resize" size={24} color="white" />
            <Text style={styles.actionButtonText}>Medidas</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Segmented Control */}
      <View style={styles.segmentContainer}>
        {(["front", "side", "back"] as const).map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            style={[
              styles.segmentButton,
              selectedType === type && styles.segmentButtonActive,
            ]}
            accessible={true}
            accessibilityLabel={`Mostrar fotos ${type}`}
          >
            <Text
              style={[
                styles.segmentButtonText,
                selectedType === type && styles.segmentButtonTextActive,
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Compare Section */}
      {compareLeft && compareRight && (
        <View style={styles.compareContainer}>
          <View style={styles.compareItem}>
            <View style={styles.compareLabelContainer}>
              <Text style={styles.compareLabel}>Antiguo</Text>
            </View>
            <TouchableOpacity
              onPress={() => openPhotoModal(compareLeft)}
              style={styles.compareImageContainer}
            >
              <Image
                source={{ uri: compareLeft.imageUrl }}
                style={styles.compareImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.compareDivider} />
          <View style={styles.compareItem}>
            <View style={styles.compareLabelContainer}>
              <Text style={styles.compareLabel}>Reciente</Text>
            </View>
            <TouchableOpacity
              onPress={() => openPhotoModal(compareRight)}
              style={styles.compareImageContainer}
            >
              <Image
                source={{ uri: compareRight.imageUrl }}
                style={styles.compareImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Timeline / List of Images */}
      {sortedImages && sortedImages.length > 0 ? (
        <FlatList
          data={sortedImages}
          keyExtractor={(item) => item._id}
          renderItem={renderPhotoCard}
          contentContainerStyle={{ paddingBottom: 16 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No hay fotos de progreso para la vista {selectedType}.{"\n"}¡Toma tu
            primera foto!
          </Text>
          <Link href="/progress/capture" asChild>
            <TouchableOpacity
              style={styles.emptyStateButton}
              accessible={true}
              accessibilityLabel="Tomar nueva foto"
            >
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.emptyStateButtonText}>Nueva Foto</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {/* Photo Detail Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closePhotoModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPhoto && (
              <>
                <Image
                  source={{ uri: selectedPhoto.imageUrl }}
                  style={styles.modalPhoto}
                  resizeMode="contain"
                />
                <View style={styles.modalPhotoInfo}>
                  <Text style={styles.photoDate}>
                    {new Date(selectedPhoto.date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.photoType}>
                    {selectedPhoto.type.charAt(0).toUpperCase() +
                      selectedPhoto.type.slice(1)}
                  </Text>
                  {selectedPhoto.notes && (
                    <Text style={styles.photoNotes}>{selectedPhoto.notes}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closePhotoModal}
                  accessible={true}
                  accessibilityLabel="Cerrar"
                >
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  /* General */
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Action Buttons */
  actionButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#2E7D32", // Darker green for better contrast
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    color: "white",
    marginTop: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  /* Empty State & Retry */
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 80, // extra bottom space in case of bottom tabs
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  // Separate style for the empty-state button
  emptyStateButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#2E7D32",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyStateButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  retryButton: {
    padding: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
  },

  /* Segmented Control */
  segmentContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  segmentButtonActive: {
    backgroundColor: "#4CAF50",
  },
  segmentButtonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#4CAF50",
  },
  segmentButtonTextActive: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
  },

  /* Compare Section */
  compareContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  compareItem: {
    flex: 1,
    alignItems: "center",
  },
  compareImageContainer: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  compareImage: {
    width: "100%",
    height: 150,
  },
  compareDivider: {
    width: 2,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
  compareLabelContainer: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  compareLabel: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },

  /* Timeline / Photo Card */
  photoCardContainer: {
    marginBottom: 16,
  },
  photoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    width: width - 32,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photo: {
    width: "100%",
    height: 300,
  },
  photoInfo: {
    padding: 12,
  },
  photoDate: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginBottom: 4,
  },
  photoType: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#4CAF50",
    marginBottom: 8,
  },
  photoNotes: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginTop: 4,
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  modalPhoto: {
    width: "100%",
    height: 300,
  },
  modalPhotoInfo: {
    paddingVertical: 12,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 8,
  },

  /* Error & Loading */
  errorText: {
    fontFamily: "Poppins_400Regular",
    color: "#f44336",
    fontSize: 16,
    textAlign: "center",
  },
});
