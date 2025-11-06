import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import * as S from './style';

// 임시 하드코딩: 피드백이 있는 주차 목록 (전체 조회 API가 없으므로)
// 실제 summary는 디테일 페이지에서 API를 통해 가져옴
const AVAILABLE_FEEDBACK_WEEKS = [
  { week: 1, summary: '1주차 피드백' },
  { week: 2, summary: '2주차 피드백' },
  { week: 3, summary: '3주차 피드백' }
];

const FeedbackList = () => {
  const navigate = useNavigate();

  const handleFeedbackClick = (week: number) => {
    navigate(`/feedback/${week}`);
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Title>주차별 피드백</S.Title>
          <S.FeedbackList>
            {AVAILABLE_FEEDBACK_WEEKS.length > 0 ? (
              AVAILABLE_FEEDBACK_WEEKS.map(({ week, summary }) => (
                <S.FeedbackCard
                  key={week}
                  onClick={() => handleFeedbackClick(week)}
                >
                  <S.WeekBadge>{week}주차</S.WeekBadge>
                  <S.Summary>{summary}</S.Summary>
                </S.FeedbackCard>
              ))
            ) : (
              <S.EmptyState>
                아직 피드백이 없습니다.<br />
                7일차를 완료하면 피드백을 받을 수 있습니다.
              </S.EmptyState>
            )}
          </S.FeedbackList>
        </S.Content>
      </S.Container>
    </>
  );
};

export default FeedbackList;
