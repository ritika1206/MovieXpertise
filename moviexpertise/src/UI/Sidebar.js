import { Link } from "react-router-dom";

const Sidebar = () => {
    return(
        <div>
            <Link to="/search">Search</Link>
            <Link to="create-playlist">Create Playlist</Link>
            <Link to="profile">Profile</Link>
            <Link to="logout">Logout</Link>
        </div>
    );
}

export default Sidebar;