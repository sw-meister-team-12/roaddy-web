import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface SurveyData {
  surveyId: string;
  questions: Question[];
}

interface Answer {
  questionId: number;
  answer: string;
}

const LevelTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const surveyData = location.state as SurveyData | null;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!surveyData || !surveyData.surveyId || !surveyData.questions) {
      alert('설문 데이터가 없습니다. 로드맵 생성 페이지로 이동합니다.');
      navigate('/roadmap/generate');
    }
  }, [surveyData, navigate]);

  if (!surveyData) {
    return null;
  }

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    // 모든 질문에 답변했는지 확인
    const allAnswered = surveyData.questions.every(
      question => answers[question.id]
    );

    if (!allAnswered) {
      alert('모든 질문에 답변해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const url = `${BASE_URL}/api/surveys/${surveyData.surveyId}`;
      
      const answersArray: Answer[] = surveyData.questions.map(question => ({
        questionId: question.id,
        answer: answers[question.id],
      }));

      console.log('요청 URL:', url);
      console.log('요청 데이터:', { answers: answersArray });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: answersArray }),
      });

      console.log('응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('에러 응답:', errorText);
        throw new Error(`설문 제출에 실패했습니다. (${response.status})`);
      }

      const data = await response.json();
      console.log('설문 제출 성공:', data);
      
      alert('설문이 성공적으로 제출되었습니다!');
      // TODO: 성공 후 다음 페이지로 이동
    } catch (error) {
      console.error('설문 제출 오류:', error);
      alert('설문 제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (Object.keys(answers).length / surveyData.questions.length) * 100;

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Title>레벨 테스트</S.Title>
          
          <S.ProgressBar>
            <S.ProgressFill progress={progress} />
          </S.ProgressBar>

          {surveyData.questions.map((question, index) => (
            <S.QuestionCard key={question.id}>
              <S.QuestionNumber>질문 {index + 1}</S.QuestionNumber>
              <S.QuestionText>{question.question}</S.QuestionText>
              <S.OptionsContainer>
                {question.options.map((option) => (
                  <S.OptionButton
                    key={option}
                    selected={answers[question.id] === option}
                    onClick={() => handleOptionSelect(question.id, option)}
                  >
                    {option}
                  </S.OptionButton>
                ))}
              </S.OptionsContainer>
            </S.QuestionCard>
          ))}
        </S.Content>

        <S.SubmitSection>
          <S.SubmitButton
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(answers).length !== surveyData.questions.length}
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </S.SubmitButton>
        </S.SubmitSection>
      </S.Container>
    </>
  );
};

export default LevelTest;

