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
  width: 960px;
  padding: 60px 0;
`;

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 42px;
  line-height: 50px;
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 40px 0;
`;

export const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FeedbackCard = styled.div`
  background: white;
  border: 1px solid #dadada;
  border-radius: 16px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #fe1b85;
    box-shadow: 0 4px 12px rgba(254, 27, 133, 0.1);
    transform: translateY(-2px);
  }
`;

export const WeekBadge = styled.div`
  display: inline-block;
  background: rgba(254, 27, 133, 0.1);
  color: #fe1b85;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const Summary = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  margin: 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: rgba(0, 0, 0, 0.4);
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
`;
