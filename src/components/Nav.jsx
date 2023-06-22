//important import
import { Form, NavLink } from "react-router-dom";

//library
import { TrashIcon } from "@heroicons/react/24/outline";

//assets
import logomark from "../assets/logomark.svg"

const Nav = ({ userName })=> {
    return (
        <nav>
            <NavLink to="/" aria-label="Go Home">
                <img src={logomark} height={ 30 } alt="" />
                <span>Budgeting App</span>
            </NavLink>
            {
                userName && (
                    <Form method="post" action="/logout" onSubmit={(event) => 
                        { if (!confirm("Delete user and all data?")) 
                            event.preventDefault() }
                        }>
                        <button type="submit" className="btn btn--warning">
                            <span>Delete User</span>
                            <TrashIcon width={18}/>
                        </button>
                    </Form>
                )
            }
        </nav>
    )
}


export default Nav;