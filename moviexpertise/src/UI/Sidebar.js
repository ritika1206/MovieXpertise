import { Link, useHistory } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = (props) => {
    const History = useHistory();
    const logoutHandler = () => {
        props.setToken();
        localStorage.removeItem('token');
        History.replace("/login");
    }
    const brandClickHandler = () => {
        History.replace("/home");
    }

    return(
        <div className="sidebar">
            <div className="links">
                <Link to="#" className="Link" onClick={props.toggleSearch}>Search</Link>
                <Link to="#" className="Link" onClick={props.toggleCML}>Create Movielist</Link>
                <Link to="/home/profile" className="Link">Profile</Link>
                <button to="/logout" className="logoutBtn" onClick={logoutHandler}>Logout</button>
            </div>
            <div>
                <h1 onClick={brandClickHandler} className="sideBarBrand">MovieXpertise</h1>
            </div>
        </div>
    );
}

export default Sidebar;