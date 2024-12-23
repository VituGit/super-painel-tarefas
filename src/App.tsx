import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/tasks"
          element={isLoggedIn ? <TasksPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
