import React from "react";
import Home from "./pages/home.jsx";
import Album from "./pages/album.jsx";
import { Route } from "react-router-dom";
import AlbumList from "./pages/albumList.jsx"

const BaseRouter = () => (
  <div>
    <Route exact path={["/", "/home"]} component={Home} />
    <Route exact path="/albums" component={AlbumList} />
    <Route exact path="/album/:id" component={Album} />
  </div>
);

export default BaseRouter;
