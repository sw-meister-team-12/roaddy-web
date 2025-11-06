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
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.6) 100%);
  border-radius: 12px;
  padding: 40px 50px;
  margin-bottom: 40px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const QuizTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
`;

export const QuizProgress = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 20px;
  border-radius: 20px;
`;

export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
`;

export const QuestionCard = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 40px 50px;
`;

export const TodoLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.8) 100%);
  padding: 6px 16px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
`;

export const QuestionNumber = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fe1b85;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const QuestionText = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.6;
  color: #000;
  margin: 0 0 24px 0;
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? '#fff0f7' : '#fff')};
  border: 2px solid ${({ selected }) => (selected ? '#fe1b85' : '#e1e1e1')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ selected }) => (selected ? '#fff0f7' : '#f6fbfc')};
    border-color: ${({ selected }) => (selected ? '#fe1b85' : '#cacfce')};
  }
`;

export const OptionRadio = styled.div<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => (selected ? '#fe1b85' : '#cacfce')};
  background: ${({ selected }) => (selected ? '#fe1b85' : 'white')};
  position: relative;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    display: ${({ selected }) => (selected ? 'block' : 'none')};
  }
`;

export const OptionText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  color: #000;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  padding: 16px 60px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: white;
  background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : '#fe1b85')};
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : '#dd295e')};
  }

  &:active {
    background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : '#c01850')};
  }
`;

export const BackButton = styled.button`
  padding: 16px 60px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #686868;
  background: white;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f8f8;
    border-color: #cacfce;
  }

  &:active {
    background: #efefef;
  }
`;

export const ResultSection = styled.div<{ success: boolean }>`
  background: ${({ success }) =>
    success
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
  border-radius: 12px;
  padding: 60px 50px;
  margin-bottom: 40px;
  color: white;
  text-align: center;
`;

export const ResultIcon = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
`;

export const ResultTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

export const ResultScore = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.2);
  display: inline-block;
  padding: 8px 24px;
  border-radius: 20px;
`;

export const ResultMessage = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.6;
  margin: 0 0 32px 0;
  opacity: 0.95;
`;

export const ReviewSection = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 40px 50px;
  margin-bottom: 30px;
`;

export const ReviewQuestion = styled.div`
  margin-bottom: 24px;
`;

export const QuestionLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fe1b85;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const AnswerComparison = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
`;

export const AnswerBox = styled.div<{ correct?: boolean; wrong?: boolean }>`
  padding: 24px;
  border-radius: 8px;
  background: ${({ correct, wrong }) =>
    correct ? '#f0fdf4' : wrong ? '#fef2f2' : '#f8f8f8'};
  border: 2px solid
    ${({ correct, wrong }) => (correct ? '#86efac' : wrong ? '#fca5a5' : '#e1e1e1')};
`;

export const AnswerLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const AnswerText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  color: #000;
`;

export const Explanation = styled.div`
  padding: 24px;
  background: #fffbeb;
  border: 2px solid #fde68a;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const ExplanationLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #92400e;
`;

export const ExplanationText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #451a03;
  margin: 0;
`;

export const RetrySection = styled.div`
  padding: 32px;
  background: #f6fbfc;
  border: 2px dashed #cacfce;
  border-radius: 8px;
`;

export const RetrySectionTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #000;
`;

export const RetryQuestionBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;
