import React, { useContext,useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import RouteComponent from './RouteComponent'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
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
//id
const localStore = window.localStorage.getItem('myPhotoboothId');
const id = localStore ? localStore : createId()
function createId(){
  let localId = uuidv4()
  window.localStorage.setItem('myPhotoboothId', localId);
  return localId
}

export default function App() {
   const [lastInfo, setLastInfo ] = useState(null)
   const [lastInfoId, setLastInfoId ] = useState(null)
   const [lastInfoPhotoBlocked, setLastInfoPhotoBlocked ] = useState(null)
   const [photos, setPhotos ] = useState(null)
   const [initialLoad, setInitialLoad] = useState(true)
   useEffect(() => {
    database.ref('/lastInfo').on('value', (snapshot) => {
      console.log('getting last info', snapshot.val())
      let data = snapshot.val()
      setLastInfoId(data.id)
      setLastInfoPhotoBlocked(data.photoBlocked)
    });
    database.ref('/photos').on('value', (snapshot) => {
      setPhotos(snapshot.val())
    });
   },[])
   
   return (
      <Provider value={{
        database,
        photos,
        lastInfoId,
        initialLoad,
        setInitialLoad,
        lastInfoPhotoBlocked,
        myPhotos: photos && photos[id] ? photos[id] : [],
        id
      }}> 
      {database && lastInfoId &&
        <RouteComponent />
      }
      </Provider>
    );
 
  
  
}


    

  
  
// }


// export default Context



