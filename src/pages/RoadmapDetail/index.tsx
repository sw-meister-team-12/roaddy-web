import { useParams } from 'react-router-dom';
import * as S from './style';

const RoadmapDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <S.Container>
      <h2>로드맵 상세 페이지</h2>
      <p>로드맵 ID: {id}</p>
      <p>이 페이지는 향후 구현될 예정입니다.</p>
    </S.Container>
  );
};

export default RoadmapDetail;