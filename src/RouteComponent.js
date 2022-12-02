import React from "react";
import {Person, Booth } from './containers'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function RouteComponent() {
     return ( 
        <Router>
          <Routes>
            <Route path="/user/:id" element={<Person/>} />
            <Route path="/photobooth/user/:id" element={<Person/>} />
            <Route path="/" element={<Booth />} />
            <Route path="/photobooth/" element={<Booth/>} />
          </Routes>
        </Router>
    );
}

