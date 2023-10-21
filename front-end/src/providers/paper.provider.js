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
    const MATHPIX = process.env.REACT_APP_NODE_URL;
    // console.log(MATHPIX);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${MATHPIX}/mathpix`, requestOptions)
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

  return (
    <AppContext.Provider value={{ uploadFile, files }}>
      {children}
    </AppContext.Provider>
  );
};
