


import React, { useContext,useEffect, useState } from "react";
import {Person, Booth } from './containers'
import Context from './contexts/global'
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function RouteComponent() {
  const state = useContext(Context)
     return ( 
        <Router>
          <Routes>
            <Route path="/" element={<Person />} />
            <Route path="/photobooth" element={<Person />} />
            <Route path="/booth" element={<Booth />} />
            <Route path="photobooth/booth" element={<Booth />} />
          </Routes>
        </Router>
    );
}

