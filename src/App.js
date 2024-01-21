import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import LOgin from "./pages/LOgin";
import MainLayout from "./Components/MainLayout";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TodoCreate from "./pages/TodoCreate";
import Profile from "./pages/Profile";
const App = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
              <Route index element={<LOgin/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/dashboard" element={<Dashboard/>}>
                <Route index element={<TodoCreate/>}/>
                <Route path="profile" element={<Profile/>}/>
              </Route>

        </Route>
      </Routes>
     </BrowserRouter>

  )
};

export { App };
