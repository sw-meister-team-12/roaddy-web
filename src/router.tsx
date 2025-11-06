import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  RoadmapDuration,
} from './pages';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const roadmapId = localStorage.getItem('roadmap_id');
  
  if (!roadmapId) {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/roadmap" 
          element={<ProtectedRoute element={<RoadmapList />} />} 
        />
        <Route path="/" element={<RoadmapGenerate />} />
        <Route path="/roadmap/:id" element={<RoadmapDetail />} />
        <Route path="/level-test" element={<LevelTest />} />
        <Route path="/level-test/detail" element={<LevelTestDetail />} />
        <Route path="/roadmap-duration" element={<RoadmapDuration />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/quiz/:id" element={<Quiz />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/feedback/:week" element={<FeedbackDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;