import classes from "./MovielistForm.module.css";

const CreateMovielist = () => {
    return(
        <div className={classes.createCont}>
            <form className={classes.Form}>
                <input type="text" placeholder="Enter Movielist Name" className={classes.createBar}/>
                <button type="submit"className={classes.createBtn}>Create Movielist</button>
            </form>
        </div>
    );
}

export default CreateMovielist;