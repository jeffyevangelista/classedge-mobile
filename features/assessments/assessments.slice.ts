import { Attempt } from "@/features/attempts/attempts.types";
import { StateCreator } from "zustand";

type AssessmentState = {
  attempt: Attempt | null;
  timerSeconds: number;
};

type AssessmentAction = {
  setAttempt: (a: any | null) => void;
  setTimerSeconds: (s: number) => void;
};

export type AssessmentSlice = AssessmentState & AssessmentAction;

const initialState: AssessmentState = {
  attempt: null,
  timerSeconds: 0,
};

const createAssessmentSlice: StateCreator<AssessmentSlice> = (set) => ({
  ...initialState,
  setAttempt: (attempt) => set({ attempt }),
  setTimerSeconds: (timerSeconds) => set({ timerSeconds }),
});

export default createAssessmentSlice;
