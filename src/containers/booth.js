import React, { useEffect, useContext, useState} from 'react'
import { Webcam } from '../components'
import Context from '../contexts/global'


function Booth() {
  const state = useContext(Context)
  const [ count, setCount ] = useState(0)

  useEffect(() => {
     if(state.lastInfoPhotoBlocked){
       setCount(count+1)
     }
  },[
     state.lastInfoPhotoBlocked,
     state.lastInfoId
  ])

  function onComplete(url, lastId){
     state.database.ref('/photos').once('value').then((snapshot) => {
      let data = snapshot.val()
      let newData = data && data.length ? data : []
      newData.unshift(url) 
      console.log('newData', newData)
      state.database.ref('/photos').set(newData)
      .then(() => {
         state.database.ref(`/lastInfo/photoBlocked`).set(false)
       }) 
     })
   }
    return (
        <div className="BoothContainer">
          <Webcam count={count} lastId={state.lastInfoId} onComplete={(url) => onComplete(url)}/>
          <div className="QRCode">
            <img src="qr.png" />
          </div>
        </div>
    );
}

export default Booth;