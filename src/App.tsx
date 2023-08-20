import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store";
import { logout } from "./features/user/userSlice";
import Deneme from "./pages/Deneme";
import Osman from "./pages/Osman";
import Login from "./pages/login";

function App() {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderRoutes = () => {
    if (isUserLoggedIn) {
      return (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col ">
                  <h1>Hosgeldiniz</h1>

                  <button className="border-2" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              }
            />
            <Route path="/deneme" element={<Deneme />} />
            <Route path="/osman" element={<Osman />} />
          </Routes>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    }
  };
  return <div>{renderRoutes()}</div>;
}
export default App;
// <div>
//   <h2>React Google Login</h2>
//   <br />
//   <br />
//   <GoogleLogin onSuccess={responseMessage} />
// </div>
// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<div>Home</div>} />
//     <Route path="/deneme" element={<Deneme />} />
//     <Route path="/osman" element={<Osman />} />
//   </Routes>
// </BrowserRouter>
