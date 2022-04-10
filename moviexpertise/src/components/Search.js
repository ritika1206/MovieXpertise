import axios from "axios";
import { useContext, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import Context from "../context/all";
import UserContext from "../context/userContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import Movie from "./Movie";
import classes from "./Search.module.css";

const Search = () => {

    const [serachSuccess, setSearchSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const History = useHistory();
    const ctx = useContext(UserContext);

    let movieTitle;
    const titleChangeHandler = (event) => {
        movieTitle = event.target.value;
    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(movieTitle);
        setIsLoading(true);
        axios.get(`https://www.omdbapi.com/?apikey=b9bd48a6&t=${movieTitle}`)
        .then(data => {
            setIsLoading(false);
            console.log(data);
            setMovie(data.data);
            ctx.updateSM(data.data);
            if(data.data.Title !== undefined){
                setSearchSuccess(true);
                History.push(`/home/movie`);
            }
            else {
                alert("Movie does not exist, try seraching something else");
                History.replace("/home");
            }
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err);
            alert(err);
        })
    }

    return(
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className={classes.searchCont}>
            <form className={classes.Form} onSubmit={submitHandler}>
                <input type="text" placeholder="Enter movie name" className={classes.searchBar} onChange={titleChangeHandler}/>
                <button type="submit" className={classes.searchBtn} onSubmit={submitHandler}>Search</button>
            </form>
            {console.log("movie from serach component")}
            {console.log(movie)}
            {/* {serachSuccess && 
                <Movie movie={movie}/>
            } */}
            {/* <Route path="/home/movie">
                <Movie movie={movie}/>
            </Route> */}
            </div>
        </>
    );
}

export default Search;