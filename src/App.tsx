import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Deneme from "./pages/Deneme";
import Osman from "./pages/Osman";
import jwtDecode from "jwt-decode";
function App() {
  // const responseMessage = (response: any) => {
  //   console.log(response);
  //   if (response.credential != null) {
  //     const USER_CREDENTIAL = jwtDecode(response.credential);
  //     console.log(USER_CREDENTIAL);
  //   }
  // };
  // const errorMessage = (error: any) => {
  //   console.log(error);
  // };
  return (
    // <div>
    //   <h2>React Google Login</h2>
    //   <br />
    //   <br />
    //   <GoogleLogin onSuccess={responseMessage} />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/deneme" element={<Deneme />} />
        <Route path="/osman" element={<Osman />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
