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
  margin: 0 0 30px 0;
`;

export const StatsSection = styled.div`
  background: linear-gradient(135deg, #fe1b85 0%, rgba(221, 41, 94, 0.8) 100%);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 8px 24px rgba(254, 27, 133, 0.2);
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const StatIcon = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 48px;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  opacity: 0.9;
`;

export const StatValue = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  opacity: 0.9;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SectionIcon = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 32px;
  color: #fe1b85;
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 32;
`;

export const SectionTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #333;
  margin: 0;
`;

export const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FeedbackCard = styled.div`
  background: white;
  border: 1px solid #dadada;
  border-radius: 16px;
  padding: 28px 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  
  &:hover {
    border-color: #fe1b85;
    box-shadow: 0 8px 24px rgba(254, 27, 133, 0.15);
    transform: translateY(-4px);
    
    .arrow-icon {
      transform: translateX(4px);
    }
  }
`;

export const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

export const CardIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(254, 27, 133, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CardIconSymbol = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 32px;
  color: #fe1b85;
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 32;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const WeekBadge = styled.div`
  display: inline-block;
  background: rgba(254, 27, 133, 0.15);
  color: #fe1b85;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 15px;
  padding: 6px 14px;
  border-radius: 8px;
  width: fit-content;
`;

export const Summary = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  margin: 0;
  font-weight: 500;
`;

export const CardRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ArrowIcon = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 28px;
  color: #666;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 28;
  transition: all 0.3s ease;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const EmptyIcon = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 80px;
  color: rgba(0, 0, 0, 0.15);
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 80;
`;

export const EmptyText = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  line-height: 1.6;
`;
