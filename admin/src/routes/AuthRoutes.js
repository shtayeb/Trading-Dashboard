import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/404/NotFound";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const AuthRoutes = () => {
  const currentUser = useSelector(
    (state) => state.persistedReducer.currentUser
  );
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={currentUser ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
};

export default AuthRoutes;
