import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 임시 하드코딩: 계정 시스템이 없어서 현재 사용 중인 로드맵 ID
const CURRENT_ROADMAP_ID = '1';

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

interface FeedbacksResponse {
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
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 로드맵 데이터 조회
        const roadmapUrl = `${BASE_URL}/api/roadmaps/${CURRENT_ROADMAP_ID}`;
        const roadmapResponse = await fetch(roadmapUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (roadmapResponse.ok) {
          const roadmapData = await roadmapResponse.json();
          console.log('로드맵 데이터:', roadmapData);
          setRoadmapData(roadmapData);
        }

        // 전체 피드백 조회
        const feedbacksUrl = `${BASE_URL}/api/roadmaps/${CURRENT_ROADMAP_ID}/feedbacks`;
        console.log('피드백 조회 URL:', feedbacksUrl);

        const feedbacksResponse = await fetch(feedbacksUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('응답 상태:', feedbacksResponse.status);

        if (!feedbacksResponse.ok) {
          throw new Error(`피드백을 불러올 수 없습니다. (${feedbacksResponse.status})`);
        }

        const feedbacksData: FeedbacksResponse = await feedbacksResponse.json();
        console.log('피드백 데이터:', feedbacksData);
        setFeedbacks(feedbacksData.feedbacks);
      } catch (error) {
        console.error('데이터 조회 오류:', error);
        setError(error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFeedbackClick = (week: number, day: number) => {
    navigate(`/feedback/${week}?day=${day}`);
  };

  // 통계 계산
  const totalFeedbacks = feedbacks.length;
  const completionRate = roadmapData 
    ? Math.round((roadmapData.completedSessions / roadmapData.totalSessions) * 100)
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
            <S.Title>주차별 피드백</S.Title>
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
          <S.Title>주차별 피드백</S.Title>

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
            {error ? (
              <S.EmptyState>
                <S.EmptyIcon>error_outline</S.EmptyIcon>
                <S.EmptyText>{error}</S.EmptyText>
              </S.EmptyState>
            ) : feedbacks.length > 0 ? (
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
                      <S.WeekBadge>{feedback.week}주차 {feedback.day}일차</S.WeekBadge>
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
                  학습을 완료하면 피드백을 받을 수 있습니다.
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
