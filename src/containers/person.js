import { useContext } from 'react'
import Context from '../contexts/global'
import { Button } from '../components'
// import { ref, onValue, set } from "firebase/database";

function Person() {
    const state = useContext(Context)
    const photos = state.photos && state.photos[state.id] ? state.photos[state.id] : []
    function onTakePhoto(){
      //This triggers an update in Firebase which the booth listens to. 
       state.database.ref('/lastInfo').set({
        photoBlocked: true,
        id: state.id,
        time : (new Date()).getTime()
       })

       //TODO
       // Listen to database and disable button while other photos are being taken and passed around. 

    }

  return (    
        <div>
        <p>{state.id}</p>
        <Button text="Take Photo" onClick={onTakePhoto} disabled={state.lastInfo.photoBlocked}/>
        {photos && photos.map((item, i) => {
          return(
            <img src={item} key={i} />
          )
        })}
        </div>
  );
}

export default Person;