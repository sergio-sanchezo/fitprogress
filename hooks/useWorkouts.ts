import { workoutApi } from "../services/api";
import { Workout } from "../types";
import { useApi } from "./useApi";

export function useWorkouts() {
  return useApi<Workout[]>(workoutApi.getAll);
}

// hooks/useExercises.ts
import { exerciseApi } from "../services/api";
import { Exercise } from "../types";

export function useExercises() {
  return useApi<Exercise[]>(exerciseApi.getAll);
}

// hooks/useMeasurements.ts
import { measurementApi } from "../services/api";
import { Measurements } from "../types";

export function useMeasurements() {
  return useApi<Measurements[]>(measurementApi.getAll);
}
