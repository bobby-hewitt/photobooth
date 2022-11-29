import React, { useEffect, useContext, useState} from 'react'
import { Webcam } from '../components'
import Context from '../contexts/global'

function Booth() {
  const state = useContext(Context)
  const [ count, setCount ] = useState(0)

  useEffect(() => {
     if(state.lastInfo && state.photoBlocked){
       setCount(count+1)
     }
  },[
     state.photoBlocked,
     state.lastInfo && state.lastInfoId ? state.lastInfoId : null
  ])

  const onComplete = (url) => {
     state.database.ref(`/photos/${state.lastInfoId}`).once('value').then((snapshot) => {
       let arr = snapshot.val()
       if (arr && arr.length && arr.length){
         arr.unshift(url)
       }
       state.database.ref(`/photos/${state.lastInfoId}`).set(arr && arr.length && arr.length > 0 ? arr : [url])
       .then(() => {
         state.database.ref(`/lastInfo/photoBlocked`).set(false)
       })  
     })
   }
    return (    
        <Webcam count={count} onComplete={onComplete}/>
    );
}

export default Booth;