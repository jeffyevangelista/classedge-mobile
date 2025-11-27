import createAssessmentSlice, {
  AssessmentSlice,
} from "@/features/assessments/assessments.slice";
import createAuthSlice, { AuthSlice } from "@/features/auth/auth.slice";
import { create } from "zustand";

type Store = AuthSlice & AssessmentSlice;

const useStore = create<Store>((...a) => ({
  ...createAuthSlice(...a),
  ...createAssessmentSlice(...a),
}));

export default useStore;
