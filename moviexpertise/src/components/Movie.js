import axios from "axios";
import classes from "./Movie.module.css";
import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import LoadingSpinner from "../UI/LoadingSpinner";

const Movie = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const ctx = useContext(UserContext); 
    let movielist;
    const listVal = (event) => {
        movielist = event.target.value;
    }
    const addToMovieListHandler = (event) => {
        event.preventDefault();
        let ctxMovielist = ctx.movielists.find(list => {
            if(list.name === movielist.name)
                return list;
        });
        
        setIsLoading(true);
        axios.post(`http://localhost:5000/api/movielist/add-movie/${ctxMovielist._id}`, props.movie)
        .then(data => {
            alert(`${props.movie.Title} has been successfully added to ${ctx.movielist.name}`)
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err.response.data.message);
            alert(err.response.data.message)
        })
    }
    return(
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className={classes.movie}>
                {console.log(props.movie)}
                {console.log("the above is movie")}
                <img src={props.movie.Poster} className={classes.moviePoster}/>
                <div className={classes.movieInfoCont}>
                    <label className={classes.titleLbl}>MOVIE: <h1 className={classes.movieTitle}>{` ${props.movie.Title}`}</h1></label>
                    <label className={classes.lbl}>Realsed: <h4>{`${props.movie.Released}`}</h4></label>
                    <label className={classes.lbl}>Genre: <h4>{` ${props.movie.Genre}`}</h4></label>
                    <label className={classes.lbl}>Language: <h4>{` ${props.movie.Language}`}</h4></label>
                    <label className={classes.lbl}>Duration: <h4>{` ${props.movie.Runtime}`}</h4></label>
                    <label className={classes.lbl}>Director(s): <h4>{` ${props.movie.Director}`}</h4></label>
                    <label className={classes.lbl}>Writer(s): <h4>{` ${props.movie.Writer}`}</h4></label>
                    <label className={classes.lbl}>Actors: <h4>{` ${props.movie.Actors}`}</h4></label>
                    <label className={classes.lbl}>Country: <h4>{` ${props.movie.Country}`}</h4></label>
                    <label className={classes.lbl}>Imdb Rating: <h4>{` ${props.movie.imdbRating}`}</h4></label>
                    <h2 className={classes.moviePlot}>{`Plot`}</h2>
                    <p className={classes.plot}>
                        {props.movie.Plot}
                    </p>
                    <form onSubmit={addToMovieListHandler}>
                        <select name="movielist" className={classes.selectList} onChange={listVal}>
                        <option value="" disabled selected hidden>Add To MovieList</option>
                            {
                                ctx.movielists.map(movielist => {
                                    return <option value={`${movielist.name}`}>{`${movielist.name}`}</option>
                                }) 
                            }
                        </select>
                        <button type="submit">ADD</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Movie;