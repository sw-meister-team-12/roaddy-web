import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import * as S from './style';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Day {
  day: number;
  title: string;
}

interface WeekData {
  week: number;
  milestone: string;
  days: Day[];
}

interface Todo {
  todoId: string;
  session: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface DayData {
  week: number;
  day: number;
  todos: Todo[];
}

const Todo = () => {
  const navigate = useNavigate();
  const [weekData, setWeekData] = useState<WeekData | null>(null);
  const [dayData, setDayData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // 임시 값
  const roadmapId = 2;
  const weekNumber = 1;
  const dayNumber = 1; // 오늘 해야 할 ToDo라고 가정

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 주차 정보 조회
      const weekResponse = await fetch(
        `${BASE_URL}/api/roadmaps/${roadmapId}/weeks/${weekNumber}`
      );
      if (!weekResponse.ok) {
        throw new Error('주차 정보를 불러오는데 실패했습니다.');
      }
      const weekResult = await weekResponse.json();
      setWeekData(weekResult);

      // 특정 일차의 TODO 목록 조회
      const dayResponse = await fetch(
        `${BASE_URL}/api/roadmaps/${roadmapId}/weeks/${weekNumber}/days/${dayNumber}`
      );
      if (!dayResponse.ok) {
        throw new Error('TODO 목록을 불러오는데 실패했습니다.');
      }
      const dayResult = await dayResponse.json();
      setDayData(dayResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      console.error('데이터 로드 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTodoToggle = (todoId: string) => {
    if (!dayData) return;

    setDayData({
      ...dayData,
      todos: dayData.todos.map((todo) =>
        todo.todoId === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    });
  };

  const handleQuizClick = async () => {
    if (!dayData || dayData.todos.length === 0) return;

    setLoadingQuiz(true);

    try {
      // 모든 TODO의 퀴즈 데이터를 가져옴
      const allQuizzes = [];
      const quizIds = [];

      for (const todo of dayData.todos) {
        const response = await fetch(`${BASE_URL}/api/todos/${todo.todoId}/quiz`);
        
        if (response.ok) {
          const quizData = await response.json();
          allQuizzes.push({
            todoId: todo.todoId,
            todoTitle: todo.title,
            quizId: quizData.quizId,
            questions: quizData.questions
          });
          quizIds.push(quizData.quizId);
        } else {
          console.error(`[${todo.title}] 퀴즈 조회 실패:`, response.status);
        }
      }

      if (allQuizzes.length === 0) {
        alert('퀴즈를 불러오는데 실패했습니다.');
        setLoadingQuiz(false);
        return;
      }

      // 모든 퀴즈 문제를 하나로 합침
      const combinedQuestions = allQuizzes.flatMap((quiz, quizIndex) => 
        quiz.questions.map((question: any) => ({
          ...question,
          todoTitle: quiz.todoTitle,
          quizId: quiz.quizId,
          originalQuizIndex: quizIndex
        }))
      );

      // 통합된 퀴즈 데이터로 이동
      navigate(`/todo/quiz/combined`, { 
        state: { 
          quizData: {
            quizId: 'combined',
            quizIds: quizIds,
            allQuizzes: allQuizzes,
            questions: combinedQuestions
          },
          todoInfo: {
            week: dayData.week,
            day: dayData.day
          }
        } 
      });
    } catch (err) {
      console.error('퀴즈 조회 오류:', err);
      alert('퀴즈를 불러오는데 실패했습니다.');
    } finally {
      setLoadingQuiz(false);
    }
  };

  // 모든 todo가 완료되었는지 확인
  const allCompleted = dayData?.todos.every((todo) => todo.isCompleted) ?? false;
  const hasAnyTodo = (dayData?.todos.length ?? 0) > 0;

  if (loading) {
    return (
      <>
        <Header />
        <S.Container>
          <S.LoadingText>데이터를 불러오는 중...</S.LoadingText>
        </S.Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <S.Container>
          <S.ErrorText>{error}</S.ErrorText>
        </S.Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          {weekData && (
            <S.MilestoneSection>
              <S.MilestoneLabel>Week {weekData.week} Milestone</S.MilestoneLabel>
              <S.MilestoneTitle>{weekData.milestone}</S.MilestoneTitle>
            </S.MilestoneSection>
          )}

          {dayData && (
            <S.TodoSection>
              <S.TodoHeader>
                <S.TodoTitle>오늘 해야 할 TODO (Day {dayData.day})</S.TodoTitle>
                <S.ProgressText>
                  {dayData.todos.filter((todo) => todo.isCompleted).length} / {dayData.todos.length}
                </S.ProgressText>
              </S.TodoHeader>

              <S.TodoList>
                {dayData.todos.map((todo) => (
                  <S.TodoItem key={todo.todoId} completed={todo.isCompleted}>
                    <S.TodoCheckbox
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleTodoToggle(todo.todoId)}
                    />
                    <S.TodoContent>
                      <S.TodoItemTitle completed={todo.isCompleted}>
                        Session {todo.session}: {todo.title}
                      </S.TodoItemTitle>
                      <S.TodoDescription>{todo.description}</S.TodoDescription>
                    </S.TodoContent>
                  </S.TodoItem>
                ))}
              </S.TodoList>

              <S.QuizButtonContainer>
                <S.QuizButton
                  disabled={!allCompleted || !hasAnyTodo || loadingQuiz}
                  onClick={handleQuizClick}
                >
                  {loadingQuiz ? '퀴즈 불러오는 중...' : '퀴즈 풀러가기'}
                </S.QuizButton>
              </S.QuizButtonContainer>
            </S.TodoSection>
          )}
        </S.Content>
      </S.Container>
    </>
  );
};

export default Todo;
