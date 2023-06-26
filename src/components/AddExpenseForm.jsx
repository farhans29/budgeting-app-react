//import react
import { useEffect, useRef } from "react";

//import react router dom
import { useFetcher } from "react-router-dom";

//import library
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();
    useEffect(() => {
        if(!isSubmitting){
            //clear form
            formRef.current.reset()
            //reset focus
            focusRef.current.focus()
        }
    })

  return (
    <div className="form-wrapper">
        <h2 className="h3">Tambahkan Pengeluaran{" "}
        <span className="accent">
            {budgets.length === 1 && `${budgets.map
                ((budg) => (budg.name))}`}
            </span></h2>
            <fetcher.Form
            method="post"
            className="grid-sm"
            ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Nama Barang</label>
                        <input 
                        type="text"
                        name="newExpense"
                        placeholder="Kopi, Nasi Goreng..."
                        ref={focusRef}
                        required />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Jumlah</label>
                        <input 
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        name="newExpenseAmount"
                        id="newExpenseAmount"
                        placeholder="10000"
                        required />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            budgets.sort((a,b) => a.createdAt - b.createdAt).map((
                                budget => { 
                                    return (
                                    <option key={budget.id} value={budget.id}>
                                        {budget.name} 
                                    </option>
                            )}))
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    isSubmitting ? <span>Menambahkan... </span> 
                    : (
                        <>
                            <span>Tambah Pengeluaran</span>
                            <PlusCircleIcon width={23}/>
                        </>
                    )
                }
            </button>
            </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm;