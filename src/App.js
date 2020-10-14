import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';
const initialExpenses = [
  {id: uuidv4(), charge: 'rent', amount: 1600},
  {id: uuidv4(), charge: 'car payment', amount: 400},
  {id: uuidv4(), charge: 'credit card bill', amount: 1200}
];

console.log(initialExpenses);


function App() { 
  //state values
  //all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  //<> </> short cut of react fragments
  //single expense
  const [charge, setCharge] = useState('');
  //single amount
  const [amount, setAmount] = useState('');
  //functionality

  const handleCharge = e => {
    setCharge(e.target.value)
  };
  const handleAmount = e => {
    setAmount(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return <> 
    <Alert />
    <h1>Budget Calculator</h1>
    <main className="App">
      <ExpenseForm 
        charge={charge}
        amount={amount}
        handleCharge= {handleCharge}
        handleAmount={handleAmount}
        handleSubmit={handleSubmit}
      />
      <ExpenseList expenses={expenses}/>
    </main>
    <h1>
      total spending: {""} 
      <span className="total">
        $
        {expenses.reduce((acc, curr) => {
          return (acc += curr.amount);
        }, 0)}
      </span>
    </h1>
  </>;
}

export default App;
