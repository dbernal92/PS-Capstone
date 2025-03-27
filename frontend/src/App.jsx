import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Main from '../components/Main';
import Dashboard from '../pages/Dashboard';
import WorkoutLog from "../pages/WorkoutLog";
import ProgressTracker from "../pages/ProgressTracker";
import Notes from "../pages/Notes";
import Settings from "../pages/Settings";

import './App.css';
import '../src/styles/layout.css';

function App() {
  const theme = localStorage.getItem("theme") || "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="/workouts" element={<WorkoutLog />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;