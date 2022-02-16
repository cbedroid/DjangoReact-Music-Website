import React from "react";
import Home from "./pages/home.jsx";
import Album from "./pages/album.jsx";
import { Route } from "react-router-dom";

const BaseRouter = () => (
  <div>
    <Route exact path={["/", "/home"]} component={Home} />
    <Route exact path="/album/:id" component={Album} />
  </div>
);

export default BaseRouter;
