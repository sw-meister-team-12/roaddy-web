import styled from "styled-components";

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

export const PageTitle = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #000;
  margin: 0 0 49px 0;
`;

export const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

export const ProgressTitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000;
`;

export const ProgressCount = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: #efefef;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 57px;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: #fe1b85;
  transition: width 0.3s ease;
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;
`;

export const QuestionText = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #000;
  margin: 0;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const OptionButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  height: 80px;
  background: ${({ selected }) =>
    selected ? "rgba(254, 27, 133, 0.3)" : "#fff"};
  border: 1px solid ${({ selected }) => (selected ? "#FE1B85" : "#e1e1e1")};
  border-radius: 8px;
  padding: 15px 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: ${({ selected }) =>
      selected ? "rgba(254, 27, 133, 0.3)" : "#f6fbfc"};
    border-color: ${({ selected }) => (selected ? "#FE1B85" : "#cacfce")};
  }
`;

export const OptionNumber = styled.div<{ selected?: boolean }>`
  width: 35px;
  height: 35px;
  background: ${({ selected }) =>
    selected ? "rgba(254, 27, 133, 0.64)" : "#e0e7e9"};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: ${({ selected }) => (selected ? "#fff" : "#686868")};
`;

export const OptionText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #000;
`;

export const ButtonSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
`;

export const BackButton = styled.button`
  padding: 10px 30px;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: white;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NextButton = styled.button`
  padding: 10px 30px;
  background: #fe1b85;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: white;

  &:hover {
    background: #dd295e;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 인트로 화면 스타일
export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1160px;
  margin-top: 100px;
  padding: 80px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const IntroIcon = styled.div`
  font-size: 64px;
  margin-bottom: 30px;
`;

export const IntroTitle = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #000;
  margin: 0 0 20px 0;
`;

export const IntroDescription = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #666;
  text-align: center;
  margin: 0 0 50px 0;
`;

export const IntroButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

export const IntroSkipButton = styled.button`
  padding: 15px 40px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #333;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const IntroStartButton = styled.button`
  padding: 15px 40px;
  background: #fe1b85;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: white;

  &:hover {
    background: #dd295e;
  }
`;

// 결과 화면 스타일
export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  background: linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ResultTitle = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #666;
  margin: 0 0 20px 0;
`;

export const ResultLevel = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 64px;
  line-height: 76px;
  color: #fe1b85;
  margin: 0 0 20px 0;
`;

export const ResultScore = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #333;
  margin: 0 0 30px 0;
`;

export const ResultDescription = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #666;
  text-align: center;
  margin: 0 0 50px 0;
`;

export const ResultButton = styled.button`
  padding: 15px 50px;
  background: #fe1b85;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: white;

  &:hover {
    background: #dd295e;
  }
`;

