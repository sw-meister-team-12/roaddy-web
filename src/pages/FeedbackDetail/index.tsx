import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/common';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 임시 하드코딩: 계정 시스템이 없어서 현재 사용 중인 로드맵 ID
const CURRENT_ROADMAP_ID = '1';

interface FeedbackData {
  week: number;
  summary: string;
  completionRate: number;
  strengths: string[];
  improvements: string[];
}

const FeedbackDetail = () => {
  const navigate = useNavigate();
  const { week } = useParams<{ week: string }>();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!week) return;

      try {
        setIsLoading(true);
        setError(null);

        const url = `${BASE_URL}/api/roadmaps/${CURRENT_ROADMAP_ID}/weeks/${week}/feedback`;
        console.log('피드백 조회 URL:', url);

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

    fetchFeedback();
  }, [week]);

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
            <S.WeekBadge>{feedback.week}주차</S.WeekBadge>
            <S.Title>{feedback.summary}</S.Title>
          </S.Header>

          <S.CompletionSection>
            <S.CompletionLabel>주차 완료율</S.CompletionLabel>
            <S.CompletionRate>{feedback.completionRate}%</S.CompletionRate>
          </S.CompletionSection>

          <S.Section>
            <S.SectionTitle>
              <S.Icon>thumb_up</S.Icon>
              잘한 점
            </S.SectionTitle>
            <S.ItemList>
              {feedback.strengths.map((strength, index) => (
                <S.Item key={index} type="strength">
                  {strength}
                </S.Item>
              ))}
            </S.ItemList>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <S.Icon>lightbulb</S.Icon>
              개선하면 좋은 점
            </S.SectionTitle>
            <S.ItemList>
              {feedback.improvements.map((improvement, index) => (
                <S.Item key={index} type="improvement">
                  {improvement}
                </S.Item>
              ))}
            </S.ItemList>
          </S.Section>
        </S.Content>
      </S.Container>
    </>
  );
};

export default FeedbackDetail;
