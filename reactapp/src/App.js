import React from "react";
import Header from "./components/Header.jsx";
import { BrowserRouter as Router } from "react-router-dom";

import Base from "./pages/Base.js"
import BaseRouter from "./routes.js";
import "./styles/app.css"

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Base>
          <BaseRouter />
        </Base>
      </Router>
    </div>
  );
}

export default App;
