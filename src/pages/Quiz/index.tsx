import { useParams } from 'react-router-dom';
import * as S from './style';

const Quiz = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <S.Container>
      <h1>퀴즈 페이지</h1>
      <p>퀴즈 ID: {id}</p>
    </S.Container>
  );
};

export default Quiz;
