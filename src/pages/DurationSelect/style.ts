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

export const PageTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #000;
  margin: 0 0 16px 0;
`;

export const PageDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #666;
  margin: 0 0 49px 0;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 60px;
`;

export const OptionCard = styled.button<{ selected: boolean }>`
  position: relative;
  width: 100%;
  min-height: 100px;
  background: ${(props) => (props.selected ? 'rgba(254, 27, 133, 0.05)' : '#fff')};
  border: 2px solid ${(props) => (props.selected ? '#FE1B85' : '#e1e1e1')};
  border-radius: 8px;
  padding: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.selected ? 'rgba(254, 27, 133, 0.05)' : '#f6fbfc')};
    border-color: ${(props) => (props.selected ? '#FE1B85' : '#cacfce')};
  }
`;

export const RadioCircle = styled.div<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.selected ? '#FE1B85' : '#e1e1e1')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;

  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) => (props.selected ? '#FE1B85' : 'transparent')};
    transition: all 0.2s;
  }
`;

export const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
`;

export const OptionLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #000;
`;

export const OptionDescription = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #666;
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

  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: white;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 30px;
  background: #fe1b85;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: white;

  &:hover:not(:disabled) {
    background: #dd295e;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
