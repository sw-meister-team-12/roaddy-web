import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  RoadmapList,
  Quiz,
  Todo,
  RoadmapGenerate,
  RoadmapDetail,
  FeedbackList,
  FeedbackDetail,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/roadmap" element={<RoadmapList />} />
        <Route path="/roadmap/generate" element={<RoadmapGenerate />} />
        <Route path="/roadmap/:id" element={<RoadmapDetail />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/quiz/:id" element={<Quiz />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/feedback/:id" element={<FeedbackDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;