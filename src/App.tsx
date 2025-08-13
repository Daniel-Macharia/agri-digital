import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "./common/exceptions/NotFound";
import AuthLayout from "./common/layout/AuthLayout";
import HomePageLayout from "./common/layout/HomePageLayout";
import { APP_ROUTES } from "./lib/Routes";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

function App() {
  useEffect(() => {
    const notifyOffline = () =>
      toast.warn("You are offline. Most features will not work", {
        toastId: "offline",
      });

    const notifyOnline = () => toast.dismiss("offline");

    if (!navigator.onLine) notifyOffline();

    window.addEventListener("offline", notifyOffline);
    window.addEventListener("online", notifyOnline);
    return () => {
      window.removeEventListener("offline", notifyOffline);
      window.removeEventListener("online", notifyOnline);
    };
  }, []);
  return (
    <BrowserRouter basename={baseUrl}>
      <Routes>
        <Route path={APP_ROUTES.HOMEPAGE} element={<HomePageLayout />} />        
        <Route path={APP_ROUTES.AUTH.ROOT} element={<AuthLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
