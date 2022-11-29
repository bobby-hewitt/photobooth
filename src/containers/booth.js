import React, { useEffect, useContext, useState} from 'react'
import { Webcam } from '../components'
import Context from '../contexts/global'




function Booth() {
  const state = useContext(Context)
  const [ count, setCount ] = useState(0)
  

   useEffect(() => {
     if(state.lastInfo && state.photoBlocked){
       setCount(count+1)
       console.log('take photo')
     } else {
       console.log('no photo')
     }

   },[
   state.photoBlocked,
   state.lastInfo && state.lastInfo.time ? state.lastInfo.time : null
   ])

   const onComplete = (url) => {
     console.log('url', url)
     console.log('complete', state)
     state.database.ref(`/photos/${state.lastInfo.id}`).once('value').then((snapshot) => {
       let arr = snapshot.val()
       if (arr && arr.length && arr.length){
         arr.unshift(url)
       }
       state.database.ref(`/photos/${state.lastInfo.id}`).set(arr && arr.length && arr.length > 0 ? arr : [url])
       .then(() => {
         state.database.ref(`/lastInfo/photoBlocked`).set(false)
       })
        
     })
   }


   //   function onComplete(url, id){

//Attempted to do it in a simple way but that didn't work either
     
   //   state.database.ref(`/photos`).once('value').then((snapshot) => {
   //     let arr = snapshot.val()
   //     let newArr = []
   //     if (arr && arr.length){
   //       newArr = Object.assign(arr).unshift(url)
   //     } else {
   //       newArr = [url]
   //     }

   //     console.log(arr, newArr)
       
   //     state.database.ref(`/photos`).set(newArr).then(() => {
   //       state.database.ref(`/lastInfo`).set(null)
   //     })
        
   //   })
   // }


  return (    
      <Webcam count={count} onComplete={onComplete}/>
  );
}

export default Booth;