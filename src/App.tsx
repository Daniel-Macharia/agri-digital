import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import NotFound from "./components/common/exceptions/NotFound";
import AuthLayout from "./components/common/layout/AuthLayout";
import HomePageLayout from "./components/common/layout/HomePageLayout";
import HomePage from "./components/home/Home";
import { APP_ROUTES } from "./lib/Routes";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

function App() {
  return (
    <BrowserRouter basename={baseUrl}>
      <Routes>
        <Route
          path={APP_ROUTES.HOMEPAGE}
          element={<HomePageLayout element={<HomePage />} />}
        />
        <Route
          path={APP_ROUTES.AUTH.LOGIN}
          element={<AuthLayout element={<Login />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
