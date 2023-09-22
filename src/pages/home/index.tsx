import useLogin from "@/hooks/useLogin";
import { Outlet } from "react-router-dom";

export default function Home() {
  useLogin({
    to: "/dashboard",
    redirectIfLoggedIn: true,
    redirectIfNotLoggedIn: false,
  });

  return (
    <main className="home">
      <Outlet />
    </main>
  );
}
