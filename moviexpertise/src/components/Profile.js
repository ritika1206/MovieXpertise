import CreatedPlaylist from "./CreatedMovielists";
import { Link } from "react-router-dom";
import classes from "./Profile.module.css"

const Profile = () => {
    return(
        <div className={classes.Prof}> 
            <h1 className={classes.title}>WELCOME RITIKA</h1>
            <CreatedPlaylist />
            <div className={classes.crudProf}>
                <Link to="/home/profile/edit-profile" className={classes.crudLink}>Edit Profile</Link>
                <Link to="/home/profile/delete-profile" className={classes.crudLink}>Delete Profile</Link>
            </div>
        </div>
    );
}

export default Profile;