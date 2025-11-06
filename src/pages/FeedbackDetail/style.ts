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

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
  }
`;

export const Header = styled.div`
  margin-bottom: 40px;
`;

export const WeekBadge = styled.div`
  display: inline-block;
  background: rgba(254, 27, 133, 0.1);
  color: #fe1b85;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 1.4;
  color: #333;
  margin: 0 0 20px 0;
`;

export const CompletionSection = styled.div`
  background: linear-gradient(135deg, #fe1b85 0%, rgba(221, 41, 94, 0.8) 100%);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  color: white;
`;

export const CompletionLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: 8px;
`;

export const CompletionRate = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 48px;
  font-weight: 700;
`;

export const Section = styled.div`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #333;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 28px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
`;

export const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.li<{ type: 'strength' | 'improvement' }>`
  background: ${props => 
    props.type === 'strength' 
      ? 'rgba(52, 211, 153, 0.1)' 
      : 'rgba(251, 146, 60, 0.1)'
  };
  border-left: 4px solid ${props => 
    props.type === 'strength' 
      ? '#34d399' 
      : '#fb923c'
  };
  padding: 16px 20px;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;

export const NotFound = styled.div`
  text-align: center;
  padding: 100px 20px;
  color: rgba(0, 0, 0, 0.4);
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
`;

export const SummaryText = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #fe1b85;
  padding: 20px 24px;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;

export const PreviewText = styled.div`
  background: rgba(254, 27, 133, 0.05);
  border: 1px solid rgba(254, 27, 133, 0.2);
  padding: 20px 24px;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;
