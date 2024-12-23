import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute redirectTo="/login"><TasksPage /></PrivateRoute>} />
          <Route path="/login" element={<PublicRoute redirectTo="/tasks"><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<PrivateRoute redirectTo="/login"><TasksPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children, redirectTo }: { children: JSX.Element; redirectTo: string }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

const PublicRoute = ({ children, redirectTo }: { children: JSX.Element; redirectTo: string }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

export default App;
