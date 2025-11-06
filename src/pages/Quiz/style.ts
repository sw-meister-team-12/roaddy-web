import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  min-height: 100vh;
  width: 100%;
  padding-top: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 1160px;
  margin-top: 49px;
  padding-bottom: 100px;
`;

export const LoadingText = styled.div`
  font-family: 'Pretendard', sans-serif;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  padding: 100px 20px;
`;

export const QuizHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
`;

export const WeekBadge = styled.div`
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.6) 100%);
  color: white;
  padding: 8px 24px;
  border-radius: 20px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
`;

export const QuizTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

export const QuestionSection = styled.div`
  margin-bottom: 40px;
`;

export const QuestionTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin: 0 0 16px 0;
  line-height: 1.4;
`;

export const ProgressText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #999;
  text-align: center;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

export const OptionCard = styled.div<{ 
  selected: boolean; 
  isCorrect: boolean | null;
  showCorrect?: boolean;
  disabled: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 30px;
  border-radius: 12px;
  background: ${({ selected, isCorrect, showCorrect }) => {
    if (showCorrect) return '#d4f4dd';
    if (isCorrect === null) return selected ? '#f6fbfc' : '#f8f8f8';
    if (selected && isCorrect) return '#d4f4dd';
    if (selected && !isCorrect) return '#ffcdd2';
    return '#f8f8f8';
  }};
  border: 2px solid ${({ selected, isCorrect, showCorrect }) => {
    if (showCorrect) return '#4caf50';
    if (isCorrect === null) return selected ? '#fe1b85' : '#e1e1e1';
    if (selected && isCorrect) return '#4caf50';
    if (selected && !isCorrect) return '#f44336';
    return '#e1e1e1';
  }};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover {
    ${({ disabled }) => !disabled && `
      background: #f6fbfc;
      border-color: #cacfce;
    `}
  }
`;

export const OptionNumber = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #666;
  flex-shrink: 0;
`;

export const OptionText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  flex: 1;
`;

export const ResultIcon = styled.div<{ isCorrect: boolean }>`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background: ${({ isCorrect }) => isCorrect ? '#4caf50' : '#f44336'};
`;

export const AnswerFeedbackRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const CorrectAnswerBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BadgeLabel = styled.div`
  background: #4caf50;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 700;
`;

export const BadgeAnswer = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

export const ErrorMessage = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #fe1b85;
`;

export const FeedbackBadge = styled.div`
  background: #4caf50;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
`;

export const FeedbackText = styled.div<{ isError?: boolean }>`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${({ isError }) => isError ? '#f57c00' : '#2e7d32'};
`;

export const GuideText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #999;
  text-align: center;
  margin-bottom: 30px;
`;

export const SubmitButton = styled.button`
  width: 200px;
  margin: 0 auto;
  padding: 14px 40px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: white;
  background: #fe1b85;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dd295e;
  }

  &:active {
    background: #c01850;
  }
`;

export const ExplanationSection = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #fe1b85;
  padding: 20px 24px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ExplanationLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

export const ExplanationText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: #555;
  white-space: pre-wrap;
`;

export const NextButton = styled.button`
  width: 200px;
  margin: 0 auto;
  padding: 14px 40px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: white;
  background: #fe1b85;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dd295e;
  }

  &:active {
    background: #c01850;
  }
`;
