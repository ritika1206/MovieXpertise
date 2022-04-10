import { useContext } from "react";
import UserContext from "../context/userContext";
import classes from "./CreatedMovielists.module.css";
import MovieThumbNail from "./MovieThumbNail";

const ShowMovielist = () => {
    
    const queryParams = new URLSearchParams(window.location.search);
    let id = queryParams.get('listId');
    const ctx = useContext(UserContext);

    let movielist = ctx.movielists.find(movielist => movielist._id === id);

    const arrayChunk = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0, n));
        return chunks;
    };

    return(
        <>
            <div className={classes.pContainer}>
            <h1 className={classes.title}>{ localStorage.getItem("token") ? "CREATED MOVIELISTS" : "TRENDING MOVIELISTS"}</h1>
            <div className={classes.movieListsCont}>
                {    
                    arrayChunk(movielist, 6).map((row, i) => (
                        <div key={i} className={classes.row}>
                          {row.map((col, i) => (
                            <span key={i} className={classes.movielist}><MovieThumbNail movie={col}/></span>
                          ))}
                        </div>
                      ))
                }
            </div>
            </div>
        </>
    );
}

export default ShowMovielist;