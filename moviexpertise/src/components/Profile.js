import CreatedMovielist from "./CreatedMovielists";
import { Link, useHistory } from "react-router-dom";
import classes from "./Profile.module.css";
import { Route } from "react-router-dom";
import EditProfileForm from "./EditProfileForm";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import axios from "axios";
import LoadingSpinner from "../UI/LoadingSpinner";

const Profile = () => {
    const ctx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const History = useHistory();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:5000/api/user/profile/${ctx.user.userId}`)
        .then(data => {
            setIsLoading(false);
            ctx.updateUser(data.data);
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err.response.data.message);
            alert(err.response.data.message);
        })
    }, [ctx]);

    const deleteProfileHandler = () => {
        setIsLoading(true);
        axios.delete(`http://localhost:5000/api/user/delete-profile/${ctx.user.userId}`)
        .then((data) => {
            setIsLoading(false);
            localStorage.removeItem('token');
            alert("Profile deleted successfully");
            History.replace("/login");
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err.response.data.message);
            alert(err.response.data.message);
        })
    }

    
    return(
        <>
            {isLoading && <LoadingSpinner asOverlay />}
             <div className={classes.Prof}>
                <Route path="/home/profile">
                    <div className={classes.ProCont}>
                        <label className={classes.wlcmLbl}>WELCOME <h1 className={classes.title}>{` ${ctx.user.uname}`}</h1></label>
                        <CreatedMovielist />
                        <div className={classes.crudProf}>
                            <Link to="/home/profile/edit-profile" className={classes.crudLink}>Edit Profile</Link>
                            <Route path="/home/profile/edit-profile" exact >
                                <EditProfileForm />
                            </Route>
                            {/* <Link to="/home/profile/delete-profile" className={classes.crudLink}>Delete Profile</Link> */}
                            <button type="button" onClick={deleteProfileHandler}>Delete Profile</button>
                        </div>
                    </div>
                </Route> 
            </div>
        </>
    );
}

export default Profile;