import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import classes from "./Movielist.module.css";

const Movielist = (props) => {

    const History = useHistory();
    const clickHandler = () => {
        History.replace("/home/movilist");
    }

    console.log(props.movielist.name);
    return(
        <h3 className={classes.movielistTitle} onClick={clickHandler}>{props.movielist.name}</h3>
        // <div className={classes.movielist}>
        //     <h3 className={classes.movielistTitle}>{props.movielist.name}</h3>
        //     <Route path="/home/movielist">
                
        //     </Route>
        // </div>
    );
}

export default Movielist;