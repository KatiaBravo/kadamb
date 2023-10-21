import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // console.log(process.env);
  const [files, setFiles] = useState([]);
  console.log(files);
  //   const [theme, setTheme] = useState("light");
  const uploadFile = async (file) => {
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
        const before = files;
        before.push({ latex_styled, file });
        setFiles(before);
        console.log(files);
      })
      .catch((error) => console.log("error", error));
  };

  const compareFile = async (studentLatex, correctLatex) => {
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
    const NODE = process.env.REACT_APP_NODE_URL;
    const PYTHON = process.env.REACT_APP_PYTHON_URL;

    fetch(`${PYTHON}/compare`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <AppContext.Provider value={{ uploadFile, files }}>
      {children}
    </AppContext.Provider>
  );
};
