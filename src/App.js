import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';
//const initialExpenses = [
//  {id: uuidv4(), charge: 'rent', amount: 1600},
//  {id: uuidv4(), charge: 'car payment', amount: 400},
//  {id: uuidv4(), charge: 'credit card bill', amount: 1200}
//];

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

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
  //alert
  const [alert, setAlert] = useState({show: false});

  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);

//useEffects let's perform side effects
//runs after every render
//first paramter - callback function (runs after render)
//second paramter -array -for letting react know when to run useEffect.
//react re-renders when state has changed or props

//useEffect 
   useEffect(()=> {
     console.log('we called useEffect');
     localStorage.setItem('expenses', JSON.stringify(expenses));
   }, [expenses]);


  //functionality

  const handleCharge = e => {
    setCharge(e.target.value)
  };
  const handleAmount = e => {
    setAmount(e.target.value)
  };


  //handle alert
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  };

  //clear all items
  const clearItems = ()=> {
    setExpenses([]);
    handleAlert({type: 'danger', text: 'all item deleted'});
  }

  //handle delete
  const handleDelete = (id) => {
    console.log(`item deleted : ${id}`);
    let temExpenses = expenses.filter(item => item.id !== id);
    setExpenses(temExpenses);
    handleAlert({type: 'danger', text: 'item deleted'});
  }

  //handle edit
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    console.log(expense);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0){

      if(edit) {
        let tempExpense = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} :item //item will stay in the same order
        });
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited' });

      }else{
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]); //if given setExpenses([singleExpenses]) it will override everything
        handleAlert({ type: 'success', text: 'item added' });
      }
      setCharge('');
      setAmount('');
    }else{
      handleAlert({ type: 'danger', text: `charge can't be empty value and amount value has to be bigger than zero `});
    }
  };

  return (
    <> 
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm 
          charge={charge}
          amount={amount}
          handleCharge= {handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList 
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems = {clearItems}
        />
      </main>
      <h1>
        total spending: {""} 
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
