import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  min-height: 100vh;
  width: 100%;
  padding-top: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 1160px;
  margin-top: 49px;
  padding-bottom: 100px;
`;

export const LoadingText = styled.div`
  font-family: 'Pretendard', sans-serif;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  padding: 100px 20px;
`;

export const ErrorText = styled.div`
  font-family: 'Pretendard', sans-serif;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #fe1b85;
  padding: 100px 20px;
`;

export const MilestoneSection = styled.div`
  background: linear-gradient(90deg, #fe1b85 0%, rgba(221, 41, 94, 0.6) 100%);
  border-radius: 12px;
  padding: 40px 50px;
  margin-bottom: 40px;
  color: white;
`;

export const MilestoneLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  opacity: 0.9;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const MilestoneTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
`;

export const TodoSection = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 40px 50px;
`;

export const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #efefef;
`;

export const TodoTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  color: #000;
  margin: 0;
`;

export const ProgressText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  color: #fe1b85;
`;

export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

export const TodoItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 30px;
  border-radius: 8px;
  background: ${({ completed }) => 
    completed ? '#f8f8f8' : '#fff'};
  border: 1px solid ${({ completed }) => 
    completed ? '#e1e1e1' : '#e1e1e1'};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ completed }) => 
      completed ? '#f8f8f8' : '#f6fbfc'};
    border-color: ${({ completed }) => 
      completed ? '#e1e1e1' : '#cacfce'};
  }
`;

export const TodoCheckbox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-top: 2px;
  accent-color: #fe1b85;
  flex-shrink: 0;
`;

export const TodoContent = styled.div`
  flex: 1;
`;

export const TodoItemTitle = styled.h3<{ completed: boolean }>`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: ${(props) => (props.completed ? '#999' : '#000')};
  margin: 0 0 10px 0;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  transition: all 0.2s ease;
`;

export const TodoDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #686868;
  margin: 0;
`;

export const QuizButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export const QuizButton = styled.button<{ disabled?: boolean }>`
  padding: 12px 50px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  color: white;
  background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : '#fe1b85')};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : '#dd295e')};
  }

  &:active {
    background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : '#c01850')};
  }
`;
