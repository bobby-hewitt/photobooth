import React, { useContext, useState, useEffect } from 'react'
import Context from '../contexts/global'
import { Button } from '../components'
import Styled from 'styled-components'

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

const ModalContainer = Styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  height:200vh;
  background:#f2f2f2;
  z-index:1;
`

function Modal({photo}) {
  
  // useEffect(() => {
  //   fetch(`https://evilinsult.com/generate_insult.php`)
  // .then((response) => response.json())
  // .then((actualData) => console.log(actualData))
  // },[])

  return (    
          <ModalContainer>
          <Photo noRadius={true} src={photo} />
          </ModalContainer>
        
      
  );
}

export default Modal;