import { useEffect, useState } from 'react';
import { Header } from '../../components/common';
import * as S from './style';

interface Day {
  day: number;
  title: string;
}

interface Milestone {
  week: number;
  title: string;
  description?: string;
  days: Day[];
}

interface RoadmapData {
  roadmapId: string;
  totalWeeks: number;
  milestones: Milestone[];
}

const RoadmapList = () => {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());

  useEffect(() => {
    // 로컬 스토리지에서 roadmap_data 가져오기
    const storedData = localStorage.getItem('roadmap_data');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setRoadmapData(data);
      } catch (error) {
        console.error('로드맵 데이터 파싱 오류:', error);
      }
    }

    // 완료된 일차 정보 가져오기
    const storedCompleted = localStorage.getItem('completed_days');
    if (storedCompleted) {
      try {
        setCompletedDays(new Set(JSON.parse(storedCompleted)));
      } catch (error) {
        console.error('완료 데이터 파싱 오류:', error);
      }
    }
  }, []);

  const toggleDayComplete = (week: number, day: number) => {
    const key = `week${week}-day${day}`;
    const newCompleted = new Set(completedDays);
    
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    
    setCompletedDays(newCompleted);
    localStorage.setItem('completed_days', JSON.stringify([...newCompleted]));
  };

  const isDayCompleted = (week: number, day: number) => {
    return completedDays.has(`week${week}-day${day}`);
  };

  const getWeekProgress = (milestone: Milestone) => {
    const completedCount = milestone.days.filter(day => 
      isDayCompleted(milestone.week, day.day)
    ).length;
    return Math.round((completedCount / milestone.days.length) * 100);
  };

  if (!roadmapData || !roadmapData.milestones || roadmapData.milestones.length === 0) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Content>
            <S.EmptyState>
              <S.EmptyIcon>📚</S.EmptyIcon>
              <S.EmptyTitle>로드맵이 없습니다</S.EmptyTitle>
              <S.EmptyDescription>
                먼저 학습 목표와 기간을 설정하여 로드맵을 생성해주세요.
              </S.EmptyDescription>
            </S.EmptyState>
          </S.Content>
        </S.Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.HeaderSection>
            <S.Title>나의 학습 로드맵</S.Title>
            <S.SubTitle>{roadmapData.totalWeeks}주 완성 과정</S.SubTitle>
          </S.HeaderSection>

          <S.Timeline>
            {roadmapData.milestones.map((milestone, index) => {
              const progress = getWeekProgress(milestone);
              
              return (
                <S.MilestoneWrapper key={milestone.week}>
                  <S.TimelineLine isLast={index === roadmapData.milestones.length - 1} />
                  <S.TimelineDot />
                  
                  <S.MilestoneCard>
                    <S.WeekBadge>Week {milestone.week}</S.WeekBadge>
                    
                    <S.MilestoneHeader>
                      <S.MilestoneTitle>{milestone.title}</S.MilestoneTitle>
                      {milestone.description && (
                        <S.MilestoneDescription>{milestone.description}</S.MilestoneDescription>
                      )}
                    </S.MilestoneHeader>

                    <S.ProgressSection>
                      <S.ProgressLabel>
                        <span>학습 진행률</span>
                        <S.ProgressPercent>{progress}%</S.ProgressPercent>
                      </S.ProgressLabel>
                      <S.ProgressBar>
                        <S.ProgressFill progress={progress} />
                      </S.ProgressBar>
                    </S.ProgressSection>

                    <S.DaysList>
                      {milestone.days.map((day) => {
                        const isCompleted = isDayCompleted(milestone.week, day.day);
                        
                        return (
                          <S.DayItem
                            key={day.day}
                            completed={isCompleted}
                            onClick={() => toggleDayComplete(milestone.week, day.day)}
                          >
                            <S.DayCheckbox completed={isCompleted}>
                              {isCompleted && <S.CheckIcon>✓</S.CheckIcon>}
                            </S.DayCheckbox>
                            <S.DayContent>
                              <S.DayNumber>Day {day.day}</S.DayNumber>
                              <S.DayTitle completed={isCompleted}>{day.title}</S.DayTitle>
                            </S.DayContent>
                          </S.DayItem>
                        );
                      })}
                    </S.DaysList>
                  </S.MilestoneCard>
                </S.MilestoneWrapper>
              );
            })}
          </S.Timeline>
        </S.Content>
      </S.Container>
    </>
  );
};

export default RoadmapList;
