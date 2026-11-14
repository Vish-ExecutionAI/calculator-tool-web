import { useState } from 'react';

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
    return second;
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="display">{displayValue}</div>
      </div>
      <button onClick={clearAll} className="ac">AC</button>
      <button onClick={() => handleOperator('/')} className="operator-btn">/</button>
      <button onClick={() => handleOperator('*')} className="operator-btn">*</button>
      <button onClick={() => handleOperator('-')} className="operator-btn">-</button>

      <button onClick={() => inputDigit('7')}>7</button>
      <button onClick={() => inputDigit('8')}>8</button>
      <button onClick={() => inputDigit('9')}>9</button>
      <button onClick={() => handleOperator('+')} className="operator-btn">+</button>

      <button onClick={() => inputDigit('4')}>4</button>
      <button onClick={() => inputDigit('5')}>5</button>
      <button onClick={() => inputDigit('6')}>6</button>
      <button onClick={inputDecimal} className="decimal-btn">.</button>

      <button onClick={() => inputDigit('1')}>1</button>
      <button onClick={() => inputDigit('2')}>2</button>
      <button onClick={() => inputDigit('3')}>3</button>
      <button onClick={() => handleOperator('=')} className="equals operator-btn">=</button>

      <button onClick={() => inputDigit('0')} className="span-two">0</button>
    </div>
  );
}