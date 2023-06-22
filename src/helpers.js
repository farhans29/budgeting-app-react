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
    createAt: Date.now(),
    amount: +amount,

    //color:
    color: generateRandomColor()
  }
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem("budgets", 
  JSON.stringify([...existingBudgets, newItem]))
}

//delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key);
}