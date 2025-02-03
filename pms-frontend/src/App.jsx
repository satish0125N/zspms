// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p >
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Clients from "./pages/Clients";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Signup from "./components/SignUp";
// import AdminDashboard from "./components/AdminDashboard";
// import AdminNavbar from "./components/AdminNavbar";
import ErrorBoundary from "./components/ErrorBoundary";
import Admin from "./pages/Admin";
// import User from "./pages/User";
import AdminNavbar from "./components/AdminNavbar";
import Navbar from "./components/Navbar";

const App = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    // Get user role from localStorage
    const userRole = localStorage.getItem("user_role");
    setRole(userRole);
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        {role === "administrator" ? (
          <AdminNavbar />
        ) : role === "subscriber" ? (
          <Navbar />
        ) : null}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} /> {/* Default to Login */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["administrator", "subscriber"]} />
            }
          >
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/team" element={<Team />} />
            <Route path="/clients" element={<Clients />} />
          </Route>
          {/* Admin-specific route (Only for administrators) */}
          <Route element={<ProtectedRoute allowedRoles={["administrator"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
