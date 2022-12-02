import React, { useContext,useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import RouteComponent from './RouteComponent'
import './App.css'
import Context, { Provider} from './contexts/global'
//db
const firebaseConfig = {
  apiKey: "AIzaSyADEI4xLSkinqf1F-q_0ijZem6yMtD1Xqo",
  authDomain: "photobooth-f5ff6.firebaseapp.com",
  projectId: "photobooth-f5ff6",
  storageBucket: "photobooth-f5ff6.appspot.com",
  messagingSenderId: "632941052176",
  appId: "1:632941052176:web:bf61b63cd6114e5732e595",
  measurementId: "G-H5TF26WX57",
  databaseURL: "https://photobooth-f5ff6-default-rtdb.europe-west1.firebasedatabase.app/"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default function App() { 
   const [initialLoad, setInitialLoad] = useState(true)

   
  
   return (
      <Provider value={{
        database,
        initialLoad,
        setInitialLoad
      }}> 
      {database && 
        <RouteComponent />
      }
      </Provider>
    );
 
  
  
}
