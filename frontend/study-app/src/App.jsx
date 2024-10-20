import "./App.css";

import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./layout";

import Login from "./Pages/login";
import Home from "./Pages/home";
import About from "./Pages/about";
import { Register } from "./Pages/register";
import { AuthProvider, useAuth } from "./AuthContext";
import { AddRoom } from "./Pages/addroom";
import { ViewRooms } from "./Pages/viewrooms";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/viewrooms/"
              element={<ProtectedRoute component={ViewRooms} />}
            />
            <Route
              path="/addroom"
              element={<ProtectedRoute component={AddRoom} />}
            />{" "}
            <Route path="/register" element={<Register />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
const ProtectedRoute = ({ component: Component }) => {
  const { userId } = useAuth();

  return userId ? <Component userId={userId} /> : <Navigate to="/login" />;
};

export default App;
