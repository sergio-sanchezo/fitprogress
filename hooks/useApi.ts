import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Exercise,
  Measurements,
  MonthlyComparison,
  ProgressImage,
  WeeklyStats,
  WeightLog,
  Workout,
} from "@/types";
import {
  exerciseApi,
  measurementApi,
  progressApi,
  statsAPi,
  weightLogApi,
  workoutApi,
} from "@/services/api";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

interface UseApiOptions {
  initialFetch?: boolean;
  dependencies?: any[];
}

// Enhanced base hook with better error handling and refresh capability
interface UseApiOptions {
  initialFetch?: boolean;
  dependencies?: any[];
  hookName?: string;
}

export function useApi<T>(
  fetchFn: () => Promise<T>,
  options: UseApiOptions = { initialFetch: true, dependencies: [] }
): ApiState<T> {
  const [state, setState] = useState<Omit<ApiState<T>, "refresh">>({
    data: null,
    loading: true,
    error: null,
  });

  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await fetchFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const hook = options.hookName || fetchFn.name || "useApi";
      const err = error as Error;
      const errMsg = `Error in hook ${hook}: ${err.message}`;
      setState({ data: null, loading: false, error: new Error(errMsg) });
      console.error("Error in hook", hook, err);
      console.error(errMsg, error);
    }
  }, [fetchFn, user]);

  useEffect(() => {
    if (options.initialFetch) {
      fetchData();
    }
  }, [fetchData, ...(options.dependencies || [])]);

  return { ...state, refresh: fetchData };
}

export function useExercises() {
  return useApi<Exercise[]>(exerciseApi.getAll);
}

export function useMeasurements() {
  return useApi<Measurements[]>(measurementApi.getAll);
}

// Workouts
export function useWorkouts() {
  return useApi<Workout[]>(workoutApi.getAll);
}

export function useSuggestedWorkouts() {
  return useApi<Workout[]>(workoutApi.getSuggestedUpcoming);
}

export function useWeightLogs() {
  return useApi<WeightLog[]>(weightLogApi.getAll);
}

export function useProgressImages() {
  return useApi<ProgressImage[]>(progressApi.getAll);
}

export function useMonthlyComparison() {
  return useApi<MonthlyComparison>(statsAPi.getMonthlyComparison);
}

export function useWeeklyStats() {
  return useApi<WeeklyStats>(statsAPi.getWeeklyStats);
}

export function useWorkoutInstance(id: string) {
  return useApi<any>(() => workoutApi.getInstance(id), { dependencies: [id] });
}
