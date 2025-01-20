import "./App.css";

import React from "react";
import LoginForm from "./components/LoginForm";
import CapturePhoto from "./components/CapturePhoto";

const App = () => {
  return (
    <div>
      {/* Login Form */}
      <LoginForm />
      {/* Komponen untuk menangkap foto */}
      <CapturePhoto />
    </div>
  );
};

export default App;
