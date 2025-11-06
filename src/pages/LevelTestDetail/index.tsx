import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/common";
import * as S from "./style";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 정답의 인덱스 (0-based)
}

// 데모용 객관식 문제 데이터
const DEMO_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "HTML에서 제목을 나타내는 가장 큰 크기의 태그는 무엇인가요?",
    options: ["<title>", "<h1>", "<header>", "<head>"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "CSS에서 요소의 배경색을 변경하는 속성은 무엇인가요?",
    options: ["color", "background-color", "bg-color", "bgcolor"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "JavaScript에서 변수를 선언하는 키워드가 아닌 것은?",
    options: ["var", "let", "const", "int"],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: "웹 브라우저에서 HTML, CSS, JavaScript를 처리하는 것을 무엇이라고 하나요?",
    options: ["서버", "데이터베이스", "렌더링", "컴파일"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "다음 중 프로그래밍 언어가 아닌 것은?",
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: 2,
  },
];

const LevelTestDetail = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [level, setLevel] = useState("");

  const currentQuestion = DEMO_QUESTIONS[currentQuestionIndex];
  const totalQuestions = DEMO_QUESTIONS.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleStartTest = () => {
    setShowIntro(false);
  };

  const handleSkip = () => {
    navigate("/roadmap");
  };

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
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

  const calculateLevel = () => {
    let correctCount = 0;
    DEMO_QUESTIONS.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = (correctCount / totalQuestions) * 100;

    if (percentage >= 80) {
      return "상";
    } else if (percentage >= 60) {
      return "중상";
    } else if (percentage >= 40) {
      return "중";
    } else if (percentage >= 20) {
      return "초급";
    } else {
      return "입문";
    }
  };

  const handleSubmit = () => {
    if (answers[currentQuestion.id] === undefined) {
      alert("답변을 선택해주세요.");
      return;
    }

    const calculatedLevel = calculateLevel();
    setLevel(calculatedLevel);
    setIsSubmitted(true);
  };

  const getCorrectCount = () => {
    let correctCount = 0;
    DEMO_QUESTIONS.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  // 인트로 화면
  if (showIntro) {
    return (
      <>
        <Header />
        <S.Container>
          <S.IntroContent>
            <S.IntroIcon className="material-symbols-rounded" style={{ fontVariationSettings: "'FILL' 1"}}>info</S.IntroIcon>
            <S.IntroTitle>데모 버전 안내</S.IntroTitle>
            <S.IntroDescription>
              이 테스트는 데모용 버전입니다.
              <br />
              객관식 문제를 통해 현재 레벨을 판단합니다.
              <br />
              <br />
              테스트를 진행하시겠습니까?
            </S.IntroDescription>
            <S.IntroButtonGroup>
              <S.IntroSkipButton onClick={handleSkip}>
                스킵하기
              </S.IntroSkipButton>
              <S.IntroStartButton onClick={handleStartTest}>
                테스트 시작
              </S.IntroStartButton>
            </S.IntroButtonGroup>
          </S.IntroContent>
        </S.Container>
      </>
    );
  }

  // 결과 화면
  if (isSubmitted) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Content>
            <S.PageTitle>레벨 테스트 결과</S.PageTitle>

            <S.ResultContainer>
              <S.ResultTitle>당신의 레벨은</S.ResultTitle>
              <S.ResultLevel>{level}</S.ResultLevel>
              <S.ResultScore>
                {getCorrectCount()} / {totalQuestions} 문제 정답
              </S.ResultScore>
              <S.ResultDescription>
                {level === "상" &&
                  "뛰어난 실력입니다! 고급 과정을 추천드립니다."}
                {level === "중상" &&
                  "좋은 실력입니다! 중급 이상 과정이 적합합니다."}
                {level === "중" && "기본기가 탄탄합니다! 중급 과정을 추천합니다."}
                {level === "초급" &&
                  "기초를 다지는 중입니다! 초급 과정부터 차근차근 시작하세요."}
                {level === "입문" &&
                  "처음 시작하시는군요! 입문 과정부터 천천히 학습하세요."}
              </S.ResultDescription>
              <S.ResultButton onClick={() => navigate("/roadmap")}>
                로드맵 보러가기
              </S.ResultButton>
            </S.ResultContainer>
          </S.Content>
        </S.Container>
      </>
    );
  }

  // 테스트 진행 화면
  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.PageTitle>레벨 테스트 (데모)</S.PageTitle>

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
                  key={index}
                  selected={answers[currentQuestion.id] === index}
                  onClick={() => handleOptionSelect(index)}
                >
                  <S.OptionNumber
                    selected={answers[currentQuestion.id] === index}
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
              disabled={answers[currentQuestion.id] === undefined}
            >
              {isLastQuestion ? "제출" : "다음"}
            </S.NextButton>
          </S.ButtonSection>
        </S.Content>
      </S.Container>
    </>
  );
};

export default LevelTestDetail;

