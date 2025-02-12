import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Exercise, Measurements, WeightLog, Workout } from "@/types";
import {
  exerciseApi,
  measurementApi,
  weightLogApi,
  workoutApi,
} from "@/services/api";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(fetchFn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const data = await fetchFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [fetchFn, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...deps]);

  const refresh = () => {
    fetchData();
  };

  return { ...state, refresh };
}

export function useExercises() {
  return useApi<Exercise[]>(exerciseApi.getAll);
}

export function useMeasurements() {
  return useApi<Measurements[]>(measurementApi.getAll);
}

export function useWorkouts() {
  return useApi<Workout[]>(workoutApi.getAll);
}

export function useWeightLogs() {
  return useApi<WeightLog[]>(weightLogApi.getAll);
}
