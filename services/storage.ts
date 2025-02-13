// services/storage.ts
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getHeaders, handleResponse } from "@/utils";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

interface UploadProgressCallback {
  onProgress?: (progress: number) => void;
  onComplete?: (url: string) => void;
  onError?: (error: Error) => void;
}

export const uploadImage = async (
  uri: string,
  path: string,
  callbacks?: UploadProgressCallback
) => {
  try {
    // Get the binary data from the image
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create storage reference
    const storage = getStorage();
    const storageRef = ref(storage, path);

    // Create upload task
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Listen for state changes
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        callbacks?.onProgress?.(progress);
      },
      (error) => {
        callbacks?.onError?.(error);
      },
      async () => {
        // Upload completed successfully
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        callbacks?.onComplete?.(downloadUrl);
      }
    );

    return uploadTask;
  } catch (error) {
    callbacks?.onError?.(error as Error);
    throw error;
  }
};

// services/api.ts - Add this to your existing API file
export const progressApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/progress`, {
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },

  saveImageReference: async (
    imageUrl: string,
    type: "front" | "side" | "back"
  ) => {
    const response = await fetch(`${API_URL}/progress`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({
        imageUrl,
        type,
      }),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/progress/${id}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to delete image");
    }
  },
};
