import React from "react";
import { useState } from "react";
import './fileUpload.css'

const FileUpload = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const fileHandler = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const submissionHandler = (event) => {
    event.preventDefault();
    setImage(URL.createObjectURL(file));
  };
  return (
    <div className = "container">
      <div className = "fileUpload">
        <input type="file" name="file" id = "customUpload" onChange={fileHandler} style = {{color: "#D6C518 "}}/>
        <button onClick={submissionHandler} className = "uploadButton">Upload</button>
      </div>
      <div className = "imageContainer">
      {image && <img alt="not found" src={image} style = {{width: "40%", height: "100%"}}/>}
      <div></div>
      </div>
    </div>
  );
};
export default FileUpload;
