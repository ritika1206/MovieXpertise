import classes from "./Search.module.css";

const Search = () => {
    return(
        <div className={classes.searchCont}>
            <form className={classes.Form}>
                <input type="text" placeholder="Enter movie name" className={classes.searchBar}/>
                <button type="submit" className={classes.searchBtn}>Search</button>
            </form>
        </div>
    );
}

export default Search;