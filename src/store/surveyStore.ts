import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SurveyStore {
  surveyId: string | null;
  setSurveyId: (id: string) => void;
  clearSurveyId: () => void;
}

export const useSurveyStore = create<SurveyStore>()(
  persist(
    (set) => ({
      surveyId: null,
      setSurveyId: (id) => set({ surveyId: id }),
      clearSurveyId: () => set({ surveyId: null }),
    }),
    {
      name: 'survey-storage',
    }
  )
);
