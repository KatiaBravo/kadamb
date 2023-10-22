// import logo from "./logo.svg";
import "./App.css";
import FileUpload from "./components/fileUpload";
import MarkdownRender from "./components/markdown";
// import LatexCodeConvert from "./components/latexConverter";
import { AppProvider } from "./providers/paper.provider";

function App() {
  return (
    <body>
      <AppProvider>
        <div>
          <FileUpload />
          <MarkdownRender />
        </div>
      </AppProvider>
    </body>
  );
}

export default App;
