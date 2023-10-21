import React from "react";
import { useState } from "react";
import "./fileUpload.css";
import Cart from "./cart";
import { useApp } from "../providers/paper.provider";

const totalQuestionsNumber = 5;

const FileUpload = () => {
  const { uploadFile } = useApp();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [cardsUploaded, setCardsUploaded] = useState(0);
  const [questions, setQuestions] = useState([]);

  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const submissionHandler = (qNumber, event) => {
    event.preventDefault();
    setCardsUploaded((cardsUploaded) => (cardsUploaded = cardsUploaded + 1));
    uploadFile(file);
    setImage(URL.createObjectURL(file));

    const data = {
      image: URL.createObjectURL(file),
      questionNumber: qNumber,
      title: `Q${qNumber}`,
    };
    console.log(data);

    const updatedData = questions;
    updatedData.push(data);
    setQuestions(updatedData);
  };
  return (
    <div className="container">
      <div className="fileUpload">
        <input
          type="file"
          name="file"
          id="customUpload"
          onChange={fileHandler}
          style={{ color: "#D6C518 " }}
        />
        <div class="dropdown">
          <button class="uploadButton">Upload</button>
          <div class="dropdown-content">
            {Array.from(Array(totalQuestionsNumber).keys()).map((ele) => {
              ele++;
              return (
                <a href="#" onClick={(e) => submissionHandler(ele, e)}>
                  Question {ele}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="imageContainer">
        {image &&
          // Array.from(Array(cardsUploaded).keys()).map((ele) => {
          questions.map(({ image, questionNumber, title }) => {
            return (
              <Cart
                imgSrc={image}
                qNumber={questionNumber}
                title={`Q${questionNumber}`}
                totalQuestionsNumber={totalQuestionsNumber}
              />
            );
          })}
      </div>
    </div>
  );
};
export default FileUpload;
