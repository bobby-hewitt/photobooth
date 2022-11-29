import React, { useContext } from 'react'
import Context from '../contexts/global'
import { Button } from '../components'
import Styled from 'styled-components'

const Photo = Styled.img`
  width:100%;
  margin-bottom:16px;
  border-radius:16px;
  box-shadow: 4px 4px 20px #000000aa;
`

const PhotoContainer = Styled.div`
  padding:16px;
  margin-bottom:20vh;
`

function Person() {
  const state = useContext(Context)
  const photos = state.photos && state.photos[state.id] ? state.photos[state.id] : []
  
  function onTakePhoto(){
    if (!state.lastInfoPhotoBlocked){
      state.database.ref('/lastInfo').set({
        photoBlocked: true,
        id: state.id,
        time : (new Date()).getTime()
      })
    }
  }

  return (    
      <React.Fragment>
      <Button text="Take Photo" onClick={onTakePhoto} disabled={state.lastInfoPhotoBlocked}/>
        <PhotoContainer>
        {photos && photos.map((item, i) => {
          return(
            <Photo src={item} key={i} />
          )
        })}
        </PhotoContainer>
      </React.Fragment>
  );
}

export default Person;