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

export const HeaderSection = styled.div`
  margin-bottom: 40px;
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
  margin: 0 0 12px 0;
`;

export const SubTitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  letter-spacing: 0.3px;
`;

export const Timeline = styled.div`
  position: relative;
`;

export const MilestoneWrapper = styled.div`
  position: relative;
  padding-left: 60px;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TimelineLine = styled.div<{ isLast?: boolean }>`
  position: absolute;
  left: 19px;
  top: 40px;
  width: 3px;
  height: ${props => props.isLast ? '0' : 'calc(100% + 40px)'};
  background: linear-gradient(180deg, rgba(254, 27, 133, 0.3) 0%, rgba(254, 27, 133, 0.1) 100%);
`;

export const TimelineDot = styled.div`
  position: absolute;
  left: 8px;
  top: 28px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fe1b85;
  box-shadow: 0 0 0 4px rgba(254, 27, 133, 0.15);
  z-index: 1;
`;

export const MilestoneCard = styled.div`
  background: white;
  border: 1px solid #dadada;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    border-color: #fe1b85;
    box-shadow: 0 8px 24px rgba(254, 27, 133, 0.15);
    transform: translateY(-2px);
  }
`;

export const WeekBadge = styled.div`
  display: inline-block;
  background: rgba(254, 27, 133, 0.15);
  color: #fe1b85;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 15px;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const MilestoneHeader = styled.div`
  margin-bottom: 24px;
`;

export const MilestoneTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
`;

export const MilestoneDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.6;
`;

export const ProgressSection = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(254, 27, 133, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(254, 27, 133, 0.1);
`;

export const ProgressLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #555;
`;

export const ProgressPercent = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #fe1b85;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.8) 100%);
  border-radius: 10px;
  transition: width 0.5s ease;
`;

export const DaysList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DayItem = styled.div<{ completed?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: ${props => props.completed ? 'rgba(254, 27, 133, 0.05)' : 'white'};
  border: 1px solid ${props => props.completed ? 'rgba(254, 27, 133, 0.2)' : '#e5e7eb'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.completed ? 'rgba(254, 27, 133, 0.08)' : 'rgba(0, 0, 0, 0.02)'};
    border-color: #fe1b85;
    transform: translateX(4px);
  }
`;

export const DayCheckbox = styled.div<{ completed?: boolean }>`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border: 2px solid ${props => props.completed ? '#fe1b85' : '#d1d5db'};
  border-radius: 6px;
  background: ${props => props.completed ? '#fe1b85' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-right: 16px;
`;

export const CheckIcon = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

export const DayContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DayNumber = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #fe1b85;
  background: rgba(254, 27, 133, 0.1);
  padding: 4px 12px;
  border-radius: 6px;
  white-space: nowrap;
`;

export const DayTitle = styled.span<{ completed?: boolean }>`
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.completed ? '#666' : '#333'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.7 : 1};
  transition: all 0.2s ease;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const EmptyIcon = styled.div`
  font-size: 80px;
  opacity: 0.3;
`;

export const EmptyTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

export const EmptyDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  max-width: 400px;
`;
