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
     state.database.ref('/').once('value').then((snapshot) => {
      let data = snapshot.val()
      const lastId = data.lastInfo.id
      let arr = data.photos && data.photos[lastId] ? data.photos[lastId] : []
      let ref = `/photos/${lastId}`
      console.log('HERLLLOERLLOER', lastId)
       if (arr && arr.length && arr.length){
         arr.unshift(url)
       }
       state.database.ref(ref).set(arr && arr.length && arr.length > 0 ? arr : [url])
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