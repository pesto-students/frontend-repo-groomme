import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "./config/axiosInstance";
import Loader from "./widgets/Loader";
import publicRoutesArray from "./routes/openRoutes";
import NotFound from "./Components/NotFound/NotFound";
import customerRoutesArray from "./routes/customerRoutes";
import ProtectedRoute from "./shared/ProctectedRoutes";
import salonsRoutesArray from "./routes/salonRoutes";
import { openRouteConstants } from "./routes/routeConstants";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// import lightTheme from "./themes/lightTheme";
// import darkTheme from "./themes/darkTheme";
// import orangeTheme from "./themes/orangeTheme";

function App() {
  const [loading, setLoading] = useState(false);
  // const [theme, setTheme] = useState(lightTheme);

  // const handleThemeChange = (selectedTheme: string) => {
  //   switch (selectedTheme) {
  //     case "light":
  //       setTheme(lightTheme);
  //       break;
  //     case "dark":
  //       setTheme(darkTheme);
  //       break;
  //     case "orange":
  //       setTheme(orangeTheme);
  //       break;
  //     default:
  //       setTheme(lightTheme);
  //   }
  // };

  useEffect(() => {
    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        showLoader();
        return config;
      },
      (error) => {
        hideLoader();
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        hideLoader();
        return response;
      },
      (error) => {
        hideLoader();
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <Router>
      {loading && <Loader />}
      <Routes>
        {publicRoutesArray.map((route: any) => {
          return <Route path={route.path} element={route.component} />;
        })}

        {customerRoutesArray.map((route: any) => {
          return (
            <Route
              path={route.path}
              element={
                <ProtectedRoute
                  Element={route.component}
                  allowedRoles={"customer"}
                  redirectPath={openRouteConstants.SignIn}
                />
              }
            />
          );
        })}
        {salonsRoutesArray.map((route: any) => {
          return (
            <Route
              path={route.path}
              element={
                <ProtectedRoute
                  Element={route.component}
                  allowedRoles={"salon"}
                  redirectPath={openRouteConstants.SignIn}
                />
              }
            />
          );
        })}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </Router>
  );
}

export default App;
