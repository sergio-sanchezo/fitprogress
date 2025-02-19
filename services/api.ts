import { getHeaders, handleResponse } from "@/utils";
import {
  Exercise,
  ExerciseInProgress,
  ICreateExercise,
  ICreateWorkout,
  Measurements,
  MonthlyComparison,
  WeeklyStats,
  WeightLog,
  Workout,
} from "../types";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

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

  create: async (workout: ICreateWorkout) => {
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

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },

  getSuggestedUpcoming: async () => {
    const response = await fetch(`${API_URL}/workouts/suggest`, {
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },

  getInstancesByTemplateId: async (id: string) => {
    const response = await fetch(`${API_URL}/workouts/instances/${id}`, {
      headers: await getHeaders(),
    });

    return handleResponse(response);
  },

  getInstanceById: async (id: string) => {
    const response = await fetch(`${API_URL}/workouts/get-instance/${id}`, {
      headers: await getHeaders(),
    });

    return handleResponse(response);
  },

  // Complete a workout instance
  completeInstance: async (
    id: string,
    completionData: {
      exercises: ExerciseInProgress[];
      completedAt: string;
      notes?: string;
    }
  ) => {
    const data = JSON.stringify(completionData);

    const response = await fetch(
      `${API_URL}/workouts/instances/${id}/complete`,
      {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify(completionData),
      }
    );
    return handleResponse(response);
  },

  getCurrentWeek: async () => {
    const response = await fetch(`${API_URL}/workouts/current-week`, {
      headers: await getHeaders(),
    });
    return handleResponse(response);
  },

  getWorkoutDetail: async (id: string, signal?: AbortSignal) => {
    const response = await fetch(`${API_URL}/workouts/detail/${id}`, {
      headers: await getHeaders(),
      signal, // Pass the abort signal here
    });
    return handleResponse(response);
  },

  createInstance: async (data: { templateId: string }) => {
    const response = await fetch(`${API_URL}/workouts/instance`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  createCustomExercise: async (data: ICreateExercise) => {
    const response = await fetch(`${API_URL}/workouts/custom-exercise`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(data),
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

export const statsAPi = {
  getWeeklyStats: async (): Promise<WeeklyStats> => {
    const response = await fetch(`${API_URL}/stats/weekly`, {
      headers: await getHeaders(),
    });

    return handleResponse(response);
  },

  getMonthlyComparison: async (): Promise<MonthlyComparison> => {
    const response = await fetch(`${API_URL}/stats/monthly`, {
      headers: await getHeaders(),
    });

    return handleResponse(response);
  },
};
