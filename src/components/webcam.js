import React, { useEffect, useState, useRef, useContext} from "react";
import Webcam from "react-webcam";
import Context from '../contexts/global'
import Styled from 'styled-components'


const VideoContainer = Styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  height:100vh;
  width:100vw;
`

const videoConstraints = {
  width: 1920,
  height: 1080,
  aspectRatio: 1.777777777778,
};

const WebcamCapture = ({takePhoto, onComplete, count, lastId}) => {
  const state = useContext(Context)
  const webcamRef = React.useRef(null);
  
  const [ countdown, setCountdown ] = useState(3);
  const [ showCountdown, setShowCountdown ] = useState(false);
  const [ showFlash, setShowFlash ] = useState(false);
  const [ prevCount, setPrevCount ] = useState(count);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "File name",{ type: "image/jpeg" })
         uploadFile(file)
      })
    },
    [webcamRef]
  );

  const uploadFile= (file)  => {
    var url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.upload.addEventListener("progress", (e) => {
      var progress = Math.round((e.loaded * 100.0) / e.total);
      // this.setState({width: progress + "%"})  
    });
    xhr.upload.addEventListener("load", () => {
       // this.setState({width: 0 + "%"})   
    });
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var url = response.secure_url;
        var type = file.type
        onComplete(response.url, lastId)
        //CALL UPLOAD CALLBACK       
      }
    };
    fd.append('folder','photobooth')
    fd.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
  }

  const flash = () => {
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
    }, 100)
  }

  useEffect(() => {
    if(prevCount < count) {
      if(countdown > 0) {
        setShowCountdown(true);
        setTimeout(() => { 
          setCountdown(countdown - 1)
        }, 1000)
      } else if (countdown === 0) {
        capture();
        console.log('Take Photo');
        setShowCountdown(false);
        flash();
        setCountdown(3);
        setPrevCount(count);
      }
    }
  }, [count, countdown]);

  return (
    <VideoContainer>
      <Webcam
        mirrored={true}
        audio={false}
        height={window.innerHeight}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={window.innerWidth}
        videoConstraints={videoConstraints}
      />
      {showCountdown && <div className="CountdownTimer">{countdown}</div>}
      {showFlash && <div className="Flash"/>}
    </VideoContainer>
  );
};


export default WebcamCapture