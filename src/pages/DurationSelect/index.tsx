import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import { useSurveyStore } from '../../store/surveyStore';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type DurationType = '8' | '12' | '16' | 'auto';

interface DurationOption {
  value: DurationType;
  label: string;
  description: string;
}

const DURATION_OPTIONS: DurationOption[] = [
  {
    value: 'auto',
    label: 'AI 추천',
    description: 'AI가 당신의 수준에 맞는 최적의 학습 기간을 설정합니다',
  },
  {
    value: '8',
    label: '8주',
    description: '빠르게 집중해서 학습하고 싶은 분께 추천',
  },
  {
    value: '12',
    label: '12주',
    description: '안정적인 속도로 부족함 없이 학습하고 싶은 분께 추천',
  },
  {
    value: '16',
    label: '16주',
    description: '여유롭게 천천히 학습하고 싶은 분께 추천',
  },
];

const DurationSelect = () => {
  const navigate = useNavigate();
  const surveyId = useSurveyStore((state) => state.surveyId);
  const clearSurveyId = useSurveyStore((state) => state.clearSurveyId);
  const [selectedDuration, setSelectedDuration] = useState<DurationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDurationSelect = (duration: DurationType) => {
    setSelectedDuration(duration);
  };

  const handleSubmit = async () => {
    if (!selectedDuration) {
      alert('학습 기간을 선택해주세요.');
      return;
    }

    if (!surveyId) {
      alert('설문 정보가 없습니다. 처음부터 다시 시작해주세요.');
      navigate('/');
      return;
    }

    setIsLoading(true);
    try {
      const url = `${BASE_URL}/api/roadmaps`;
      console.log('로드맵 생성 요청:', { surveyId, duration: selectedDuration });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId: String(surveyId),
          duration: selectedDuration,
        }),
      });

      if (!response.ok) {
        throw new Error(`로드맵 생성에 실패했습니다. (${response.status})`);
      }

      const data = await response.json();
      console.log('로드맵 생성 성공:', data);

      // 사용된 surveyId 제거
      clearSurveyId();

      // 로드맵 상세 페이지로 이동
      if (data.roadmapId) {
        navigate(`/roadmap/${data.roadmapId}`);
      } else {
        navigate('/roadmap');
      }
    } catch (error) {
      console.error('로드맵 생성 오류:', error);
      alert('로드맵 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.PageTitle>학습 기간 설정</S.PageTitle>
          <S.PageDescription>
            목표 달성을 위한 학습 기간을 선택해주세요.
            <br />
            인텐시브 나중에 변경할 수 있습니다.
          </S.PageDescription>

          <S.OptionsContainer>
            {DURATION_OPTIONS.map((option) => (
              <S.OptionCard
                key={option.value}
                selected={selectedDuration === option.value}
                onClick={() => handleDurationSelect(option.value)}
              >
                <S.RadioCircle selected={selectedDuration === option.value} />
                <S.OptionContent>
                  <S.OptionLabel>{option.label}</S.OptionLabel>
                  <S.OptionDescription>{option.description}</S.OptionDescription>
                </S.OptionContent>
              </S.OptionCard>
            ))}
          </S.OptionsContainer>

          <S.ButtonSection>
            <S.BackButton onClick={() => navigate(-1)}>
              돌아가기
            </S.BackButton>
            <S.SubmitButton
              onClick={handleSubmit}
              disabled={!selectedDuration || isLoading}
            >
              {isLoading ? '생성 중...' : '로드맵 생성하기'}
            </S.SubmitButton>
          </S.ButtonSection>
        </S.Content>
      </S.Container>
    </>
  );
};

export default DurationSelect;
