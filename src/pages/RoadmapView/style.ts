import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg,
    #f8fafc 0%,
    #f1f5f9 25%,
    #e2e8f0 75%,
    #cbd5e1 100%
  );
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 80px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 80%, rgba(254, 27, 133, 0.05) 0%, transparent 60%),
      radial-gradient(circle at 80% 20%, rgba(255, 107, 157, 0.04) 0%, transparent 60%),
      radial-gradient(circle at 40% 40%, rgba(254, 27, 133, 0.03) 0%, transparent 60%);
    z-index: 0;
    animation: backgroundFloat 30s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg,
      rgba(254, 27, 133, 0.02) 0%,
      transparent 100%
    );
    z-index: 1;
  }

  @keyframes backgroundFloat {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-30px, -30px) rotate(1deg); }
    66% { transform: translate(30px, -15px) rotate(-1deg); }
  }
`;

export const DecorationDots = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: rgba(254, 27, 133, 0.2);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  &::before {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  &::after {
    top: 70%;
    right: 15%;
    animation-delay: 3s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) opacity(0.2); }
    50% { transform: translateY(-20px) opacity(0.6); }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(254, 27, 133, 0.1);
  border-top-color: #FE1B85;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #64748B;
`;

export const MainHeader = styled.div`
  text-align: center;
  padding: 30px 20px 20px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
  letter-spacing: -0.01em;
`;

export const StepBarContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto 20px;
  padding: 0 20px;
`;

export const StepBar = styled.div<{ currentWeek: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background: transparent;
  border-radius: 50px;
  padding: 16px 24px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 60px;
    right: 60px;
    height: 3px;
    background: #E5E7EB;
    border-radius: 2px;
    transform: translateY(-50%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 60px;
    width: calc((100% - 120px) * ${props => Math.min(1, (props.currentWeek - 1) / 4)});
    height: 3px;
    background: #10B981;
    border-radius: 2px;
    transform: translateY(-50%);
    z-index: 2;
    transition: width 0.3s ease;
  }
`;

export const StepItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;

  ${({ isActive }) => isActive && `
    transform: scale(1.1);
  `}
`;

export const StepCircle = styled.div<{ isActive?: boolean; isCompleted?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.3s ease;
  background: white;
  border: 2px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${({ isCompleted }) => isCompleted && `
    background: linear-gradient(135deg, #10B981, #34D399);
    color: white;
  `}

  ${({ isActive, isCompleted }) => isActive && !isCompleted && `
    background: linear-gradient(135deg, #FE1B85, #FF6B9D);
    color: white;
    animation: pulse 2s ease-in-out infinite;
  `}

  ${({ isActive, isCompleted }) => !isActive && !isCompleted && `
    color: #94A3B8;
    background: white;
    border: 2px solid rgba(148, 163, 184, 0.3);
  `}

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

export const StepLabel = styled.span<{ isActive?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ isActive }) => isActive ? '#FE1B85' : '#64748B'};
  text-align: center;
  min-width: 60px;
  transition: color 0.3s ease;
`;

export const ProgressStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
`;

export const StatItem = styled.div`
  background: linear-gradient(135deg, #FE1B85, #FF6B9D);
  border-radius: 16px;
  padding: 16px 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(254, 27, 133, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(254, 27, 133, 0.4);
  }
`;

export const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: white;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ScrollContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0 20px 40px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(254, 27, 133, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(254, 27, 133, 0.5);
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(254, 27, 133, 0.7);
  }
`;

export const RoadmapGrid = styled.div`
  display: flex;
  gap: 24px;
  min-width: fit-content;
  height: 100%;
  align-items: flex-start;
`;

export const WeekColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 280px;
  flex-shrink: 0;
  padding: 20px 8px 0 0;
`;

export const WeekCard = styled.div`
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.85) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid rgba(254, 27, 133, 0.2);
  border-radius: 20px;
  padding: 20px;
  min-height: 200px;
  box-shadow: 0 10px 40px rgba(254, 27, 133, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FE1B85, #FF6B9D);
    border-radius: 20px 20px 0 0;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(254, 27, 133, 0.2);
    border-color: rgba(254, 27, 133, 0.4);
  }
`;

export const WeekHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const WeekNumber = styled.div`
  background: linear-gradient(135deg, #FE1B85, #FF6B9D);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(254, 27, 133, 0.3);
`;

export const WeekBadge = styled.div`
  background: rgba(254, 27, 133, 0.1);
  color: #FE1B85;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const WeekTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const WeekDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
  flex: 1;
`;

export const DaysContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(254, 27, 133, 0.15);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
`;

export const DaysHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(254, 27, 133, 0.1);
`;

export const DaysIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #FE1B85, #FF6B9D);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const DaysTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #2D1B69;
  margin: 0;
`;

export const DaysList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DayItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
  transition: all 0.2s ease;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: rgba(254, 27, 133, 0.05);
    transform: translateX(4px);
  }
`;

export const DayNumber = styled.div`
  background: rgba(254, 27, 133, 0.1);
  color: #FE1B85;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 40px;
  text-align: center;
  flex-shrink: 0;
`;

export const DayTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #2D1B69;
  line-height: 1.4;
  flex: 1;
`;
