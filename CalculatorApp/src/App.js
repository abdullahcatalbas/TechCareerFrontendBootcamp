import { useState,useEffect } from 'react';
import './App.css';

function App() {

  const [previousState, setPreviousState] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [Result, setResult] = useState(false);


  const inputNumberToText = (e) => {
    if (currentState.includes(".") && e.target.innerText === ".") return;
    if (Result) {
      setPreviousState("");
    }
    currentState
      ? setCurrentState((pre) => pre + e.target.innerText)
      : setCurrentState(e.target.innerText);
    setResult(false);
  };

  useEffect(() => {
    setInput(currentState);
  }, [currentState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const operatorType = (e) => {
    
    setResult(false);
    setOperator(e.target.innerText);
    if (currentState === "") return;
    if (previousState !== "") {
      equalOperator();
    } else {
      setPreviousState(currentState);
      setCurrentState("");
    }
  };

  const equalOperator = (e) => {
    if (e?.target.innerText === "=") {
      setResult(true);

    }
    let calculation;
    switch (operator) {
      case "/":
        calculation = String(parseFloat(previousState) / parseFloat(currentState));
        break;
      case "+":
        calculation = String(parseFloat(previousState) + parseFloat(currentState));
        break;
      case "X":
        calculation = String(parseFloat(previousState) * parseFloat(currentState));
        break;
      case "-":
        calculation = String(parseFloat(previousState) - parseFloat(currentState));
        break;
      default:
        return;
    }

    setInput("");
    setPreviousState("");
    setCurrentState(calculation);
  };

  const deleteOneState =(e)=>{
      
      let str = currentState;
      str = str.slice(0,-1);
      if(str === "") str = "0";
      setCurrentState(str);
  }

  const minusPlus = () => {
    if (currentState.charAt(0) === "-") {
      setCurrentState(currentState.substring(1));
    } else {
      setCurrentState("-" + currentState);
    }
  };


  const ACButton = () => {
    setPreviousState("");
    setCurrentState("");
    setInput("0");
  };

  return (
    <div className='container'>
      <div className='container-clc'>
        <div className='screen'>
          {input !== "" || input === "0" ? 
           input:previousState
          }
        </div>
        <div className='btn light-gray' onClick={ACButton}>
          AC
        </div>
        <div className='btn light-gray' onClick={deleteOneState}>
          Del
        </div>
        <div className='btn light-gray' onClick={minusPlus}>
          +/-
        </div>
        <div className='btn orange' onClick={operatorType}>
          /
        </div>
        <div className='btn' onClick={inputNumberToText}>
          7
        </div>
        <div className='btn' onClick={inputNumberToText}>
          8
        </div>
        <div className='btn' onClick={inputNumberToText}>
          9
        </div>
        <div className='btn orange' onClick={operatorType}>
          X
        </div>
        <div className='btn' onClick={inputNumberToText}>
          4
        </div>
        <div className='btn' onClick={inputNumberToText}>
          5
        </div>
        <div className='btn' onClick={inputNumberToText}>
          6
        </div>
        <div className='btn orange' onClick={operatorType}>
          +
        </div>
        <div className='btn' onClick={inputNumberToText}>
          1
        </div>
        <div className='btn' onClick={inputNumberToText}>
          2
        </div>
        <div className='btn' onClick={inputNumberToText}>
          3
        </div>
        <div className='btn orange' onClick={operatorType}>
          -
        </div>
        <div className='btn zero' onClick={inputNumberToText}>
          0
        </div>
        <div className='btn' onClick={inputNumberToText}>
          .
        </div>
        <div className='btn' onClick={equalOperator}>
          =
        </div>
      </div>
    </div>
  );
}


export default App;
