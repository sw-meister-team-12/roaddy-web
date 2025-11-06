import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  RoadmapList,
  Quiz,
  Todo,
  RoadmapGenerate,
  RoadmapDetail,
  FeedbackList,
  FeedbackDetail,
  LevelTest,
  LevelTestDetail,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/roadmap" element={<RoadmapList />} />
        <Route path="/" element={<RoadmapGenerate />} />
        <Route path="/roadmap/:id" element={<RoadmapDetail />} />
        <Route path="/level-test" element={<LevelTest />} />
        <Route path="/level-test/detail" element={<LevelTestDetail />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/quiz/:id" element={<Quiz />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/feedback/:week" element={<FeedbackDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;