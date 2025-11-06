# API 명세서

## 1. 목표 설정 및 설문 생성

### POST /api/goals

사용자의 최종 목표를 입력받아 수준 파악을 위한 설문을 생성합니다.

**Request**

```json
{
  "goal": "풀스택 개발자가 되고 싶어요"
}

```

**Response**

```json
{
  "surveyId": "survey_123",
  "questions": [
    {
      "id": 1,
      "question": "HTML/CSS로 웹페이지를 만들어본 경험이 있나요?",
      "options": ["전혀 없음", "기본 페이지 제작 가능", "반응형 웹 제작 가능"]
    }
  ]
}

```

---

## 2. 설문 결과 제출

### POST /api/surveys/{surveyId}

설문 결과를 제출합니다.

**Request**

```json
{
  "answers": [
    { "questionId": 1, "answer": "기본 페이지 제작 가능" }
  ]
}

```

**Response**

```json
{
  "level": "초급"
}

```

---

## 3. 로드맵 생성

### POST /api/roadmaps

로드맵을 생성합니다. duration은 "auto" 또는 "24" 같은 숫자 문자열로 지정 가능합니다.

**Request**

```json
{
  "surveyId": "survey_123",
  "duration": "auto"
}

```

**Response**

```json
{
  "roadmapId": "roadmap_123",
  "totalWeeks": 12,
  "milestones": [
    {
      "week": 1,
      "title": "HTML/CSS 기초 마스터",
      "description": "시맨틱 태그와 Flexbox 활용",
      "days": [
        {
          "day": 1,
          "title": "HTML 기본 구조"
        },
        {
          "day": 2,
          "title": "CSS 선택자"
        },
        {
          "day": 3,
          "title": "Flexbox 레이아웃"
        },
        {
          "day": 4,
          "title": "반응형 웹 디자인"
        },
        {
          "day": 5,
          "title": "시맨틱 태그 활용"
        },
        {
          "day": 6,
          "title": "CSS Grid 시스템"
        },
        {
          "day": 7,
          "title": "프로젝트: 랜딩 페이지 제작"
        }
      ]
    }
  ]
}

```

---

## 4. 주간 정보 조회

### GET /api/roadmaps/{roadmapId}/weeks/{weekNumber}

특정 주차의 일별 정보를 조회합니다.

**Response**

```json
{
  "week": 1,
  "milestone": "HTML/CSS 기초 마스터",
  "days": [
    {
      "day": 1,
      "title": "HTML 기본 구조"
    },
    {
      "day": 2,
      "title": "CSS 선택자"
    }
  ]
}

```

---

## 5. 일별 TODO 조회

### GET /api/roadmaps/{roadmapId}/weeks/{weekNumber}/days/{dayNumber}

특정 일차의 TODO 목록을 조회합니다.

**Response**

```json
{
  "week": 1,
  "day": 1,
  "todos": [
    {
      "todoId": "todo_1",
      "session": 1,
      "title": "HTML 기본 구조 학습",
      "description": "HTML 문서의 기본 구조와 필수 태그 이해하기",
      "isCompleted": false
    },
    {
      "todoId": "todo_2",
      "session": 2,
      "title": "시맨틱 태그 실습",
      "description": "header, nav, main 등 시맨틱 태그 활용",
      "isCompleted": false
    }
  ]
}

```

---

## 6. 퀴즈 조회

### GET /api/todos/{todoId}/quiz

특정 TODO에 대한 퀴즈를 조회합니다.

**Response**

```json
{
  "quizId": "quiz_123",
  "questions": [
    {
      "id": 1,
      "question": "HTML 문서의 루트 요소는?",
      "options": ["<body>", "<html>", "<head>"]
    }
  ]
}

```

---

## 7. 퀴즈 제출

### POST /api/quizzes/{quizId}

퀴즈 답안을 제출합니다.

**Request**

```json
{
  "answers": [
    { "questionId": 1, "answer": "<html>" }
  ]
}

```

**Response (합격 시)**

```json
{
  "isPassed": true,
  "score": 100
}

```

**Response (불합격 시 - 풀이 및 반복학습 문제 포함)**

```json
{
  "isPassed": false,
  "score": 60,
  "review": [
    {
      "question": "HTML 문서의 루트 요소는?",
      "userAnswer": "<body>",
      "correctAnswer": "<html>",
      "explanation": "<html> 태그는 HTML 문서의 최상위 루트 요소입니다...",
      "retryQuestions": [
        {
          "question": "유사 문제 1",
          "options": ["선택지1", "선택지2", "선택지3", "선택지4"],
          "correctAnswer": "정답"
        },
        {
          "question": "유사 문제 2",
          "options": ["선택지1", "선택지2", "선택지3", "선택지4"],
          "correctAnswer": "정답"
        }
      ]
    }
  ]
}

```

---

## 8. 일일 피드백 조회

### GET /api/roadmaps/{roadmapId}/weeks/{weekNumber}/days/{dayNumber}/feedback

특정 일차의 피드백을 조회합니다. (오늘 학습 내용 요약 + 내일 학습 미리보기 + 복습 방법)

**Response**

```json
{
  "day": 1,
  "summary": "오늘은 HTML 기본 구조를 학습했습니다",
  "completionRate": 100,
  "tomorrowPreview": "내일은 CSS 선택자를 배웁니다",
  "reviewSuggestions": ["HTML 태그를 직접 작성해보세요", "코드를 손으로 다시 작성해보세요"]
}

```

---

## 9. 전체 피드백 조회 (리포트)

### GET /api/roadmaps/{roadmapId}/feedbacks

모든 일일 피드백을 조회합니다.

**Response**

```json
{
  "feedbacks": [
    {
      "id": 1,
      "week": 1,
      "day": 1,
      "summary": "오늘 학습 요약",
      "completionRate": 100,
      "reviewSuggestions": ["복습 방법1", "복습 방법2"],
      "tomorrowPreview": "내일 학습 내용",
      "createdAt": "2025-11-06T10:00:00Z"
    }
  ]
}

```

---

## 10. 진행 상황 조회

### GET /api/roadmaps/{roadmapId}

전체 로드맵 진행 상황을 조회합니다.

**Response**

```json
{
  "currentWeek": 1,
  "currentDay": 3,
  "totalWeeks": 12,
  "completedSessions": 5,
  "totalSessions": 168
}

```