import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 임시 하드코딩: 계정 시스템이 없어서 현재 사용 중인 로드맵 ID
const CURRENT_ROADMAP_ID = '1';

// 임시 하드코딩: 피드백이 있는 주차 목록 (전체 조회 API가 없으므로)
// 실제 summary는 디테일 페이지에서 API를 통해 가져옴
const AVAILABLE_FEEDBACK_WEEKS = [
  { week: 1, summary: '기초 개념 학습 완료' },
  { week: 2, summary: '중급 과정 진행 중' },
  { week: 3, summary: '심화 프로젝트 착수' }
];

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setIsLoading(true);
        const url = `${BASE_URL}/api/roadmaps/${CURRENT_ROADMAP_ID}`;
        console.log('로드맵 조회 URL:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('응답 상태:', response.status);

        if (!response.ok) {
          throw new Error(`로드맵 정보를 불러올 수 없습니다. (${response.status})`);
        }

        const data = await response.json();
        console.log('로드맵 데이터:', data);
        setRoadmapData(data);
      } catch (error) {
        console.error('로드맵 조회 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmapData();
  }, []);

  const handleFeedbackClick = (week: number) => {
    navigate(`/feedback/${week}`);
  };

  // 통계 계산
  const totalFeedbacks = roadmapData ? roadmapData.currentWeek - 1 : 0; // 현재 주차는 진행 중이므로 -1
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
            {AVAILABLE_FEEDBACK_WEEKS.length > 0 ? (
              AVAILABLE_FEEDBACK_WEEKS.map(({ week, summary }) => (
                <S.FeedbackCard
                  key={week}
                  onClick={() => handleFeedbackClick(week)}
                >
                  <S.CardLeft>
                    <S.CardIcon>
                      <S.CardIconSymbol>description</S.CardIconSymbol>
                    </S.CardIcon>
                    <S.CardContent>
                      <S.WeekBadge>{week}주차</S.WeekBadge>
                      <S.Summary>{summary}</S.Summary>
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
                  7일차를 완료하면 피드백을 받을 수 있습니다.
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
