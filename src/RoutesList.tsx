import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import NavBar from "./Navigation.tsx";
import Home from "./Home.tsx";
import Eat from "./Eat.tsx";
import Sleep from "./Sleep.tsx";
import LoginForm from "./LoginForm.tsx";
import SignupForm from "./SignupForm.tsx";
import { CurrentUser, SignUp, LogIn, RoutesProps } from "./types.ts";

/** Routes for Baby App
 *
 * Props: WIP
 * State: WIP
 *
 * BabyApp ->
 *  RoutesList ->
 *    {Navigation, LoginForm, RegisterForm, Logout, Home, Eat, Sleep}
 */

function RoutesList({ currentUser, signUp, logIn }: RoutesProps) {
  console.log("* RoutesList", currentUser);

  return (
    <div className="RoutesList">
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
        {currentUser === null &&
            <>
              <Route path="/login" element={<LoginForm logIn={logIn} />} />
              <Route path="/signup" element={<SignupForm signUp={signUp}  />} />
            </>
          }
          {currentUser !== null &&
            <>
            <Route path="/eat" element={<Eat currentUser={currentUser}/>} />
            {/* <Route path="/sleep" element={<Sleep />} /> */}
            </>
          }
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  )

}

export default RoutesList;