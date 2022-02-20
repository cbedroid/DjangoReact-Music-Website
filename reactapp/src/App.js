import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllArtists, fetchAlbums, fetchAllVideos } from "./features/album"
import Base from "./pages/Base.js"
import BaseRouter from "./routes.js";
import Header from "./components/Header.jsx";
import "./styles/app.css"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("App loaded")
    dispatch(fetchAllArtists())
    dispatch(fetchAlbums())
    dispatch(fetchAllVideos())
  })

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
