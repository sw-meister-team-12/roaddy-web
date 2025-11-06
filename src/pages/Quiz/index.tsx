import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Question {
  id: number;
  question: string;
  options: string[];
  todoTitle?: string;
  quizId?: string;
  originalQuizIndex?: number;
}

interface QuizData {
  quizId: string;
  quizIds?: string[];
  allQuizzes?: any[];
  questions: Question[];
}

interface ReviewItem {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  retryQuestions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

interface QuizResult {
  isPassed: boolean;
  score: number;
  review?: ReviewItem[];
}

const Quiz = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [retryAnswers, setRetryAnswers] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.quizData) {
      setQuizData(location.state.quizData);
    }
  }, [location.state]);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleRetryAnswerSelect = (key: string, answer: string) => {
    setRetryAnswers(prev => ({
      ...prev,
      [key]: answer
    }));
  };

  const handleSubmit = async () => {
    if (!quizData) return;

    // 모든 문제에 답변했는지 확인
    const allAnswered = quizData.questions.every(q => answers[q.id]);
    if (!allAnswered) {
      alert('모든 문제에 답해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      // 통합 퀴즈인 경우 각 퀴즈별로 답안을 그룹화하여 제출
      if (quizData.quizId === 'combined' && quizData.allQuizzes) {
        const allResults: QuizResult[] = [];

        for (const quiz of quizData.allQuizzes) {
          // 해당 퀴즈의 문제들에 대한 답변만 추출
          const quizAnswers = quizData.questions
            .filter(q => q.quizId === quiz.quizId)
            .map(q => ({
              questionId: q.id,
              answer: answers[q.id]
            }));

          const response = await fetch(`${BASE_URL}/api/quizzes/${quiz.quizId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: quizAnswers
            })
          });

          if (response.ok) {
            const resultData = await response.json();
            allResults.push({
              ...resultData,
              todoTitle: quiz.todoTitle
            });
          } else {
            throw new Error(`퀴즈 ${quiz.todoTitle} 제출 실패`);
          }
        }

        // 모든 결과를 통합
        const totalScore = allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length;
        const allPassed = allResults.every(r => r.isPassed);
        const allReviews = allResults.filter(r => !r.isPassed && r.review).flatMap(r => r.review!);

        setResult({
          isPassed: allPassed,
          score: Math.round(totalScore),
          review: allReviews.length > 0 ? allReviews : undefined
        });
      } else {
        // 단일 퀴즈인 경우
        const response = await fetch(`${BASE_URL}/api/quizzes/${quizData.quizId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: Object.entries(answers).map(([questionId, answer]) => ({
              questionId: parseInt(questionId),
              answer
            }))
          })
        });

        if (response.ok) {
          const resultData = await response.json();
          setResult(resultData);
        } else {
          alert('퀴즈 제출에 실패했습니다.');
        }
      }
    } catch (err) {
      console.error('퀴즈 제출 오류:', err);
      alert('퀴즈 제출에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetrySubmit = () => {
    if (!result?.review) return;

    // 모든 반복학습 문제에 답변했는지 확인
    let totalRetryQuestions = 0;
    result.review.forEach((review, reviewIdx) => {
      review.retryQuestions.forEach((_, qIdx) => {
        totalRetryQuestions++;
      });
    });

    if (Object.keys(retryAnswers).length < totalRetryQuestions) {
      alert('모든 반복학습 문제에 답해주세요.');
      return;
    }

    // 답안 확인
    let correctCount = 0;
    result.review.forEach((review, reviewIdx) => {
      review.retryQuestions.forEach((q, qIdx) => {
        const key = `${reviewIdx}-${qIdx}`;
        if (retryAnswers[key] === q.correctAnswer) {
          correctCount++;
        }
      });
    });

    if (correctCount === totalRetryQuestions) {
      alert('모든 문제를 맞추셨습니다! 다음 단계로 진행합니다.');
      navigate('/todo');
    } else {
      alert(`${totalRetryQuestions}개 중 ${correctCount}개를 맞추셨습니다. 다시 시도해주세요.`);
    }
  };

  const handleGoBack = () => {
    navigate('/todo');
  };

  if (!quizData) {
    return (
      <>
        <Header />
        <S.Container>
          <S.LoadingText>퀴즈를 불러오는 중...</S.LoadingText>
        </S.Container>
      </>
    );
  }

  // 결과 화면 (합격)
  if (result?.isPassed) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Content>
            <S.ResultSection success>
              <S.ResultIcon>🎉</S.ResultIcon>
              <S.ResultTitle>축하합니다!</S.ResultTitle>
              <S.ResultScore>점수: {result.score}점</S.ResultScore>
              <S.ResultMessage>퀴즈를 통과하셨습니다.</S.ResultMessage>
              <S.SubmitButton onClick={handleGoBack}>
                TODO로 돌아가기
              </S.SubmitButton>
            </S.ResultSection>
          </S.Content>
        </S.Container>
      </>
    );
  }

  // 결과 화면 (불합격)
  if (result && !result.isPassed && result.review) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Content>
            <S.ResultSection success={false}>
              <S.ResultIcon>😅</S.ResultIcon>
              <S.ResultTitle>아쉽게도 불합격입니다</S.ResultTitle>
              <S.ResultScore>점수: {result.score}점</S.ResultScore>
              <S.ResultMessage>틀린 문제를 복습하고 반복학습 문제를 풀어보세요.</S.ResultMessage>
            </S.ResultSection>

            {result.review.map((review, reviewIdx) => (
              <S.ReviewSection key={reviewIdx}>
                <S.ReviewQuestion>
                  <S.QuestionLabel>문제</S.QuestionLabel>
                  <S.QuestionText>{review.question}</S.QuestionText>
                </S.ReviewQuestion>

                <S.AnswerComparison>
                  <S.AnswerBox wrong>
                    <S.AnswerLabel>❌ 내 답변</S.AnswerLabel>
                    <S.AnswerText>{review.userAnswer}</S.AnswerText>
                  </S.AnswerBox>
                  <S.AnswerBox correct>
                    <S.AnswerLabel>✅ 정답</S.AnswerLabel>
                    <S.AnswerText>{review.correctAnswer}</S.AnswerText>
                  </S.AnswerBox>
                </S.AnswerComparison>

                <S.Explanation>
                  <S.ExplanationLabel>💡 해설</S.ExplanationLabel>
                  <S.ExplanationText>{review.explanation}</S.ExplanationText>
                </S.Explanation>

                {review.retryQuestions.length > 0 && (
                  <S.RetrySection>
                    <S.RetrySectionTitle>🔄 반복학습 문제</S.RetrySectionTitle>
                    {review.retryQuestions.map((retryQ, qIdx) => (
                      <S.RetryQuestionBox key={qIdx}>
                        <S.QuestionText>{retryQ.question}</S.QuestionText>
                        <S.OptionList>
                          {retryQ.options.map((option, optIdx) => {
                            const key = `${reviewIdx}-${qIdx}`;
                            const isSelected = retryAnswers[key] === option;
                            return (
                              <S.OptionItem
                                key={optIdx}
                                selected={isSelected}
                                onClick={() => handleRetryAnswerSelect(key, option)}
                              >
                                <S.OptionRadio selected={isSelected} />
                                <S.OptionText>{option}</S.OptionText>
                              </S.OptionItem>
                            );
                          })}
                        </S.OptionList>
                      </S.RetryQuestionBox>
                    ))}
                  </S.RetrySection>
                )}
              </S.ReviewSection>
            ))}

            <S.ButtonGroup>
              <S.SubmitButton onClick={handleRetrySubmit}>
                반복학습 문제 제출
              </S.SubmitButton>
              <S.BackButton onClick={handleGoBack}>
                TODO로 돌아가기
              </S.BackButton>
            </S.ButtonGroup>
          </S.Content>
        </S.Container>
      </>
    );
  }

  // 퀴즈 문제 화면
  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.QuizHeader>
            <S.QuizTitle>오늘의 퀴즈</S.QuizTitle>
            <S.QuizProgress>
              {Object.keys(answers).length} / {quizData.questions.length}
            </S.QuizProgress>
          </S.QuizHeader>

          <S.QuestionList>
            {quizData.questions.map((question, index) => (
              <S.QuestionCard key={`${question.quizId}-${question.id}`}>
                {question.todoTitle && (
                  <S.TodoLabel>{question.todoTitle}</S.TodoLabel>
                )}
                <S.QuestionNumber>문제 {index + 1}</S.QuestionNumber>
                <S.QuestionText>{question.question}</S.QuestionText>
                
                <S.OptionList>
                  {question.options.map((option, optIdx) => {
                    const isSelected = answers[question.id] === option;
                    return (
                      <S.OptionItem
                        key={optIdx}
                        selected={isSelected}
                        onClick={() => handleAnswerSelect(question.id, option)}
                      >
                        <S.OptionRadio selected={isSelected} />
                        <S.OptionText>{option}</S.OptionText>
                      </S.OptionItem>
                    );
                  })}
                </S.OptionList>
              </S.QuestionCard>
            ))}
          </S.QuestionList>

          <S.ButtonGroup>
            <S.SubmitButton 
              onClick={handleSubmit}
              disabled={submitting || Object.keys(answers).length !== quizData.questions.length}
            >
              {submitting ? '제출 중...' : '제출하기'}
            </S.SubmitButton>
            <S.BackButton onClick={handleGoBack}>
              돌아가기
            </S.BackButton>
          </S.ButtonGroup>
        </S.Content>
      </S.Container>
    </>
  );
};

export default Quiz;
