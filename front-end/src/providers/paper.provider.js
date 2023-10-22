import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // console.log(process.env);
  const [studentFile, setStudentFile] = useState();
  const [latex, setLatex] = useState("");
  const [correctLatex, setCorrectLatex] = useState();
  // console.log(files);
  //   const [theme, setTheme] = useState("light");
  const uploadFile = async (file) => {
    console.log("uploading file...");
    var formdata = new FormData();
    formdata.append("file", file, "file.jpg");
    var myHeaders = new Headers();
    myHeaders.append("app_id", process.env.REACT_APP_MATHPIX_APP_ID);
    myHeaders.append("app_key", process.env.REACT_APP_MATHPIX_APP_KEY);
    const NODE = process.env.REACT_APP_NODE_URL;
    // console.log(NODE);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${NODE}/mathpix`, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        const { latex_styled } = JSON.parse(result);
        setStudentFile({ file, latex: latex_styled });
        compareFile(latex_styled, correctLatex.latex);
      })
      .catch((error) => console.log("error", error));

    // studentFile.latex
  };

  const compareFile = async (studentLatex, correctLatex) => {
    console.log("comparing...");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      studentLatex,
      correctLatex,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const PYTHON = process.env.REACT_APP_PYTHON_URL;

    fetch(`${PYTHON}/compare`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result", result);
        setLatex(result);
      })
      .catch((error) => console.log("error", error));
  };
  const solveByWolfram = (input) => {
    console.log("solving...");
    var myHeaders = new Headers();
    myHeaders.append("app_id", process.env.REACT_APP_MATHPIX_APP_ID);
    myHeaders.append("app_key", process.env.REACT_APP_MATHPIX_APP_KEY);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      input,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const NODE = process.env.REACT_APP_NODE_URL;
    fetch(`${NODE}/wolfram?format=latex`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setCorrectLatex(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <AppContext.Provider
      value={{
        compareFile,
        uploadFile,
        solveByWolfram,
        studentFile,
        latex,
        correctLatex,
        setCorrectLatex,
        setLatex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
