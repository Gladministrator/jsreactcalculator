import React from "react-dom";
import { useContext, useState, useRef } from "react";
import { CalcContext } from "./contextState";

function Buttons() {
  const array = useRef([]);
  const [displayNum, setDisplayNum] = useState([]);
  const [number, setnumber] = useState([]);
  const [calc, setcalc] = useContext(CalcContext);
  const clearCalc = () => {
    setnumber([]);
    array.current = [];
    setDisplayNum(["0"]);
    setcalc(false);
  };
  const handleClick = (val) => {
    if (number === "0" && val === 0) {
      console.log("zeros");
      return null;
    }
    if (number.includes(".") && val === ".") {
      console.log("contains .");
      return null;
    }
    if (calc && isNaN(number[number.length - 1]) === false && typeof parseInt(val) === "number") {
      console.log("reset");
      clearCalc();
      setnumber([val]);
    } else {
      setnumber((prev) => prev + val);
    }
    setDisplayNum(array.current.slice(0));
  };

  const operatorClick = (operator) => {
    console.log(number);
    if ((operator === "/" || operator === "*") && number.length === 0 && array.current.length === 0) {
      return null;
    } else if (number.length === 0 && (operator === "-" || operator === "+")) {
      handleClick(operator);
    } else if ((operator === "/" || operator === "*" || "+") && isNaN(parseFloat(number))) {
      console.log("Help");
      setnumber("");
      array.current[array.current.length - 1] = operator;
    } else if (isNaN(number)) {
      console.log("Not a number; return null");
      return null;
    } else {
      console.log("add to calculation");
      array.current.push(parseFloat(number));
      array.current.push(operator);
      setnumber([]);
    }

    setDisplayNum(array.current.slice(0));
  };

  const calculateTotal = () => {
    if (array.current.length === 0 || isNaN(number) || number.length === 0) {
      console.log("Nothing to Calculate");
      return null;
    } else if (isNaN(number) === false) {
      array.current.push(parseFloat(number));
      setnumber([]);
    }
    while (array.current.findIndex((element) => element === "*" || element === "/") > 0) {
      let indi = array.current.findIndex((element) => element === "*" || element === "/");
      if (array.current[indi] === "*") {
        array.current.splice(indi - 1, 3, array.current[indi - 1] * array.current[indi + 1]);
      } else if (array.current[indi] === "/") {
        array.current.splice(indi - 1, 3, array.current[indi - 1] / array.current[indi + 1]);
      }
    }
    while (array.current.findIndex((element) => element === "+" || element === "-") > 0) {
      let indi = array.current.findIndex((element) => element === "+" || element === "-");
      if (array.current[indi] === "+") {
        array.current.splice(indi - 1, 3, array.current[indi - 1] + array.current[indi + 1]);
      } else if (array.current[indi] === "-") {
        array.current.splice(indi - 1, 3, array.current[indi - 1] - array.current[indi + 1]);
      }
    }
    setcalc(true);
    setDisplayNum([]);
    setnumber([array.current.slice(0)]);
    array.current = [];
  };

  return (
    <div>
      <h1>JS React Calculator</h1>
      <div className="calculatorbox">
        <div id="display">
          {displayNum}
          {number}
        </div>
        <button id="clear" onClick={clearCalc}>
          Clear
        </button>
        <button id="seven" onClick={() => handleClick(7)}>
          7
        </button>
        <button id="eight" onClick={() => handleClick(8)}>
          8
        </button>
        <button id="nine" onClick={() => handleClick(9)}>
          9
        </button>
        <button id="divide" onClick={() => operatorClick("/")}>
          ÷
        </button>
        <button id="four" onClick={() => handleClick(4)}>
          4
        </button>
        <button id="five" onClick={() => handleClick(5)}>
          5
        </button>
        <button id="six" onClick={() => handleClick(6)}>
          6
        </button>
        <button id="multiply" onClick={() => operatorClick("*")}>
          ×
        </button>
        <button id="one" onClick={() => handleClick(1)}>
          1
        </button>
        <button id="two" onClick={() => handleClick(2)}>
          2
        </button>
        <button id="three" onClick={() => handleClick(3)}>
          3
        </button>
        <button id="add" onClick={() => operatorClick("+")}>
          +
        </button>
        <button id="decimal" onClick={() => handleClick(".")}>
          .
        </button>
        <button id="zero" onClick={() => handleClick(0)}>
          0
        </button>
        <button id="equals" onClick={calculateTotal}>
          =
        </button>
        <button id="subtract" onClick={() => operatorClick("-")}>
          -
        </button>
      </div>{" "}
    </div>
  );
}

export default Buttons;
