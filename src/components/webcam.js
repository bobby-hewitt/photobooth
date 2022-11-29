import React, { useEffect, useState, useRef, useContext} from "react";
import Webcam from "react-webcam";
import Context from '../contexts/global'

const videoConstraints = {
  width: 192  ,
  height: 108,
  facingMode: "user"
};

const WebcamCapture = ({takePhoto, onComplete, count}) => {
  const state = useContext(Context)
  const webcamRef = React.useRef(null);
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
        onComplete(response.url)
        //CALL UPLOAD CALLBACK       
      }
    };
    fd.append('folder','photobooth')
    fd.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
  }

  useEffect(() => {
    
    if(count !== 0){
      capture()
    }
  },[count])

  return (
    <React.Fragment>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
    </React.Fragment>
  );
};


export default WebcamCapture