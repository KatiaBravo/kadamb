import logo from "./logo.svg";
import "./App.css";
import FileUpload from "./components/fileUpload";
import LatexCodeConvert from "./components/latexConverter";
import { AppProvider } from "./providers/paper.provider";

function App() {
  return (
    <AppProvider>
      <body>
        <div>
          <FileUpload />
        </div>
      </body>
    </AppProvider>
  );
}

export default App;
