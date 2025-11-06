import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/common';
import { useRoadmapStore } from '../../store/roadmapStore';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FeedbackData {
  day: number;
  summary: string;
  completionRate: number;
  tomorrowPreview: string;
  reviewSuggestions: string[];
}

const FeedbackDetail = () => {
  const navigate = useNavigate();
  const { week, day } = useParams<{ week: string; day: string }>();
  const { roadmapId } = useRoadmapStore();
  const hasAlerted = useRef(false);
  
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 로드맵이 없으면 알럿 띄우고 생성 페이지로 이동 (한 번만)
    if (!roadmapId && !hasAlerted.current) {
      hasAlerted.current = true;
      alert('로드맵을 생성하세요');
      navigate('/');
      return;
    }

    if (roadmapId && week && day) {
      fetchFeedback();
    }
  }, [roadmapId, week, day]);

  const fetchFeedback = async () => {
    if (!roadmapId || !week || !day) return;

    try {
      setIsLoading(true);
      setError(null);

      const url = `${BASE_URL}/api/roadmaps/${roadmapId}/weeks/${week}/days/${day}/feedback`;
      console.log('일일 피드백 조회 URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('응답 상태:', response.status);

      if (!response.ok) {
        throw new Error(`피드백을 불러올 수 없습니다. (${response.status})`);
      }

      const data = await response.json();
      console.log('피드백 데이터:', data);
      setFeedback(data);
    } catch (error) {
      console.error('피드백 조회 오류:', error);
      setError(error instanceof Error ? error.message : '피드백을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/feedback');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Content>
            <S.NotFound>
              피드백을 불러오는 중...
            </S.NotFound>
          </S.Content>
        </S.Container>
      </>
    );
  }

  if (error || !feedback) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Content>
            <S.BackButton onClick={handleBackClick}>
              <S.Icon>arrow_back</S.Icon>
              목록으로 돌아가기
            </S.BackButton>
            <S.NotFound>
              {error || '피드백을 찾을 수 없습니다.'}
            </S.NotFound>
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
          <S.BackButton onClick={handleBackClick}>
            <S.Icon>arrow_back</S.Icon>
            목록으로 돌아가기
          </S.BackButton>

          <S.Header>
            <S.WeekBadge>Week {week} Day {feedback.day}</S.WeekBadge>
            <S.Title>오늘의 학습 요약</S.Title>
          </S.Header>

          <S.CompletionSection>
            <S.CompletionLabel>오늘 완료율</S.CompletionLabel>
            <S.CompletionRate>{feedback.completionRate}%</S.CompletionRate>
          </S.CompletionSection>

          <S.Section>
            <S.SectionTitle>
              <S.Icon>description</S.Icon>
              오늘 학습 내용
            </S.SectionTitle>
            <S.SummaryText>{feedback.summary}</S.SummaryText>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <S.Icon>lightbulb</S.Icon>
              복습 방법
            </S.SectionTitle>
            <S.ItemList>
              {feedback.reviewSuggestions.map((suggestion, index) => (
                <S.Item key={index} type="improvement">
                  {suggestion}
                </S.Item>
              ))}
            </S.ItemList>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <S.Icon>arrow_forward</S.Icon>
              내일 학습 미리보기
            </S.SectionTitle>
            <S.PreviewText>{feedback.tomorrowPreview}</S.PreviewText>
          </S.Section>
        </S.Content>
      </S.Container>
    </>
  );
};

export default FeedbackDetail;
