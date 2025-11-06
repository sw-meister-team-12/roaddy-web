import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/common";
import { useSurveyStore } from "../../store/surveyStore";
import * as S from "./style";

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
  const setSurveyId = useSurveyStore((state) => state.setSurveyId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!surveyData || !surveyData.surveyId || !surveyData.questions) {
      alert("설문 데이터가 없습니다. 로드맵 생성 페이지로 이동합니다.");
      navigate("/");
    } else {
      // surveyId를 전역 상태에 저장
      setSurveyId(surveyData.surveyId);
    }
  }, [surveyData, navigate, setSurveyId]);

  if (!surveyData) {
    return null;
  }

  const currentQuestion = surveyData.questions[currentQuestionIndex];
  const totalQuestions = surveyData.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) {
      alert("답변을 선택해주세요.");
      return;
    }

    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!answers[currentQuestion.id]) {
      alert("답변을 선택해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = `${BASE_URL}/api/surveys/${surveyData.surveyId}`;

      const answersArray: Answer[] = surveyData.questions.map((question) => ({
        questionId: question.id,
        answer: answers[question.id],
      }));

      console.log("요청 URL:", url);
      console.log("요청 데이터:", { answers: answersArray });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answersArray }),
      });

      console.log("응답 상태:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("에러 응답:", errorText);
        throw new Error(`설문 제출에 실패했습니다. (${response.status})`);
      }

      const data = await response.json();
      console.log("설문 제출 성공:", data);

      // 기간 선택 페이지로 이동
      navigate("/duration-select");
    } catch (error) {
      console.error("설문 제출 오류:", error);
      alert("설문 제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.PageTitle>기초 진단</S.PageTitle>

          <S.ProgressSection>
            <S.ProgressTitle>{currentQuestion.question}</S.ProgressTitle>
            <S.ProgressCount>
              {currentQuestionIndex + 1}/{totalQuestions}
            </S.ProgressCount>
          </S.ProgressSection>

          <S.ProgressBarContainer>
            <S.ProgressFill progress={progress} />
          </S.ProgressBarContainer>

          <S.QuestionContainer>
            <S.QuestionText>{currentQuestion.question}</S.QuestionText>

            <S.OptionsContainer>
              {currentQuestion.options.map((option, index) => (
                <S.OptionButton
                  key={option}
                  selected={answers[currentQuestion.id] === option}
                  onClick={() => handleOptionSelect(option)}
                >
                  <S.OptionNumber
                    selected={answers[currentQuestion.id] === option}
                  >
                    {index + 1}
                  </S.OptionNumber>
                  <S.OptionText>{option}</S.OptionText>
                </S.OptionButton>
              ))}
            </S.OptionsContainer>
          </S.QuestionContainer>

          <S.ButtonSection>
            <S.BackButton
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
            >
              돌아가기
            </S.BackButton>
            <S.NextButton
              onClick={handleNext}
              disabled={isSubmitting || !answers[currentQuestion.id]}
            >
              {isSubmitting ? "제출 중..." : isLastQuestion ? "제출" : "다음"}
            </S.NextButton>
          </S.ButtonSection>
        </S.Content>
      </S.Container>
    </>
  );
};

export default LevelTest;
