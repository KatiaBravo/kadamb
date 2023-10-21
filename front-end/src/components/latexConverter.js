import React from "react";
import "./latexConverter.css";
// import Latex from "react-latex-next";
var Latex = require("react-latex");

const LatexCodeConvert = () => {
  const fraction = `$$\\frac{3}{2}$$`;
  const pythagorean = `$$a^2+b^2=c^2$$`;
  const theorem = `$$\\frac{d}{dx}\\int_{a}^{x}f(t)dt = f(x)$$`;
  const test = `$$\\begin{align}(x^3 - 1) &= 0 \\ x^3 &= 1 \\ (x - 1)(x^2 + x + 1) &= 0 \\ end{align}$$`;
  return (
    <div>
      <Latex>{test}</Latex>

      <hr />
    </div>
  );
};

export default LatexCodeConvert;
