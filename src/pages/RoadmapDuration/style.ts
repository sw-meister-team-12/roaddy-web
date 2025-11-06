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
  width: 960px;
  margin-top: 60px;
  padding-bottom: 100px;
`;

export const PageTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 1.4;
  color: #333;
  margin: 0 0 20px 0;
`;

export const Description = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin: 0 0 50px 0;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 50px;
`;

export const OptionCard = styled.div<{ selected: boolean }>`
  background: white;
  border: 2px solid ${props => props.selected ? '#fe1b85' : '#e5e5e5'};
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.selected ? '#fe1b85' : '#cccccc'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

export const RadioButton = styled.div<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? '#fe1b85' : '#cccccc'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
`;

export const RadioInner = styled.div<{ selected: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.selected ? '#fe1b85' : 'transparent'};
  transition: all 0.2s;
`;

export const OptionLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #333;
`;

export const OptionDescription = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  margin-left: 40px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;

export const BackButton = styled.button`
  background: white;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px 32px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #cccccc;
    background: #f9f9f9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #fe1b85 0%, rgba(221, 41, 94, 0.8) 100%);
  border: none;
  border-radius: 12px;
  padding: 16px 40px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(254, 27, 133, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

