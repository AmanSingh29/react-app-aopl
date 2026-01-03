import { Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import AuthScreen from "./pages/AuthScreen";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MobileHeader />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="flex-grow-1">{children}</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthScreen />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LayoutWithSidebar>
              <HomeScreen />
            </LayoutWithSidebar>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
