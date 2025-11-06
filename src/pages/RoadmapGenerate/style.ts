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
  gap: 30px;
  margin-top: 211px;
  width: 538px;
`;

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 42px;
  line-height: 50px;
  text-align: center;
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const PeriodButton = styled.button<{ selected?: boolean }>`
  background: rgba(254, 27, 133, 0.2);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.2s;
  
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: white;
  white-space: nowrap;
  
  &:hover {
    background: rgba(254, 27, 133, 0.3);
  }
  
  ${({ selected }) => selected && `
    background: rgba(254, 27, 133, 0.4);
  `}
`;

export const InputSection = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 960px;
  height: 120px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #dadada;
  border-radius: 16px;
  overflow: hidden;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 20px 100px 20px 30px;
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  color: #000;
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

export const SubmitButton = styled.button`
  position: absolute;
  right: 36px;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
  
  &:active {
    background: rgba(0, 0, 0, 1);
  }
`;

export const ArrowIcon = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 24px;
  font-weight: 700;
  color: white;
  font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 10;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(254, 27, 133, 0.2);
  border-top: 4px solid #fe1b85;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #fe1b85;
  margin: 0;
`;
