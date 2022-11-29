import React, { useState, useEffect } from "react";
import { Provider } from "./global";
import firebase from "firebase/app";
import "firebase/database";

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

export const Provider function FirebaseProvider({children}) {
   // const [lastInfo, setLastInfo ] = useState(null)
   // const [allPhotoData, setAllPhotoData ] = useState(null)
   





   // useEffect(() => {
   //  console.log('here')
   //  database.ref('/').on('value', (snapshot) => {
   //    const data = snapshot.val();
   //    setLastInfo(data.lastInfo)
   //    setAllPhotoData(data)
   //    return () => {
   //      database.removeEventListener('/')
   //    }
   //  });
   // },[database])



    

   
     return (
        <Provider value={{
          hello:true,
          // database, 
          // photoAvailable: lastInfo && lastInfo.photoAvailable,
          // lastId: lastInfo && lastInfo.lastId ? lastInfo.lastId : null,
          // allPhotoData
        }}> 
          {children}
        </Provider>
          
    );
  
}


