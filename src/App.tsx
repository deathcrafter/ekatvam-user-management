import { useRoutes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/home/login";
import Dashboard from "./pages/dashboard";
import User from "./pages/dashboard/user";
import Register from "./pages/home/register";
import CreateUser from "./pages/create";

function Router() {
  const router = useRoutes([
    {
      path: "",
      element: <Home />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "dashboard/:id",
      element: <User />,
    },
    {
      path: "create",
      element: <CreateUser />,
    },
  ]);

  return router;
}

function App() {
  return <Router />;
}

export default App;
