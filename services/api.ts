// services/api.ts
import { getIdToken } from "./firebase";
import { Exercise, Workout, Measurements, WeightLog } from "../types";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

const getHeaders = async () => {
  const token = await getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
};

// Exercise API
export const exerciseApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/exercises`, {
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (exercise: Omit<Exercise, "id">) => {
    const response = await fetch(`${API_URL}/exercises`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(exercise),
    });
    return handleResponse(response);
  },

  update: async (id: string, exercise: Partial<Exercise>) => {
    const response = await fetch(`${API_URL}/exercises/${id}`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(exercise),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/exercises/${id}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },
};

// Workout API
export const workoutApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/workouts`, {
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (workout: Omit<Workout, "id">) => {
    const response = await fetch(`${API_URL}/workouts`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(workout),
    });
    return handleResponse(response);
  },

  update: async (id: string, workout: Partial<Workout>) => {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(workout),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },
};

// Measurements API
export const measurementApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/measurements`, {
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (measurements: Measurements) => {
    const response = await fetch(`${API_URL}/measurements`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(measurements),
    });
    return handleResponse(response);
  },

  update: async (id: string, measurements: Partial<Measurements>) => {
    const response = await fetch(`${API_URL}/measurements/${id}`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(measurements),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/measurements/${id}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },
};

// Weight Log API
export const weightLogApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/weight-logs`, {
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (weightLog: WeightLog) => {
    const response = await fetch(`${API_URL}/weight-logs`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(weightLog),
    });
    return handleResponse(response);
  },

  update: async (id: string, weightLog: Partial<WeightLog>) => {
    const response = await fetch(`${API_URL}/weight-logs/${id}`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(weightLog),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/weight-logs/${id}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },
};
