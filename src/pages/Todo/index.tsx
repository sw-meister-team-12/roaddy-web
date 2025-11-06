import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common';
import { useRoadmapStore } from '../../store/roadmapStore';
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
  const { roadmapId, currentWeek, currentDay } = useRoadmapStore();
  const hasAlerted = useRef(false);
  
  const [weekData, setWeekData] = useState<WeekData | null>(null);
  const [dayData, setDayData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 로드맵이 없으면 알럿 띄우고 생성 페이지로 이동 (한 번만)
    if (!roadmapId && !hasAlerted.current) {
      hasAlerted.current = true;
      alert('로드맵을 생성하세요');
      navigate('/');
      return;
    }

    if (roadmapId) {
      fetchData();
    }
  }, [roadmapId, currentWeek, currentDay]);

  const fetchData = async () => {
    if (!roadmapId) return;

    try {
      setLoading(true);
      setError(null);

      // 주차 정보 조회
      const weekResponse = await fetch(
        `${BASE_URL}/api/roadmaps/${roadmapId}/weeks/${currentWeek}`
      );
      if (!weekResponse.ok) {
        throw new Error('주차 정보를 불러오는데 실패했습니다.');
      }
      const weekResult = await weekResponse.json();
      setWeekData(weekResult);

      // 현재 주차/일차의 TODO 목록 조회
      const dayResponse = await fetch(
        `${BASE_URL}/api/roadmaps/${roadmapId}/weeks/${currentWeek}/days/${currentDay}`
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
    if (!dayData) return;

    // 모든 todo에 대해 퀴즈 조회
    for (const todo of dayData.todos) {
      try {
        const response = await fetch(`${BASE_URL}/api/todos/${todo.todoId}/quiz`);
        if (response.ok) {
          const quizData = await response.json();
          console.log(`[${todo.title}] 퀴즈 데이터:`, quizData);
        } else {
          console.error(`[${todo.title}] 퀴즈 조회 실패:`, response.status);
        }
      } catch (err) {
        console.error(`[${todo.title}] 퀴즈 조회 오류:`, err);
      }
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
                  <S.TodoItem 
                    key={todo.todoId} 
                    completed={todo.isCompleted}
                    onClick={() => handleTodoToggle(todo.todoId)}
                  >
                    <S.TodoCheckbox
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleTodoToggle(todo.todoId)}
                      onClick={(e) => e.stopPropagation()}
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
                  disabled={!allCompleted || !hasAnyTodo}
                  onClick={handleQuizClick}
                >
                  퀴즈 풀러가기
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
