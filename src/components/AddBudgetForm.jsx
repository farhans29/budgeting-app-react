import { Form } from "react-router-dom";

//library import
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Create budget
        </h2>
        <Form 
        method="post" 
        className="grid-sm">
            <div className="grid-xs">
                <label htmlFor="bewBudget">Kebutuhan</label>
                <input 
                type="newBudget" 
                id="newBudget" 
                placeholder="Belanjaan, ..." 
                required />
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Jumlah</label>
                <input 
                type="number"
                step="0.01"
                name="newBudgetAmount"
                id="newBudgetAmount"
                placeholder="Rp.50,500"
                required
                inputMode="decimal"
                 />
            </div>
            <button type="submit" className="btn btn--dark">
                <span>Tambah</span>
                <CurrencyDollarIcon width={23}/>
            </button>

        </Form>
    </div>
  )
}

export default AddBudgetForm;