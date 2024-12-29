import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import BlogHome from "./Components/Blog/BlogHome";
import { useEffect, useState } from "react";
import AuthService from "./Components/Controller/AuthService";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import UserDashboard from "./Components/Dashboard/UserDashboard";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const toggleIsAuthenticated = () => {
    setIsAuthenticated(!isAuthenticated);
  }
  const checkAuthenticated = async () => {
    try {
      await AuthService.IsAuthenticatedService().then((response) => {
        if (response.message === "Authenticated user") {
          setIsAuthenticated(true);
          setName(response.data.name);
        } else {
          setIsAuthenticated(false);
        }
      }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    checkAuthenticated()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} name={name} onAutheChange={toggleIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:navLinkName" element={<BlogHome />} />
          <Route
            path="/:usernameId/dashboard"
            element={isAuthenticated ? <UserDashboard /> : <Navigate to="/home" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
