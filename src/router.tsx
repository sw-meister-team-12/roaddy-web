import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Quiz,
  Todo,
  RoadmapGenerate,
  FeedbackList,
  FeedbackDetail,
  LevelTest,
  LevelTestDetail,
  RoadmapSimple,
  DurationSelect,
  RoadmapView,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/roadmap" element={<RoadmapView />} />
        <Route path="/" element={<RoadmapGenerate />} />
        <Route path="/roadmap/:id" element={<RoadmapView />} />
        <Route path="/roadmap-simple" element={<RoadmapSimple />} />
        <Route path="/level-test" element={<LevelTest />} />
        <Route path="/level-test/detail" element={<LevelTestDetail />} />
        <Route path="/duration-select" element={<DurationSelect />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/quiz" element={<Quiz />} />
        <Route path="/todo/quiz/:id" element={<Quiz />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/feedback/:week/:day" element={<FeedbackDetail />} />
        <Route path="/feedback/:week" element={<FeedbackDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;