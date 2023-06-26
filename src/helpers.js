export const waaitt = () => 
new Promise(res => setTimeout (res, Math.random()*800))

const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${ existingBudgetLength * 34 } 65% 50%`
}

//Local storage func
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,

    //color:
    color: generateRandomColor()
  }
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem("budgets", 
  JSON.stringify([...existingBudgets, newItem]))
}

//create expense

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId : budgetId
  }
  const existingExpenses = fetchData("expenses") 
  ?? [];
  return localStorage.setItem("expenses", 
  JSON.stringify([...existingExpenses, newItem]))
}


//delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key);
}

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => 
  {
    //check expense id === budgetId
    if(expense.budgetId !== budgetId) return acc

    return acc += expense.amount
  }, 0)
  return budgetSpent
}

//FORMATTING

//formatting percentages
export const formatPercentage = (amt) => 
{
  return amt.toLocaleString(undefined,{
    style: "percent",
    minimumFractionDigits: 0,
  } )
}

//format mata uang
export const formatCurrency = (amt) => {
  return amt.toLocaleString("id-ID")
}
