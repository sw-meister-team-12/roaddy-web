import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import { useRoadmapStore } from '../../store/roadmapStore';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import PublicIcon from '@mui/icons-material/Public';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import * as S from './style';

const RoadmapView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { roadmapId, roadmapData, currentWeek, currentDay, maxWeek } = useRoadmapStore();
  const hasShownAlert = useRef(false);

  useEffect(() => {
    console.log('RoadmapView 마운트:', { id, roadmapId, hasData: !!roadmapData });
    
    // 로드맵 데이터가 전혀 없는 경우
    if (!roadmapData && !roadmapId) {
      console.log('로드맵 데이터 없음, 생성 페이지로 이동');
      if (!hasShownAlert.current) {
        hasShownAlert.current = true;
        alert('로드맵을 생성해주세요.');
      }
      navigate('/');
      return;
    }

    // URL에 id가 없지만 store에 데이터가 있으면 URL 수정
    if (!id && roadmapId && roadmapData) {
      console.log('URL에 id 없음, roadmapId로 리다이렉트:', roadmapId);
      navigate(`/roadmap/${roadmapId}`, { replace: true });
      return;
    }

    // URL의 id와 store의 roadmapId가 다르면 리다이렉트
    if (id && roadmapId && id !== String(roadmapId)) {
      console.log('ID 불일치, 로드맵 생성 페이지로 이동');
      if (!hasShownAlert.current) {
        hasShownAlert.current = true;
        alert('로드맵 데이터가 일치하지 않습니다. 로드맵을 다시 생성해주세요.');
      }
      navigate('/');
      return;
    }

    // URL에 id는 있지만 데이터가 없는 경우
    if (id && !roadmapData) {
      console.log('데이터 없음, 로드맵 생성 페이지로 이동');
      if (!hasShownAlert.current) {
        hasShownAlert.current = true;
        alert('로드맵을 생성해주세요.');
      }
      navigate('/');
      return;
    }

    // 디버깅: 저장된 데이터 확인
    if (roadmapData) {
      console.log('RoadmapView - 저장된 데이터:', roadmapData);
      console.log('RoadmapView - weeks 수:', roadmapData.weeks?.length);
      console.log('RoadmapView - maxWeek:', maxWeek);
    }
  }, [id, roadmapId, roadmapData, navigate, maxWeek]);

  if (!roadmapData || !roadmapData.weeks || roadmapData.weeks.length === 0) {
    return (
      <>
        <Header />
        <S.Container>
          <S.LoadingContainer>
            <S.LoadingText>로드맵 데이터를 불러오는 중...</S.LoadingText>
          </S.LoadingContainer>
        </S.Container>
      </>
    );
  }

  // 통계 계산
  const totalDays = maxWeek * 7;
  const completedDays = 7 * (currentWeek - 1) + currentDay - 1;
  const progress = Math.round((completedDays / totalDays) * 100);

  return (
    <>
      <Header />
      <S.Container>
        <S.DecorationDots />

        <S.MainHeader>
          <S.Title>{roadmapData.title || '나의 로드맵'}</S.Title>

          {/* 진행 통계 */}
          <S.ProgressStats>
            <S.StatItem>
              <S.StatNumber>{currentWeek}</S.StatNumber>
              <S.StatLabel>현재 주차</S.StatLabel>
            </S.StatItem>
            <S.StatItem>
              <S.StatNumber>{totalDays}</S.StatNumber>
              <S.StatLabel>총 일수</S.StatLabel>
            </S.StatItem>
            <S.StatItem>
              <S.StatNumber>{progress}%</S.StatNumber>
              <S.StatLabel>진행률</S.StatLabel>
            </S.StatItem>
          </S.ProgressStats>

          {/* 학습 단계 로드맵 */}
          <S.StepBarContainer>
            <S.StepBar currentWeek={currentWeek}>
              {[
                { id: 1, title: '환경설정', desc: 'Week 1-2', icon: 'build' },
                { id: 2, title: '언어기초', desc: 'Week 3-4', icon: 'computer' },
                { id: 3, title: '데이터베이스', desc: 'Week 5-6', icon: 'storage' },
                { id: 4, title: '서버구축', desc: 'Week 7-8', icon: 'public' },
                { id: 5, title: 'API & 배포', desc: 'Week 9-12', icon: 'rocket_launch' }
              ].map((step) => (
                <S.StepItem key={step.id} isActive={step.id === Math.ceil(currentWeek / 2.4)}>
                  <S.StepCircle
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
                  </S.StepCircle>
                  <S.StepLabel isActive={step.id === Math.ceil(currentWeek / 2.4)}>
                    {step.title}
                  </S.StepLabel>
                  <div style={{
                    fontSize: '10px',
                    color: '#94A3B8',
                    fontWeight: 500,
                    marginTop: '2px'
                  }}>
                    {step.desc}
                  </div>
                </S.StepItem>
              ))}
            </S.StepBar>
          </S.StepBarContainer>
        </S.MainHeader>

        <S.ScrollContainer>
          <S.RoadmapGrid>
            {roadmapData.weeks && roadmapData.weeks.map((week) => (
              <S.WeekColumn key={week.week}>
                <S.WeekCard>
                  <S.WeekHeader>
                    <S.WeekNumber>Week {week.week}</S.WeekNumber>
                    <S.WeekBadge>학습</S.WeekBadge>
                  </S.WeekHeader>
                  <S.WeekTitle>{week.title}</S.WeekTitle>
                  <S.WeekDescription>{week.description}</S.WeekDescription>
                </S.WeekCard>

                <S.DaysContainer>
                  <S.DaysHeader>
                    <S.DaysIcon><CalendarTodayIcon style={{ width: '12px', height: '12px' }} /></S.DaysIcon>
                    <S.DaysTitle>7일 학습 계획</S.DaysTitle>
                  </S.DaysHeader>
                  <S.DaysList>
                    {week.days && week.days.map((day) => (
                      <S.DayItem key={day.day}>
                        <S.DayNumber>D{day.day}</S.DayNumber>
                        <S.DayTitle>{day.title}</S.DayTitle>
                      </S.DayItem>
                    ))}
                  </S.DaysList>
                </S.DaysContainer>
              </S.WeekColumn>
            ))}
          </S.RoadmapGrid>
        </S.ScrollContainer>
      </S.Container>
    </>
  );
};

export default RoadmapView;
