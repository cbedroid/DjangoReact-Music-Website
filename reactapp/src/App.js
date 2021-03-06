import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllArtists, fetchAlbums, fetchAllVideos } from "./features/album"
import Base from "./pages/Base.js"
import BaseRouter from "./routes.js";
import Nav from "./components/Nav.jsx";
import "./styles/app.css"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllArtists())
    dispatch(fetchAlbums())
    dispatch(fetchAllVideos())
    console.log("App loaded")
  })




  return (
    <div className="App" >
      <Router>
        <Nav />
        <Base>
          <BaseRouter />
        </Base>
      </Router>
    </div>
  );
}

export default App;
