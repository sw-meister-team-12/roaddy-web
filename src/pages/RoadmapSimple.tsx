import styled from 'styled-components';
import Header from '../components/common/Header';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import PublicIcon from '@mui/icons-material/Public';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Mock 데이터 - 12주 백엔드 개발 로드맵
const mockRoadmapData = {
  weeks: [
    {
      week: 1,
      title: '백엔드 기초와 학습 환경 설정',
      description: '백엔드 개발에 필요한 기본 개념(클라이언트-서버 구조, HTTP 등)을 이해하고 개발 환경(IDE, 버전 관리 시스템 등)을 설정합니다.',
      days: [
        { day: 1, title: '백엔드 개발이란?' },
        { day: 2, title: '클라이언트-서버 구조 이해' },
        { day: 3, title: 'HTTP 프로토콜 기초' },
        { day: 4, title: 'IDE 설치 및 설정' },
        { day: 5, title: 'Git/GitHub 기초' },
        { day: 6, title: '터미널/CLI 기본 사용법' },
        { day: 7, title: '개발 환경 실습' },
      ],
    },
    {
      week: 2,
      title: '프로그래밍 언어 선택 및 기초',
      description: '백엔드 개발에 널리 사용되는 언어(Python 또는 Java 중 하나 선택)의 문법과 기본 문법 구조를 익힙니다.',
      days: [
        { day: 1, title: 'Python/Java 언어 선택하기' },
        { day: 2, title: '변수와 데이터 타입' },
        { day: 3, title: '조건문과 반복문' },
        { day: 4, title: '함수와 메서드' },
        { day: 5, title: '객체지향 프로그래밍 기초' },
        { day: 6, title: '예외 처리' },
        { day: 7, title: '실습: 간단한 프로그램 작성' },
      ],
    },
    {
      week: 3,
      title: '데이터베이스 기초',
      description: '데이터베이스의 기본 개념을 이해하고 SQL 문법을 학습하여 데이터베이스를 효과적으로 조작할 수 있습니다.',
      days: [
        { day: 1, title: '데이터베이스 개념과 종류' },
        { day: 2, title: '관계형 데이터베이스와 SQL' },
        { day: 3, title: 'SELECT 문과 기본 쿼리' },
        { day: 4, title: 'INSERT, UPDATE, DELETE' },
        { day: 5, title: 'JOIN과 서브쿼리' },
        { day: 6, title: '테이블 설계와 정규화' },
        { day: 7, title: 'MySQL/PostgreSQL 실습' },
      ],
    },
    {
      week: 4,
      title: '간단한 웹 서버 구축',
      description: '선택한 언어를 사용하여 간단한 웹 서버를 구축하고 기본적인 라우팅을 구현합니다.',
      days: [
        { day: 1, title: '웹 서버의 동작 원리' },
        { day: 2, title: 'Flask/Spring Boot 설치' },
        { day: 3, title: '첫 번째 웹 애플리케이션' },
        { day: 4, title: '라우팅 기초' },
        { day: 5, title: 'HTTP 메서드 활용' },
        { day: 6, title: '템플릿 엔진 사용하기' },
        { day: 7, title: '정적 파일 서빙' },
      ],
    },
    {
      week: 5,
      title: 'RESTful API 설계 및 구현',
      description: 'RESTful 원칙을 이해하고 간단한 CRUD(Create, Read, Update, Delete) API를 구현합니다.',
      days: [
        { day: 1, title: 'REST API 개념과 원칙' },
        { day: 2, title: 'API 엔드포인트 설계' },
        { day: 3, title: 'JSON 데이터 처리' },
        { day: 4, title: 'CRUD 연산 구현' },
        { day: 5, title: 'API 테스트 도구 사용' },
        { day: 6, title: '상태 코드와 에러 처리' },
        { day: 7, title: 'API 문서화' },
      ],
    },
    {
      week: 6,
      title: '유닛 테스트 및 디버깅',
      description: '기본적인 유닛 테스트 작성법과 디버깅 기법을 학습합니다.',
      days: [
        { day: 1, title: '테스트의 중요성과 종류' },
        { day: 2, title: '유닛 테스트 프레임워크' },
        { day: 3, title: '테스트 케이스 작성' },
        { day: 4, title: 'Mock과 Stub 활용' },
        { day: 5, title: '디버깅 기법과 도구' },
        { day: 6, title: '로깅과 모니터링' },
        { day: 7, title: 'TDD 기초' },
      ],
    },
    {
      week: 7,
      title: '인증 및 보안 기초',
      description: 'JWT, OAuth와 같은 인증 및 보안 기본 개념을 이해하고 구현합니다.',
      days: [
        { day: 1, title: '웹 보안 기초 개념' },
        { day: 2, title: '세션과 쿠키' },
        { day: 3, title: 'JWT 토큰 인증' },
        { day: 4, title: '비밀번호 해싱' },
        { day: 5, title: 'OAuth 2.0 이해' },
        { day: 6, title: 'HTTPS와 SSL/TLS' },
        { day: 7, title: '보안 모범 사례' },
      ],
    },
    {
      week: 8,
      title: '프로젝트: 간단한 웹 애플리케이션 구축 (1)',
      description: '이전에 학습한 내용을 바탕으로 간단한 웹 애플리케이션의 기초 구조를 설계하고 구현하기 시작합니다.',
      days: [
        { day: 1, title: '프로젝트 계획 수립' },
        { day: 2, title: '프로젝트 구조 설계' },
        { day: 3, title: '기본 모델 정의' },
        { day: 4, title: '데이터베이스 스키마 설계' },
        { day: 5, title: '기본 API 엔드포인트 구현' },
        { day: 6, title: '사용자 인증 구현' },
        { day: 7, title: '기능 테스트 및 검토' },
      ],
    },
    {
      week: 9,
      title: '프로젝트: 데이터베이스 통합 및 기능 구현',
      description: '웹 애플리케이션에 데이터베이스를 통합하고 주요 기능을 구현합니다.',
      days: [
        { day: 1, title: '데이터베이스 연결 설정' },
        { day: 2, title: 'ORM 설정 및 활용' },
        { day: 3, title: '데이터 CRUD 구현' },
        { day: 4, title: '데이터 검증 및 제약사항' },
        { day: 5, title: '관계 설정 및 조인' },
        { day: 6, title: '데이터베이스 마이그레이션' },
        { day: 7, title: '성능 최적화' },
      ],
    },
    {
      week: 10,
      title: '프로젝트: 프론트엔드 연동 및 API 완료',
      description: '간단한 프론트엔드를 통합하여 API와 상호작용하도록 구현합니다.',
      days: [
        { day: 1, title: 'CORS 설정' },
        { day: 2, title: '프론트엔드 기본 구조' },
        { day: 3, title: 'API 연동 테스트' },
        { day: 4, title: '파일 업로드 기능' },
        { day: 5, title: '이메일 알림 기능' },
        { day: 6, title: '에러 핸들링 개선' },
        { day: 7, title: '전체 기능 통합 테스트' },
      ],
    },
    {
      week: 11,
      title: '프로젝트 검토 및 테스트',
      description: '최종 프로젝트를 테스트하고, 문제를 디버깅하며 완성도를 높이기 위해 피드백을 반영합니다.',
      days: [
        { day: 1, title: '통합 테스트 계획' },
        { day: 2, title: '자동화된 테스트 구현' },
        { day: 3, title: '성능 테스트 및 최적화' },
        { day: 4, title: '보안 취약점 점검' },
        { day: 5, title: '코드 리팩토링' },
        { day: 6, title: '문서화 작업' },
        { day: 7, title: '배포 준비' },
      ],
    },
    {
      week: 12,
      title: '최종 프로젝트 발표 및 배포',
      description: '프로젝트를 최종 배포하고, 발표를 통해 학습한 내용을 정리하며 공유합니다.',
      days: [
        { day: 1, title: '배포 환경 설정' },
        { day: 2, title: '클라우드 배포 (AWS/Heroku)' },
        { day: 3, title: '도메인 연결 및 HTTPS' },
        { day: 4, title: '모니터링 설정' },
        { day: 5, title: '발표 자료 준비' },
        { day: 6, title: '프로젝트 발표' },
        { day: 7, title: '학습 정리 및 다음 단계' },
      ],
    },
  ],
};

const Container = styled.div`
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

const DecorationDots = styled.div`
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

const MainHeader = styled.div`
  text-align: center;
  padding: 30px 20px 20px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
  letter-spacing: -0.01em;
`;

const StepBarContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto 20px;
  padding: 0 20px;
`;

const StepBar = styled.div<{ currentWeek: number }>`
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
    width: calc((100% - 120px) * ${props => Math.min(1, (Math.ceil(props.currentWeek / 2.4) - 1) / 4)});
    height: 3px;
    background: #10B981;
    border-radius: 2px;
    transform: translateY(-50%);
    z-index: 2;
    transition: width 0.3s ease;
  }
`;

const StepItem = styled.div<{ isActive?: boolean }>`
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

const StepCircle = styled.div<{ isActive?: boolean; isCompleted?: boolean }>`
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

const StepLabel = styled.span<{ isActive?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ isActive }) => isActive ? '#FE1B85' : '#64748B'};
  text-align: center;
  min-width: 60px;
  transition: color 0.3s ease;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
`;

const StatItem = styled.div`
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

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: white;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0 20px 40px;

  /* 스크롤바 커스터마이징 */
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

const RoadmapGrid = styled.div`
  display: flex;
  gap: 24px;
  min-width: fit-content;
  height: 100%;
  align-items: flex-start;
`;

const WeekColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 280px;
  flex-shrink: 0;
  padding: 20px 8px 0 0;
`;

const WeekCard = styled.div`
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

const WeekHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const WeekNumber = styled.div`
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

const WeekBadge = styled.div`
  background: rgba(254, 27, 133, 0.1);
  color: #FE1B85;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const WeekTitle = styled.h2`
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

const WeekDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
  flex: 1;
`;

const DaysContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(254, 27, 133, 0.15);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
`;

const DaysHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(254, 27, 133, 0.1);
`;

const DaysIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #FE1B85, #FF6B9D);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

const DaysTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #2D1B69;
  margin: 0;
`;

const DaysList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DayItem = styled.div`
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

const DayNumber = styled.div`
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

const DayTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #2D1B69;
  line-height: 1.4;
  flex: 1;
`;

const RoadmapSimple = () => {
  // const { id } = useParams<{ id: string }>();
  const currentWeek = 3; // 현재 진행 중인 주차 (예시)

  return (
    <>
      <Header />
      <Container>
        <DecorationDots />

        <MainHeader>
          <Title>백엔드 개발 로드맵</Title>

        {/* 진행 통계 */}
        <ProgressStats>
          <StatItem>
            <StatNumber>3</StatNumber>
            <StatLabel>현재 주차</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>84</StatNumber>
            <StatLabel>총 일수</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>25%</StatNumber>
            <StatLabel>진행률</StatLabel>
          </StatItem>
        </ProgressStats>

        {/* 학습 단계 로드맵 */}
        <StepBarContainer>
          <StepBar currentWeek={currentWeek}>
            {[
              { id: 1, title: '환경설정', desc: 'Week 1-2', icon: 'build' },
              { id: 2, title: '언어기초', desc: 'Week 3-4', icon: 'computer' },
              { id: 3, title: '데이터베이스', desc: 'Week 5-6', icon: 'storage' },
              { id: 4, title: '서버구축', desc: 'Week 7-8', icon: 'public' },
              { id: 5, title: 'API & 배포', desc: 'Week 9-12', icon: 'rocket_launch' }
            ].map((step) => (
              <StepItem key={step.id} isActive={step.id === Math.ceil(currentWeek / 2.4)}>
                <StepCircle
                  isActive={step.id === Math.ceil(currentWeek / 2.4)}
                  isCompleted={step.id < Math.ceil(currentWeek / 2.4)}
                >
                  {step.id < Math.ceil(currentWeek / 2.4) ? '✓' : (
                    step.icon === 'build' ? <BuildIcon style={{ width: '16px', height: '16px' }} /> :
                    step.icon === 'computer' ? <ComputerIcon style={{ width: '16px', height: '16px' }} /> :
                    step.icon === 'storage' ? <StorageIcon style={{ width: '16px', height: '16px' }} /> :
                    step.icon === 'public' ? <PublicIcon style={{ width: '16px', height: '16px' }} /> :
                    step.icon === 'rocket_launch' ? <RocketLaunchIcon style={{ width: '16px', height: '16px' }} /> :
                    null
                  )}
                </StepCircle>
                <StepLabel isActive={step.id === Math.ceil(currentWeek / 2.4)}>
                  {step.title}
                </StepLabel>
                <div style={{
                  fontSize: '10px',
                  color: '#94A3B8',
                  fontWeight: 500,
                  marginTop: '2px'
                }}>
                  {step.desc}
                </div>
              </StepItem>
            ))}
          </StepBar>
        </StepBarContainer>
      </MainHeader>

      <ScrollContainer>
        <RoadmapGrid>
          {mockRoadmapData.weeks.map((week) => (
            <WeekColumn key={week.week}>
              <WeekCard>
                <WeekHeader>
                  <WeekNumber>Week {week.week}</WeekNumber>
                  <WeekBadge>백엔드</WeekBadge>
                </WeekHeader>
                <WeekTitle>{week.title}</WeekTitle>
                <WeekDescription>{week.description}</WeekDescription>
              </WeekCard>

              <DaysContainer>
                <DaysHeader>
                  <DaysIcon><CalendarTodayIcon style={{ width: '12px', height: '12px' }} /></DaysIcon>
                  <DaysTitle>7일 학습 계획</DaysTitle>
                </DaysHeader>
                <DaysList>
                  {week.days.map((day) => (
                    <DayItem key={day.day}>
                      <DayNumber>D{day.day}</DayNumber>
                      <DayTitle>{day.title}</DayTitle>
                    </DayItem>
                  ))}
                </DaysList>
              </DaysContainer>
            </WeekColumn>
          ))}
        </RoadmapGrid>
      </ScrollContainer>
      </Container>
    </>
  );
};

export default RoadmapSimple;
