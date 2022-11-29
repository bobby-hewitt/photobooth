import React, {useContext} from 'react'
 function Button({text, onClick, disabled}) {
   
  return (    
        <div className="button" style={{opacity: disabled ? 0 : 1}}onClick={() => {
          if (!disabled) onClick()
        }}>
          <p>{text}</p>
        </div>
  );
}

export default Button;