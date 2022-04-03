import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = (props) => {
    return(
        <div className="sidebar">
            <div className="links">
                <Link to="#" className="Link" onClick={props.toggleSearch}>Search</Link>
                <Link to="#" className="Link" onClick={props.toggleCML}>Create Movielist</Link>
                <Link to="/home/profile" className="Link">Profile</Link>
                <Link to="/logout" className="Link">Logout</Link>
            </div>
            <div>
                <h1>MovieXpertise</h1>
            </div>
        </div>
    );
}

export default Sidebar;