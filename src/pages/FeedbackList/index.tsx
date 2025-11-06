import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import { useRoadmapStore } from '../../store/roadmapStore';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FeedbackItem {
  id: number;
  week: number;
  day: number;
  summary: string;
  completionRate: number;
  reviewSuggestions: string[];
  tomorrowPreview: string;
  createdAt: string;
}

interface FeedbackListData {
  feedbacks: FeedbackItem[];
}

interface RoadmapData {
  currentWeek: number;
  currentDay: number;
  totalWeeks: number;
  completedSessions: number;
  totalSessions: number;
}

const FeedbackList = () => {
  const navigate = useNavigate();
  const { roadmapId } = useRoadmapStore();
  const hasAlerted = useRef(false);
  
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로드맵이 없으면 알럿 띄우고 생성 페이지로 이동 (한 번만)
    if (!roadmapId && !hasAlerted.current) {
      hasAlerted.current = true;
      alert('로드맵을 생성하세요');
      navigate('/');
      return;
    }

    if (roadmapId) {
      fetchData();
    }
  }, [roadmapId]);

  const fetchData = async () => {
    if (!roadmapId) return;

    try {
      setIsLoading(true);

      // 로드맵 진행 상황 조회
      const roadmapResponse = await fetch(`${BASE_URL}/api/roadmaps/${roadmapId}`);
      if (roadmapResponse.ok) {
        const roadmapData = await roadmapResponse.json();
        setRoadmapData(roadmapData);
      }

      // 전체 피드백 조회
      const feedbackResponse = await fetch(`${BASE_URL}/api/roadmaps/${roadmapId}/feedbacks`);
      if (feedbackResponse.ok) {
        const feedbackData: FeedbackListData = await feedbackResponse.json();
        setFeedbacks(feedbackData.feedbacks || []);
      }
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackClick = (week: number, day: number) => {
    navigate(`/feedback/${week}/${day}`);
  };

  // 통계 계산
  const totalFeedbacks = feedbacks.length;
  
  // 진행률 계산: (완료한 주차 * 7 + 완료한 일차) / (전체 주차 * 7) * 100
  const completionRate = roadmapData 
    ? Math.round((((roadmapData.currentWeek - 1) * 7 + roadmapData.currentDay) / (roadmapData.totalWeeks * 7)) * 100)
    : 0;
    
  const remainingWeeks = roadmapData 
    ? roadmapData.totalWeeks - roadmapData.currentWeek + 1
    : 0;

  if (isLoading) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Content>
            <S.Title>일일 피드백</S.Title>
            <S.EmptyState>
              <S.EmptyText>로딩 중...</S.EmptyText>
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
          <S.Title>일일 피드백</S.Title>

          {/* 통계 섹션 */}
          <S.StatsSection>
            <S.StatItem>
              <S.StatIcon>assignment_turned_in</S.StatIcon>
              <S.StatValue>{totalFeedbacks}</S.StatValue>
              <S.StatLabel>받은 피드백</S.StatLabel>
            </S.StatItem>
            <S.StatItem>
              <S.StatIcon>trending_up</S.StatIcon>
              <S.StatValue>{completionRate}%</S.StatValue>
              <S.StatLabel>전체 진행률</S.StatLabel>
            </S.StatItem>
            <S.StatItem>
              <S.StatIcon>calendar_today</S.StatIcon>
              <S.StatValue>{remainingWeeks}</S.StatValue>
              <S.StatLabel>남은 주차</S.StatLabel>
            </S.StatItem>
          </S.StatsSection>

          {/* 피드백 리스트 헤더 */}
          <S.SectionHeader>
            <S.SectionIcon>feedback</S.SectionIcon>
            <S.SectionTitle>전체 피드백</S.SectionTitle>
          </S.SectionHeader>

          {/* 피드백 카드 리스트 */}
          <S.FeedbackList>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <S.FeedbackCard
                  key={feedback.id}
                  onClick={() => handleFeedbackClick(feedback.week, feedback.day)}
                >
                  <S.CardLeft>
                    <S.CardIcon>
                      <S.CardIconSymbol>description</S.CardIconSymbol>
                    </S.CardIcon>
                    <S.CardContent>
                      <S.WeekBadge>Week {feedback.week} Day {feedback.day}</S.WeekBadge>
                      <S.Summary>{feedback.summary}</S.Summary>
                    </S.CardContent>
                  </S.CardLeft>
                  <S.CardRight>
                    <S.ArrowIcon className="arrow-icon">arrow_forward</S.ArrowIcon>
                  </S.CardRight>
                </S.FeedbackCard>
              ))
            ) : (
              <S.EmptyState>
                <S.EmptyIcon>sentiment_dissatisfied</S.EmptyIcon>
                <S.EmptyText>
                  아직 피드백이 없습니다.<br />
                  하루 학습을 완료하면 피드백을 받을 수 있습니다.
                </S.EmptyText>
              </S.EmptyState>
            )}
          </S.FeedbackList>
        </S.Content>
      </S.Container>
    </>
  );
};

export default FeedbackList;
