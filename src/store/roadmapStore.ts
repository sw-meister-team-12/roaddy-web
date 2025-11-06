import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Day {
  day: number;
  title: string;
}

interface Week {
  week: number;
  title: string;
  description: string;
  days: Day[];
}

interface RoadmapData {
  roadmapId: string;
  title: string;
  weeks: Week[];
}

interface RoadmapStore {
  roadmapId: string | null;
  roadmapData: RoadmapData | null;
  currentWeek: number;
  currentDay: number;
  maxWeek: number;
  setRoadmap: (id: string, data: RoadmapData) => void;
  clearRoadmap: () => void;
  setCurrentWeek: (week: number) => void;
  setCurrentDay: (day: number) => void;
  incrementDay: () => void;
}

export const useRoadmapStore = create<RoadmapStore>()(
  persist(
    (set, get) => ({
      roadmapId: null,
      roadmapData: null,
      currentWeek: 1,
      currentDay: 1,
      maxWeek: 1,
      setRoadmap: (id, data) => {
        // weeks 또는 milestones 필드 확인
        const weeks = data.weeks || (data as any).milestones || [];
        const maxWeek = weeks.length > 0 
          ? Math.max(...weeks.map((w: Week) => w.week))
          : 1;
        
        // milestones를 weeks로 변환
        const normalizedData = {
          ...data,
          weeks: weeks
        };
        
        set({ 
          roadmapId: id, 
          roadmapData: normalizedData,
          currentWeek: 1,
          currentDay: 1,
          maxWeek
        });
      },
      clearRoadmap: () => set({ 
        roadmapId: null, 
        roadmapData: null,
        currentWeek: 1,
        currentDay: 1,
        maxWeek: 1
      }),
      setCurrentWeek: (week) => {
        const { maxWeek } = get();
        if (week >= 1 && week <= maxWeek) {
          set({ currentWeek: week });
        }
      },
      setCurrentDay: (day) => {
        if (day >= 1 && day <= 7) {
          set({ currentDay: day });
        }
      },
      incrementDay: () => {
        const { currentDay, currentWeek, maxWeek } = get();
        if (currentDay < 7) {
          set({ currentDay: currentDay + 1 });
        } else {
          // day가 7이면 1로 리셋하고 week 증가
          if (currentWeek < maxWeek) {
            set({ currentDay: 1, currentWeek: currentWeek + 1 });
          } else {
            // 마지막 주차의 마지막 날이면 그대로 유지
            set({ currentDay: 1 });
          }
        }
      },
    }),
    {
      name: 'roadmap-storage',
    }
  )
);
