import React, { useEffect, useContext, useState} from 'react'
import { Webcam } from '../components'
import Context from '../contexts/global'
import { v4 as uuidv4 } from 'uuid';

const localStore = window.localStorage.getItem('myPhotoboothId');
const id = localStore ? localStore : createId()
function createId(){
  let localId = uuidv4()
  window.localStorage.setItem('myPhotoboothId', localId);
  return localId
}

function Booth() {
  const state = useContext(Context)
  const [ count, setCount ] = useState(0)
  const [photoBlocked, setPhotoBlocked ] = useState(false)
  const [photos, setPhotos ] = useState([])

  useEffect(() => {
    state.database.ref(`/${id}`).on('value', (snapshot) => {
        let data = snapshot.val()
        if (data){
          setPhotos(data.photos)
          setPhotoBlocked(data.photoBlocked)
        }
      });
   },[])

  useEffect(() => {
     if(photoBlocked){
       setCount(count+1)
     }
  },[
     photoBlocked,
  ])

  function onComplete(url, lastId){
    state.database.ref(`/${id}/photos`).once('value').then((snapshot) => {
      let data = snapshot.val()
      let newData = data && data.length ? data : []
      newData.unshift(url) 
      state.database.ref(`/${id}/photos`).set(newData)
      .then(() => {
         state.database.ref(`${id}/photoBlocked`).set(false)
      }) 
    })
  }
  return (
    <div className="BoothContainer">
      <Webcam id={id} count={count} onComplete={(url) => onComplete(url)}/>
      <div className="QRCode">
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://bobby-hewitt.github.io/photobooth/user/${id}`} />
      </div>
    </div>
  );
}

export default Booth;