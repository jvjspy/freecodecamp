import React, { Component } from "react";
import "./App.css";
const buttons = [
  "AC",
  "/",
  "x",
  "7",
  "8",
  "9",
  "-",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "+/-",
  "0",
  ".",
  "=",
];
function isDigit(d) {
  return /\d/.test(d);
}
function isOperator(o) {
  return /^[\+\-x\/]$/.test(o);
}
function precedence(o) {
  if (o == "+" || o == "-") return 0;
  return 1;
}
function toPostfix(formula) {
  const postfix = [];
  const ost = [];
  for (let i = 0; i < formula.length; ++i) {
    if (isOperator(formula[i])) {
      while (
        ost.length > 0 &&
        precedence(ost[ost.length - 1]) > precedence(formula[i])
      ) {
        postfix.push(ost.pop());
      }
      ost.push(formula[i]);
    } else {
      postfix.push(formula[i]);
    }
  }
  while (ost.length > 0) {
    postfix.push(ost.pop());
  }
  return postfix;
}
function calculate(a, b, o) {
  let res;
  switch (o) {
    case "+":
      res = a + b;
      break;
    case "-":
      res = a - b;
      break;
    case "x":
      res = a * b;
      break;
    case "/":
      res = a / b;
      break;
    default:
      res = 0;
  }
  return Math.round(res * 1000) / 1000;
}
function evaluate(formula) {
  const postfix = toPostfix(formula);
  const res = [];
  for (let i = 0; i < postfix.length; ++i) {
    const e = postfix[i];
    if (isOperator(e)) {
      const b = parseFloat(res.pop());
      const a = parseFloat(res.pop());
      res.push(calculate(a, b, e));
    } else {
      res.push(e);
    }
  }
  return res;
}
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: "0",
      formula: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleDigit(d) {
    let { output, formula } = this.state;
    if (isOperator(output) || output == "0") {
      output = d;
      formula.push(output);
    } else {
      output += d;
      formula[formula.length - 1] = output;
    }
    this.setState({ output, formula });
  }
  handleOperator(o) {
    let { output, formula } = this.state;
    if (isOperator(output)) {
      formula[formula.length - 1] = o;
    } else if (formula.length > 0) {
      formula.push(o);
    }
    output = o;
    this.setState({ output, formula });
  }
  handleNegative() {
    let { output, formula } = this.state;
    if (!isOperator(output)) {
      output = (parseFloat(output) * -1).toString();
      formula[formula.length - 1] = output;
      this.setState({ output, formula });
    }
  }
  handleEqual() {
    const res = evaluate(this.state.formula);
    this.setState({
      output: res[0],
      formula: res,
    });
  }
  handleDecimal() {
    let { output, formula } = this.state;
    if (!isOperator(output) && formula.length > 0) {
      if (output.includes(".")) {
        output = output.replace(".", "");
      } else {
        output += ".";
      }
      formula[formula.length - 1] = output;
      this.setState({ output, formula });
    }
  }
  handleClear() {
    this.setState({
      output: "0",
      formula: [],
    });
  }
  handleClick(e) {
    const val = e.target.value;
    if (isDigit(val)) {
      this.handleDigit(val);
    } else if (isOperator(val)) {
      this.handleOperator(val);
    } else if (val == ".") {
      this.handleDecimal();
    } else if (val == "=") {
      this.handleEqual();
    } else if (val == "+/-") {
      this.handleNegative();
    } else {
      this.handleClear();
    }
  }
  render() {
    const { output, formula } = this.state;
    return (
      <div className="app">
        <div className="calculator">
          <div className="screen">
            <div className="screen-formula">{formula.join("")}</div>
            <div className="screen-output">{output}</div>
          </div>
          <div className="buttons-grid">
            {buttons.map((lb) => (
              <button
                onClick={this.handleClick}
                value={lb}
                key={lb}
                className={lb}
              >
                {lb}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
