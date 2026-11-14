import { useState } from 'react';

const factorial = (n) => {
  if (n < 0 || !Number.isInteger(n)) return NaN; // Handled by caller for alert
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
};

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const calculate = (first, second, op) => {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') {
      if (second === 0) {
        alert("Cannot divide by zero!");
        return 0;
      }
      return first / second;
    }
    if (op === '^') return Math.pow(first, second);
    return second;
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (nextOperator === '=') {
      if (firstOperand !== null && operator && !isNaN(inputValue)) {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplayValue(String(parseFloat(result.toFixed(7))));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(true);
      }
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(parseFloat(result.toFixed(7))));
      setFirstOperand(result);
    } else if (isNaN(inputValue) && firstOperand === null) {
      // If display is not a number and no first operand, just update operator
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleUnaryOperator = (op) => {
    const inputValue = parseFloat(displayValue);
    if (isNaN(inputValue)) return;

    let result;
    switch (op) {
      case 'sqrt':
        if (inputValue < 0) {
          alert("Cannot take square root of a negative number!");
          return;
        }
        result = Math.sqrt(inputValue);
        break;
      case 'sin': // Assume input in degrees for user friendliness
        result = Math.sin(inputValue * (Math.PI / 180));
        break;
      case 'cos': // Assume input in degrees
        result = Math.cos(inputValue * (Math.PI / 180));
        break;
      case 'tan': // Assume input in degrees
        if (Math.abs(inputValue % 180) === 90 || Math.abs(inputValue % 180) === 270) {
          alert("Tangent undefined for this angle!");
          return;
        }
        result = Math.tan(inputValue * (Math.PI / 180));
        break;
      case 'log': // Natural Log (ln)
        if (inputValue <= 0) {
          alert("Cannot take logarithm of a non-positive number!");
          return;
        }
        result = Math.log(inputValue);
        break;
      case '!': // Factorial
        if (inputValue < 0 || !Number.isInteger(inputValue)) {
          alert("Factorial is only defined for non-negative integers!");
          return;
        }
        result = factorial(inputValue);
        break;
      default:
        return;
    }
    setDisplayValue(String(parseFloat(result.toFixed(7))));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="display">{displayValue}</div>
      </div>
      <button onClick={() => handleUnaryOperator('sqrt')} className="operator-btn">√</button>
      <button onClick={() => handleOperator('^')} className="operator-btn">xʸ</button>
      <button onClick={() => handleUnaryOperator('sin')} className="operator-btn">sin</button>
      <button onClick={() => handleUnaryOperator('cos')} className="operator-btn">cos</button>

      <button onClick={clearAll} className="ac">AC</button>
      <button onClick={() => handleUnaryOperator('log')} className="operator-btn">ln</button>
      <button onClick={() => handleUnaryOperator('tan')} className="operator-btn">tan</button>
      <button onClick={() => handleUnaryOperator('!')} className="operator-btn">x!</button>

      <button onClick={() => inputDigit('7')}>7</button>
      <button onClick={() => inputDigit('8')}>8</button>
      <button onClick={() => inputDigit('9')}>9</button>
      <button onClick={() => handleOperator('/')} className="operator-btn">/</button>

      <button onClick={() => inputDigit('4')}>4</button>
      <button onClick={() => inputDigit('5')}>5</button>
      <button onClick={() => inputDigit('6')}>6</button>
      <button onClick={() => handleOperator('*')} className="operator-btn">*</button>

      <button onClick={() => inputDigit('1')}>1</button>
      <button onClick={() => inputDigit('2')}>2</button>
      <button onClick={() => inputDigit('3')}>3</button>
      <button onClick={() => handleOperator('-')} className="operator-btn">-</button>

      <button onClick={() => inputDigit('0')} className="span-two">0</button>
      <button onClick={inputDecimal} className="decimal-btn">.</button>
      <button onClick={() => handleOperator('+')} className="operator-btn">+</button>
      <button onClick={() => handleOperator('=')} className="equals operator-btn">=</button>
    </div>
  );
}
