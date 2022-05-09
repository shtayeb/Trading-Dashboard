import "./App.css";
import { useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import axios from "axios";
import HomeRoutes from "./routes/HomeRoutes";
import AuthRoutes from "./routes/AuthRoutes";

function App() {
  const currentUser = useSelector(
    (state) => state.persistedReducer.currentUser
  );

  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  axios.defaults.headers["token"] = `Bearer ${currentUser?.accessToken}`;

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={currentUser ? <HomeRoutes /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/auth/*"
          element={currentUser ? <Navigate to="/" /> : <AuthRoutes />}
        />
      </Routes>
    </Router>
  );
}

export default App;
