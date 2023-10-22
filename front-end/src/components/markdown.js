import React, { useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./markdown.css";
import { useApp } from "../providers/paper.provider";

const MathExample = () => {
  const { latex } = useApp();
  useEffect(() => {
    // Your LaTeX equation
    const latex =
      "\\begin{array}{c}\n3 x^{2}+24 x-3=0 \\\\\nx^{2}+8 x-1=0 \\\\\nD=64+4=68 \\\\\nx_{1,2}=\\frac{-8 \\pm \\sqrt{68}}{2} \\\\\nx_{42}=\\frac{-8 \\pm 2 \\sqrt{17}}{2} \\\\\nx_{1}=-4+\\sqrt{17} \\\\\nx_{2}=-4-\\sqrt{17} .\n\\end{array}";
    const element = document.getElementById("math-element");
    // const test = latex.replace("[", "").replace("]", "");
    katex.render(latex, element);
  }, [latex]);

  return (
    <div>
      {/* <h2>Math Example</h2> */}
      <div id="math-element"></div>
    </div>
  );
};

export default MathExample;
