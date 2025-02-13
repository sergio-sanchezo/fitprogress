export interface Exercise {
  _id: string;
  name: string;
  muscleGroup: string;
  totalSets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface WorkoutSet {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface ExerciseInProgress extends Exercise {
  sets: WorkoutSet[];
}

export interface Workout {
  _id: string;
  name: string;
  exercises: Exercise[];
  date: string;
  duration: number;
  completed?: boolean;
}

export interface ProgressImage {
  _id: string;
  imageUrl: string;
  date: string;
  type: "front" | "s_ide" | "back";
  notes?: string;
}

export interface WeightLog {
  date: string;
  weight: number;
}

export interface Measurements {
  _id: string;
  date: string;
  chest: number;
  waist: number;
  hips: number;
  leftArm: number;
  rightArm: number;
  leftThigh: number;
  rightThigh: number;
  leftCalf: number;
  rightCalf: number;
}

export interface ChatMessage {
  _id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}
