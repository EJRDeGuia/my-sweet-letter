import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, go to archive
    const isAuth = localStorage.getItem("letters-auth");
    if (isAuth) {
      navigate("/archive");
    }
  }, [navigate]);

  return <Login />;
};

export default Index;
