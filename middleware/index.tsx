import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

// List of routes that require authentication
const PROTECTED_SEGMENTS = [
  "(app)", // Main app routes
  "workouts", // Workout routes
  "progress", // Progress routes
  "stats", // Stats routes
  "chat", // Chat routes
];

// List of auth routes (routes that should redirect to main app if user is authenticated)
const AUTH_SEGMENTS = ["auth"];

function useProtectedRoute() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = (segments[0] as string) === "auth";
    const inProtectedGroup = PROTECTED_SEGMENTS.includes(segments[0]);

    if (!user && inProtectedGroup) {
      // Redirect to auth if trying to access protected route while not authenticated
      router.replace("/auth" as any);
    } else if (user && inAuthGroup) {
      // Redirect to home if trying to access auth route while authenticated
      router.replace("/");
    }
  }, [user, loading, segments]);
}

export function AuthMiddleware({ children }: { children: React.ReactNode }) {
  useProtectedRoute();
  return <>{children}</>;
}
