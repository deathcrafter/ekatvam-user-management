import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin({
  redirectIfLoggedIn = false,
  redirectIfNotLoggedIn = true,
  to = "/dashboard",
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      if (redirectIfLoggedIn) {
        navigate(to);
      }
    } else {
      setLoggedIn(false);
      if (redirectIfNotLoggedIn) {
        navigate("/");
      }
    }
  }, []);

  return loggedIn;
}
