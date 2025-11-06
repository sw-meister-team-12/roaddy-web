import { useState } from 'react';
import { Header } from '../../components/common';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RoadmapGenerate = () => {
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!goal.trim()) {
      alert('목표를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const url = `${BASE_URL}/api/goals`;
      console.log('요청 URL:', url);
      console.log('BASE_URL:', BASE_URL);
      console.log('요청 데이터:', { goal: goal.trim() });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: goal.trim() }),
      });

      console.log('응답 상태:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('에러 응답:', errorText);
        throw new Error(`로드맵 생성에 실패했습니다. (${response.status})`);
      }

      const data = await response.json();
      console.log('로드맵 생성 성공:', data);
      // TODO: 성공 후 페이지 이동이나 결과 표시
    } catch (error) {
      console.error('로드맵 생성 오류:', error);
      alert('로드맵 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Title>달성하고 싶은 목표를 입력하세요</S.Title>
        </S.Content>

        <S.InputSection>
          <S.InputContainer>
            <S.Input
              type="text"
              placeholder="예: 풀스택 개발자가 되고 싶어요"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <S.SubmitButton onClick={handleSubmit} disabled={isLoading}>
              <S.ArrowIcon>arrow_upward</S.ArrowIcon>
            </S.SubmitButton>
          </S.InputContainer>
        </S.InputSection>
      </S.Container>
    </>
  );
};

export default RoadmapGenerate;
