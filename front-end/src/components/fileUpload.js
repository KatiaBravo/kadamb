import React from "react";
import { useState } from "react";
import "./fileUpload.css";
// import Cart from "./cart";
import { useApp } from "../providers/paper.provider";
import MathExample from "./markdown";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [cardsUploaded, setCardsUploaded] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [input, setInput] = useState();
  const { solveByWolfram, uploadFile } = useApp();

  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const submissionHandler = (event) => {
    event.preventDefault();
    setCardsUploaded((cardsUploaded) => (cardsUploaded = cardsUploaded + 1));
    setImage(URL.createObjectURL(file));
    uploadFile(file);
  };
  const inputSubmission = (e) => {
    e.preventDefault();
    solveByWolfram(input);
  };
  return (
    <div className="container">
      <div className="fileUpload">
        <div>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setInput(e.target.value);
            }}
            style={{ marginRight: 40 }}
          />
          <button onClick={inputSubmission} style={{ marginRight: 40 }}>
            Submit
          </button>
        </div>
        <input
          type="file"
          name="file"
          id="customUpload"
          onChange={fileHandler}
          style={{ color: "#D6C518 " }}
        />
        <div className="dropdown">
          <button
            className="uploadButton"
            onClick={(e) => submissionHandler(e)}
          >
            Upload
          </button>
        </div>
      </div>
      <div className="imageContainer">
        {image && (
          // Array.from(Array(cardsUploaded).keys()).map((ele) => {
          <>
            <img
              src={image}
              style={{
                width: 400,
                height: 600,
                marginTop: 40,
                marginRight: 40,
              }}
            />
            {/* <div className="latex"></div> */}
            <MathExample />
          </>
        )}
      </div>
    </div>
  );
};
export default FileUpload;
