import React, { useContext, useState, useEffect } from 'react'
import Context from '../contexts/global'
import { Button, Modal } from '../components'
import Styled from 'styled-components'
import {
  useParams
} from "react-router-dom";

const Photo = Styled.img`
  width:100%;
  margin-bottom:16px;
  box-shadow: 4px 4px 20px #000000aa;
  border-radius:${
     props => props.noRadius 
     ? '0px' 
     : '16px'}
 
`
const PhotoContainer = Styled.div`
  padding:16px;
  margin-bottom:20vh;
`
function Person() {
  const {id} = useParams()
  console.log('id', id)
  const state = useContext(Context)
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
  
  function onTakePhoto(){
    if (!photoBlocked){
      state.database.ref(`/${id}/photoBlocked`).set(true)
    }
  }

  return (    
      <React.Fragment>
      <Button text="Take Photo" onClick={onTakePhoto} disabled={photoBlocked}/>
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