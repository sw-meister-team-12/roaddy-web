import { useState } from 'react';
import { Header } from '../../components/common';
import * as S from './style';

type PeriodType = '4주' | '8주' | '12주' | '커스텀' | null;

const RoadmapGenerate = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>(null);
  const [goal, setGoal] = useState('');

  const handleSubmit = () => {
    if (!selectedPeriod || !goal.trim()) {
      alert('기간과 목표를 모두 입력해주세요.');
      return;
    }
    // TODO: 로드맵 생성 로직 구현
    console.log({ period: selectedPeriod, goal });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Title>생성할 로드맵 기간을 선택하세요</S.Title>
          <S.ButtonGroup>
            <S.PeriodButton
              selected={selectedPeriod === '4주'}
              onClick={() => setSelectedPeriod('4주')}
            >
              4주
            </S.PeriodButton>
            <S.PeriodButton
              selected={selectedPeriod === '8주'}
              onClick={() => setSelectedPeriod('8주')}
            >
              8주
            </S.PeriodButton>
            <S.PeriodButton
              selected={selectedPeriod === '12주'}
              onClick={() => setSelectedPeriod('12주')}
            >
              12주
            </S.PeriodButton>
            <S.PeriodButton
              selected={selectedPeriod === '커스텀'}
              onClick={() => setSelectedPeriod('커스텀')}
            >
              커스텀
            </S.PeriodButton>
          </S.ButtonGroup>
        </S.Content>

        <S.InputSection>
          <S.InputContainer>
            <S.Input
              type="text"
              placeholder="달성하고 싶은 목표를 입력하세요"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <S.SubmitButton onClick={handleSubmit}>
              <S.ArrowIcon>arrow_upward</S.ArrowIcon>
            </S.SubmitButton>
          </S.InputContainer>
        </S.InputSection>
      </S.Container>
    </>
  );
};

export default RoadmapGenerate;
