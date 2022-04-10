import Sidebar from "../UI/Sidebar";
import CreatedMovielist from "./CreatedMovielists";
import classes from "./Home.module.css";
import Profile from "./Profile";
import { Route, Redirect } from "react-router-dom";
import Search from "./Search";
import CreateMovielist from "./CreateMovielist";
import { useContext, useState } from "react";
import Movie from "./Movie";
import UserContext from "../context/userContext";
import ShowMovielist from "./ShowMovielist";

const Home = (props) => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showCMLForm, setShowCMLForm] = useState(false);
    const ctx = useContext(UserContext);

    const toggleSearchBar = () => {
        setShowSearchBar(prev => !prev);
    }

    const toggleCMLForm = () => {
        setShowCMLForm(prev => !prev);
    }
    return(
        <div className={classes.home}>
            <Sidebar toggleSearch={toggleSearchBar} toggleCML={toggleCMLForm} setToken={props.setToken}/>
            <div className={classes.contents}>
                { showSearchBar && <Search /> }
                { localStorage.getItem("token") && showCMLForm && <CreateMovielist /> }
                { localStorage.getItem("token") && 
                <Route path="/home/profile" exact>
                    <Profile />
                </Route>
                }
                <Route path="/home/movie">
                    <Movie movie={ctx.searchedMovie}/>
                </Route>
                <Route path="/home" exact>
                    <CreatedMovielist />
                </Route>
                <Route path="/home/movielist/" exact>
                    <ShowMovielist />
                </Route>
            </div>
        </div>
    );
}

export default Home;