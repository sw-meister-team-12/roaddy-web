import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import { useRoadmapStore } from '../../store/roadmapStore';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: string; // 보너스 문제용 정답
}

interface QuizData {
  quizId: string;
  questions: Question[];
}

interface QuizItem {
  todoId: string;
  quizData: QuizData | null;
  isRetry?: boolean; // 보너스 문제 여부
}

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { todoIds } = location.state || {};
  const { currentWeek, currentDay, roadmapData, incrementDay } = useRoadmapStore();

  const [quizQueue, setQuizQueue] = useState<QuizItem[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!todoIds || todoIds.length === 0) {
      alert('퀴즈 정보가 없습니다.');
      navigate('/todo');
      return;
    }

    loadFirstQuiz();
  }, []);

  const loadFirstQuiz = async () => {
    if (!todoIds || todoIds.length === 0) return;

    try {
      setLoading(true);
      const firstTodoId = todoIds[0];
      const response = await fetch(`${BASE_URL}/api/todos/${firstTodoId}/quiz`);
      
      if (!response.ok) {
        throw new Error('퀴즈를 불러오는데 실패했습니다.');
      }

      const quizData = await response.json();
      
      // 초기 큐 설정: 첫 번째는 로드된 퀴즈, 나머지는 null
      const initialQueue: QuizItem[] = [
        { todoId: firstTodoId, quizData },
        ...todoIds.slice(1).map((id: string) => ({ todoId: id, quizData: null }))
      ];
      
      setQuizQueue(initialQueue);
    } catch (err) {
      console.error('퀴즈 로드 오류:', err);
      alert('퀴즈를 불러오는데 실패했습니다.');
      navigate('/todo');
    } finally {
      setLoading(false);
    }
  };

  const loadNextTodoQuiz = async (todoId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/todos/${todoId}/quiz`);
      if (!response.ok) {
        throw new Error('퀴즈를 불러오는데 실패했습니다.');
      }
      return await response.json();
    } catch (err) {
      console.error('퀴즈 로드 오류:', err);
      return null;
    }
  };

  const handleAnswerSelect = async (answer: string) => {
    if (isCorrect !== null) return; // 이미 답변한 경우
    
    setSelectedAnswer(answer);

    const currentQuizItem = quizQueue[currentQuizIndex];
    const currentQuiz = currentQuizItem.quizData!;
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];

    // 보너스 문제(retry)인 경우 API 호출 없이 바로 정답 체크
    if (currentQuizItem.isRetry && currentQuestion.correctAnswer) {
      const correct = answer === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      
      if (!correct) {
        setCorrectAnswer(currentQuestion.correctAnswer);
      }

      // 정답이면 1.5초 후 자동으로 넘어가기, 오답이면 수동으로 넘어가기
      if (correct) {
        setTimeout(() => {
          handleNext();
        }, 1500);
      }
      return;
    }

    // 일반 퀴즈는 API로 제출
    try {
      const response = await fetch(`${BASE_URL}/api/quizzes/${currentQuiz.quizId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: [{ questionId: currentQuestion.id, answer }]
        })
      });

      if (!response.ok) {
        throw new Error('답안 제출에 실패했습니다.');
      }

      const result = await response.json();
      
      // 정답 여부 표시
      setIsCorrect(result.isPassed);

      // 오답인 경우 정답, 설명 저장 및 추가 문제를 큐에 추가
      if (!result.isPassed && result.review && result.review[0]) {
        setCorrectAnswer(result.review[0].correctAnswer);
        setExplanation(result.review[0].explanation);
        
        // 추가 문제를 큐에 추가
        if (result.review[0].retryQuestions) {
          const retryQuestions = result.review[0].retryQuestions;
          
          const retryQuizItem: QuizItem = {
            todoId: `retry_${currentQuiz.quizId}_${Date.now()}`,
            isRetry: true,
            quizData: {
              quizId: `retry_${currentQuiz.quizId}`,
              questions: retryQuestions.map((q: any, idx: number) => ({
                id: idx + 1000,
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer
              }))
            }
          };

          setQuizQueue(prev => [
            ...prev.slice(0, currentQuizIndex + 1),
            retryQuizItem,
            ...prev.slice(currentQuizIndex + 1)
          ]);
        }
      } else {
        // 정답이면 1.5초 후 자동으로 넘어가기
        setTimeout(() => {
          handleNext();
        }, 1500);
      }

    } catch (err) {
      console.error('답안 제출 오류:', err);
      alert('답안 제출에 실패했습니다.');
      setSelectedAnswer(null);
    }
  };

  const handleNext = async () => {
    const currentQuiz = quizQueue[currentQuizIndex].quizData!;
    
    // 현재 퀴즈의 다음 문제가 있는지 확인
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      // 같은 퀴즈의 다음 문제로
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      setExplanation(null);
      setIsCorrect(null);
    } else {
      // 현재 퀴즈 완료, 다음 퀴즈로 이동
      if (currentQuizIndex < quizQueue.length - 1) {
        const nextQuizItem = quizQueue[currentQuizIndex + 1];
        
        // 다음 퀴즈가 일반 TODO 퀴즈인지 확인 (보너스 문제가 아닌 경우)
        const isNextTodoQuiz = !nextQuizItem.isRetry;
        
        // 다음 퀴즈가 아직 로드되지 않았으면 로드 (일반 TODO 퀴즈만)
        if (!nextQuizItem.quizData && isNextTodoQuiz) {
          setLoading(true);
          const quizData = await loadNextTodoQuiz(nextQuizItem.todoId);
          
          if (quizData) {
            // 다음 TODO 퀴즈로 넘어갈 때 큐 정리: 현재까지 완료한 퀴즈 제거
            const cleanedQueue = quizQueue.slice(currentQuizIndex + 1);
            cleanedQueue[0] = { 
              ...nextQuizItem, 
              quizData 
            };
            
            setQuizQueue(cleanedQueue);
            setCurrentQuizIndex(0); // 큐를 정리했으므로 인덱스를 0으로 리셋
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setCorrectAnswer(null);
            setExplanation(null);
            setIsCorrect(null);
            setLoading(false);
          } else {
            // 로드 실패 시 해당 퀴즈 건너뛰기
            setLoading(false);
            alert('다음 퀴즈를 불러오는데 실패했습니다.');
            
            // 그 다음 퀴즈가 있으면 계속 진행
            if (currentQuizIndex + 2 < quizQueue.length) {
              // 큐 정리하고 다음으로
              const cleanedQueue = quizQueue.slice(currentQuizIndex + 2);
              setQuizQueue(cleanedQueue);
              setCurrentQuizIndex(0);
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setCorrectAnswer(null);
              setExplanation(null);
              setIsCorrect(null);
            } else {
              // 모든 퀴즈 완료 - day 증가 후 피드백 페이지로 이동
              incrementDay();
              navigate(`/feedback/${currentWeek}/${currentDay}`);
            }
          }
        } else {
          // 이미 로드된 퀴즈 (보너스 문제)로 이동 - 큐 정리 없이 인덱스만 증가
          setCurrentQuizIndex(prev => prev + 1);
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
          setCorrectAnswer(null);
          setExplanation(null);
          setIsCorrect(null);
        }
      } else {
        // 모든 퀴즈 완료 - day 증가 후 피드백 페이지로 이동
        incrementDay();
        navigate(`/feedback/${currentWeek}/${currentDay}`);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <S.Container>
          <S.LoadingText>퀴즈를 불러오는 중...</S.LoadingText>
        </S.Container>
      </>
    );
  }

  if (quizQueue.length === 0 || !quizQueue[currentQuizIndex]?.quizData) {
    return (
      <>
        <Header />
        <S.Container>
          <S.LoadingText>퀴즈를 불러오는 중...</S.LoadingText>
        </S.Container>
      </>
    );
  }

  const currentQuiz = quizQueue[currentQuizIndex].quizData!;
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const totalQuestions = quizQueue.reduce((sum, item) => 
    sum + (item.quizData?.questions.length || 0), 0
  );
  const currentQuestionNumber = quizQueue
    .slice(0, currentQuizIndex)
    .reduce((sum, item) => sum + (item.quizData?.questions.length || 0), 0) + currentQuestionIndex + 1;

  // 현재 주차의 타이틀 가져오기
  const currentWeekData = roadmapData?.weeks.find(w => w.week === currentWeek);
  const rawTitle = currentWeekData?.title || '학습 진행 중';
  // "1주차: " 같은 접두사 제거
  const weekTitle = rawTitle.replace(/^\d+주차:\s*/, '');

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.QuizHeader>
            <S.WeekBadge>Week{currentWeek}</S.WeekBadge>
            <S.QuizTitle>{weekTitle}</S.QuizTitle>
          </S.QuizHeader>

          <S.QuestionSection>
            <S.QuestionTitle>Q{currentQuestionNumber}. {currentQuestion.question}</S.QuestionTitle>
            <S.ProgressText>{currentQuestionNumber}/{totalQuestions}</S.ProgressText>
          </S.QuestionSection>

          <S.OptionsGrid>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = correctAnswer === option;
              const showCorrect = isCorrect === false && isCorrectOption;
              
              return (
                <S.OptionCard
                  key={index}
                  selected={isSelected}
                  isCorrect={isSelected ? isCorrect : null}
                  showCorrect={showCorrect}
                  disabled={isCorrect !== null}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <S.OptionNumber>{index + 1}.</S.OptionNumber>
                  <S.OptionText>{option}</S.OptionText>
                  {isSelected && isCorrect !== null && (
                    <S.ResultIcon isCorrect={isCorrect}>
                      {isCorrect ? '✓' : '✗'}
                    </S.ResultIcon>
                  )}
                  {showCorrect && (
                    <S.ResultIcon isCorrect={true}>
                      ✓
                    </S.ResultIcon>
                  )}
                </S.OptionCard>
              );
            })}
          </S.OptionsGrid>

          {selectedAnswer && isCorrect === false && (
            <>
              <S.AnswerFeedbackRow>
                <S.CorrectAnswerBadge>
                  <S.BadgeLabel>정답</S.BadgeLabel>
                  <S.BadgeAnswer>{correctAnswer}</S.BadgeAnswer>
                </S.CorrectAnswerBadge>
                <S.ErrorMessage>틀린 문제는 반복 학습이 진행됩니다!</S.ErrorMessage>
              </S.AnswerFeedbackRow>
                
              {explanation && !quizQueue[currentQuizIndex].isRetry && (
                <S.ExplanationSection>
                  <S.ExplanationLabel>💡 해설</S.ExplanationLabel>
                  <S.ExplanationText>{explanation}</S.ExplanationText>
                </S.ExplanationSection>
              )}

              <S.NextButton onClick={handleNext}>
                넘어가기
              </S.NextButton>
            </>
          )}

          {(!selectedAnswer || isCorrect === null || isCorrect === true) && (
            <S.GuideText>
              카드를 클릭 하거나 카드 번호에 해당하는 숫자 키를 눌러 답안을 선택하세요
            </S.GuideText>
          )}
        </S.Content>
      </S.Container>
    </>
  );
};

export default Quiz;
