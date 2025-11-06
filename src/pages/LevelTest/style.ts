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
  align-items: center;
  width: 800px;
  margin-top: 80px;
  padding-bottom: 100px;
`;

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  text-align: center;
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 60px 0;
`;

export const QuestionCard = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const QuestionNumber = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #fe1b85;
  margin-bottom: 12px;
`;

export const QuestionText = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #000;
  margin: 0 0 20px 0;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  padding: 16px 20px;
  background: ${({ selected }) => (selected ? 'rgba(254, 27, 133, 0.1)' : 'white')};
  border: 2px solid ${({ selected }) => (selected ? '#fe1b85' : '#e0e0e0')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#fe1b85' : '#000')};
  
  &:hover {
    border-color: #fe1b85;
    background: rgba(254, 27, 133, 0.05);
  }
`;

export const SubmitSection = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

export const SubmitButton = styled.button`
  padding: 16px 60px;
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.8) 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(254, 27, 133, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 40px;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.8) 100%);
  transition: width 0.3s ease;
`;

