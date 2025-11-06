import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface DurationOption {
  value: string;
  label: string;
  description: string;
}

const DURATION_OPTIONS: DurationOption[] = [
  {
    value: 'auto',
    label: '자동 설정',
    description: 'AI가 당신의 수준에 맞는 최적의 학습 기간을 설정합니다',
  },
  {
    value: '12',
    label: '12주 (3개월)',
    description: '빠르게 집중해서 학습하고 싶은 분께 추천',
  },
  {
    value: '24',
    label: '24주 (6개월)',
    description: '안정적인 속도로 꾸준히 학습하고 싶은 분께 추천',
  },
  {
    value: '36',
    label: '36주 (9개월)',
    description: '여유롭게 천천히 학습하고 싶은 분께 추천',
  },
];

const RoadmapDuration = () => {
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState<string>('auto');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // 로컬 스토리지에서 surveyId 가져오기
    const surveyId = localStorage.getItem('survey_id');
    
    if (!surveyId) {
      alert('설문 정보가 없습니다. 처음부터 다시 시작해주세요.');
      navigate('/');
      return;
    }

    setIsLoading(true);
    try {
      const url = `${BASE_URL}/api/roadmaps`;
      console.log('로드맵 생성 요청 URL:', url);
      console.log('요청 데이터:', { surveyId, duration: selectedDuration });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId,
          duration: selectedDuration,
        }),
      });

      console.log('응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('에러 응답:', errorText);
        throw new Error(`로드맵 생성에 실패했습니다. (${response.status})`);
      }

      const data = await response.json();
      console.log('로드맵 생성 성공:', data);

      // roadmapId를 로컬 스토리지에 저장
      if (data.roadmapId) {
        localStorage.setItem('roadmap_id', data.roadmapId);
        console.log('로컬 스토리지에 roadmap_id 저장:', data.roadmapId);
      }

      // 로드맵 목록 페이지로 이동
      navigate('/roadmap');
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
          <S.Description>
            목표 달성을 위한 학습 기간을 선택해주세요.
            <br />
            언제든지 나중에 변경할 수 있습니다.
          </S.Description>

          <S.OptionsContainer>
            {DURATION_OPTIONS.map((option) => (
              <S.OptionCard
                key={option.value}
                selected={selectedDuration === option.value}
                onClick={() => setSelectedDuration(option.value)}
              >
                <S.OptionHeader>
                  <S.RadioButton selected={selectedDuration === option.value}>
                    <S.RadioInner selected={selectedDuration === option.value} />
                  </S.RadioButton>
                  <S.OptionLabel>{option.label}</S.OptionLabel>
                </S.OptionHeader>
                <S.OptionDescription>{option.description}</S.OptionDescription>
              </S.OptionCard>
            ))}
          </S.OptionsContainer>

          <S.ButtonContainer>
            <S.BackButton onClick={() => navigate(-1)} disabled={isLoading}>
              돌아가기
            </S.BackButton>
            <S.SubmitButton onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? '로드맵 생성 중...' : '로드맵 생성하기'}
            </S.SubmitButton>
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </>
  );
};

export default RoadmapDuration;

