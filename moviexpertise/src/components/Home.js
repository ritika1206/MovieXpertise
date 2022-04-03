import Sidebar from "../UI/Sidebar";
import CreatedMovielist from "./CreatedMovielists";
import classes from "./Home.module.css";
import Profile from "./Profile";
import { Route, Redirect } from "react-router-dom";
import Search from "./Search";
import CreateMovielist from "./CreateMovielist";
import { useState } from "react";

const Home = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showCMLForm, setShowCMLForm] = useState(false);

    const toggleSearchBar = () => {
        setShowSearchBar(prev => !prev);
    }

    const toggleCMLForm = () => {
        setShowCMLForm(prev => !prev);
    }
    return(
        <div className={classes.home}>
            <Sidebar toggleSearch={toggleSearchBar} toggleCML={toggleCMLForm}/>
            <div className={classes.contents}>
                { showSearchBar && <Search /> }
                { showCMLForm && <CreateMovielist /> }
                <Route path="/home/profile" exact>
                    <Profile />
                </Route>
                <Route path="/home" exact>
                    <CreatedMovielist />
                </Route>
                <Route path="/home/profile/edit-profile" exact>

                </Route>
                <Route path="/home/profile/delete-profile" exact>
                    {/* <Redirect path="/login" /> */}
                </Route>
            </div>
        </div>
    );
}

export default Home;