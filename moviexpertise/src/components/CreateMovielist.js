import axios from "axios";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/userContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./MovielistForm.module.css";
import jwt_decode from "jwt-decode";

const CreateMovielist = () => {
    let decoded;
    let movielist = {
        name: null,
        userId: null,
        movies: [],
        visibility: null
    }

    const [isLoading, setIsLoading] = useState(false);
    const ctx = useContext(UserContext);

    const nameChangeHandler = (event) => {
        movielist.name = event.target.value;
    }
    const visibilityChangeHandler = (event) => {
        movielist.visibility = event.target.value;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("HeH");
        console.log(ctx);
        // console.log(ctx.user)

        if(localStorage.getItem('token')){
            decoded = jwt_decode(localStorage.getItem('token'));
            movielist.userId = decoded.userId;
            // console.log("here is the decoded token");
            // console.log(decoded);
        }
        console.log(movielist);

        setIsLoading(true);
        axios.post(`http://localhost:5000/api/movielist/${decoded.userId}/create-movielist`, movielist)
        .then(data => {
            setIsLoading(false);
            console.log("here is the movielist data");
            console.log(data);
            ctx.updateMovielists(data.data);
            alert(`${movielist.name} has been successfully added`);
        })
        .catch(err => {
            setIsLoading(false);
            console.log(ctx.user)
            console.log(err.response.data.message);
            alert(err.response.data.message);
        })
    }
    return(
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className={classes.createCont}>
                <form className={classes.Form} onSubmit={submitHandler}>
                    <input type="text" placeholder="Enter Movielist Name" className={classes.createBar} name="name" onChange={nameChangeHandler}/>
                    <select name="visiblity" className={classes.visibility} placeholde="visibility" onChange={visibilityChangeHandler}>
                        <option value="" disabled selected hidden>visibility</option>
                        <option value="public">public</option>
                        <option value="private">private</option>
                    </select>
                    <button type="submit"className={classes.createBtn} >Create Movielist</button>
                </form>
            </div>
        </>
    );
}

export default CreateMovielist;