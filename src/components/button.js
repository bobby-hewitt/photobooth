import React, {useContext} from 'react'
import Styled from 'styled-components'


const ButtonContainer = Styled.div`
position:fixed;
bottom:12px;
right:12px;
height:80px;
width:80px;
border-radius:60px;
background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(60,60,60,1) 100%);
box-shadow: 4px 4px 20px #000000aa;
display:flex;
align-items:center;
justify-content:center;
padding:2px;

`

const ButtonInner = Styled.div`
  width:70px;
  height:70px;
  border-radius:50%;
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(60,60,60,1) 100%);
`

const CameraImage = Styled.img`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
  width:30px;
  opacity:0.5;
  height:auto; 

`
 function Button({text, onClick, disabled}) {
   
  return (  
  <ButtonContainer 
    style={{opacity: disabled ? 0.5 : 1}}
    onClick={() => {
      if (!disabled) onClick()}
    }
  >  
  <CameraImage src="camera.png"/>
        <ButtonInner />
        <div className="button" style={{opacity: disabled ? 0 : 1}}/>
          
        
  </ButtonContainer>
  );
}

export default Button;