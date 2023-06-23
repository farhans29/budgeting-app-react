import { useLoaderData } from "react-router-dom";

//helper function
import { createBudget, createExpense, fetchData, waaitt } from "../helpers";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

//library imports
import { toast } from "react-toastify";

//loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets }
}

//actions
export async function dashboardAction({request}){
    await waaitt();

    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    // create new user
    if(_action === "newUser"){
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome ${values.userName}`)
        } catch(e) {
            throw new Error("There was a problem creating account.")
        }
    }

    //create new budget
    if(_action === "createBudget"){
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget Ditambahkan")
        } catch (e) {
            throw new Error("Problem creating budget")
        }
    }

    //create new expense
    if(_action === "createExpense"){
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Pengeluaran ${values.newExpense} Ditambahkan`)
        } catch (e) {
            throw new Error("Problem creating expense")
        }
    }
}


const Dashboard = () => {
    const { userName, budgets } = useLoaderData()

    return (
        <>
                { 
                //function check username
                userName ? (
                    <div className="dashboard">
                        <h1>Welcome back, 
                            <span className="accent"> {userName}</span> 
                        </h1>
                        {/* function check budget */}
                        <div className="grid-sm">
                            {
                                budgets && budgets.length > 0 ?
                                (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddExpenseForm budgets={budgets} />
                                    </div>
                                </div> 
                                ) : (
                                    <div className="grid-sm">
                                        <p>Personal budgeting is secret to financial freedom</p>
                                        <p>Create a budget to get started!</p>
                                        <AddBudgetForm />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : <Intro/> 
            }
        </>
    )
}

export default Dashboard;