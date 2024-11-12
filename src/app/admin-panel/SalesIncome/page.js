// pages/sales-income.js

import { useState } from 'react';

const SalesIncomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [newExpense, setNewExpense] = useState(0);
  const [newIncome, setNewIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const addExpense = () => {
    const updatedExpenses = [...expenses, { id: Date.now(), amount: newExpense }];
    setExpenses(updatedExpenses);
    setTotalExpenses(totalExpenses + parseFloat(newExpense));
    setNewExpense(0);
  };

  const addIncome = () => {
    const updatedIncome = [...income, { id: Date.now(), amount: newIncome }];
    setIncome(updatedIncome);
    setTotalIncome(totalIncome + parseFloat(newIncome));
    setNewIncome(0);
  };

  return (
    <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Sales & Income</h2>

      <h3 className="text-xl font-semibold mb-2">Add Expense</h3>
      <input
        type="number"
        value={newExpense}
        onChange={(e) => setNewExpense(e.target.value)}
        placeholder="Enter expense amount"
        className="border rounded p-2 w-full mb-3"
      />
      <button
        onClick={addExpense}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
      >
        Add Expense
      </button>

      <h3 className="text-xl font-semibold mb-2">Add Income</h3>
      <input
        type="number"
        value={newIncome}
        onChange={(e) => setNewIncome(e.target.value)}
        placeholder="Enter income amount"
        className="border rounded p-2 w-full mb-3"
      />
      <button
        onClick={addIncome}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
      >
        Add Income
      </button>

      <h3 className="text-xl font-semibold mt-5">Total Expenses: ${totalExpenses.toFixed(2)}</h3>
      <h3 className="text-xl font-semibold">Total Income: ${totalIncome.toFixed(2)}</h3>

      <ul className="mt-5">
        <h4 className="font-semibold">Expenses:</h4>
        {expenses.map((expense) => (
          <li key={expense.id} className="py-2 border-b">
            Expense Amount: ${expense.amount}
          </li>
        ))}
        <h4 className="font-semibold mt-3">Income:</h4>
        {income.map((inc) => (
          <li key={inc.id} className="py-2 border-b">
            Income Amount: ${inc.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesIncomePage;
