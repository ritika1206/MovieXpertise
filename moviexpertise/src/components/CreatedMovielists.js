import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./CreatedMovielists.module.css";
import Movielist from "./Movielist";
import axios from "axios";

const CreatedMovielist = (props) => {
    const ctx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    // if authenticated then fetch movielists of that user
    // if unauthenticated then fetch all the public movielists
    const [movieLists, setMovieLists] = useState([]);

    const arrayChunk = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0, n));
        return chunks;
      };

    // if(localStorage.getItem("token") && ctx.user) {
    //     setMovieLists(ctx.user.movielists);
    // }
    // else {
    //     setIsLoading(true);
    //     axios.get('http://localhost:5000/api/movielist/public-movielists')
    //             .then(data => {
    //                 console.log(data);

    //                 setIsLoading(false);
    //                 setMovieLists(data);
    //             })
    //             .catch(err => {
    //                 setIsLoading(false);

    //                 console.log(err.response.data.message);     // NodeJS app sending an error
    //                 alert(err.response.data.message)
                    
    //             });
    // }

    return(
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className={classes.pContainer}>
            <h1 className={classes.title}>{ localStorage.getItem("token") ? "CREATED MOVIELISTS" : "TRENDING MOVIELISTS"}</h1>
            <div className={classes.movieListsCont}>
                {
                    // ctx.movielists.map((movielist, index) => {
                    //     console.log(movielist);
                        
                    //     return(
                    //      index%3 == 0 ? <div className="row mx-auto"> : null
                    //     <Movielist movielist={movielist}/>
                    //      index%3 == 0 ? </div> : null
                    //     );    
                    // })

                    arrayChunk(ctx.movielists, 6).map((row, i) => (
                        <div key={i} className={classes.row}>
                          {row.map((col, i) => (
                            <span key={i} className={classes.movielist}><Movielist movielist={col}/></span>
                          ))}
                        </div>
                      ))
                }
            </div>
            </div>
        </>
    );
}

export default CreatedMovielist;