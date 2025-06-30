import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./common/exceptions/NotFound";
import AuthLayout from "./common/layout/AuthLayout";
import HomePageLayout from "./common/layout/HomePageLayout";
import { APP_ROUTES } from "./lib/Routes";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

function App() {
  return (
    <BrowserRouter basename={baseUrl}>
      <Routes>
        <Route
          path={APP_ROUTES.HOMEPAGE}
          element={<HomePageLayout />}
        />
        <Route
          path={APP_ROUTES.AUTH.LOGIN}
          element={<AuthLayout />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
