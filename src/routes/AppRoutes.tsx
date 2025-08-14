import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import { Button } from "../components/ui/Button/Button";
import { useAuth } from "../hooks/useAuth";

export default function AppRoutes() {
  function MenuAdmin() {
    const { logout } = useAuth();
    return (
      <div>
        <h1>Menu</h1>
        <Button onClick={() => logout()}>Sair</Button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<LoginPage />} />
        <Route path={paths.login} element={<LoginPage />} />
        <Route
          path={paths.menuAdmin}
          element={
            <ProtectedRoute roles={["admin"]}>
              <MenuAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
