import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const [user, setUser] = useState(null);
    const [movielists, setMovielists] = useState([]);
    const [searchedMovie, setSearchedMovie] = useState();

    const updateUser = (user) => {
        setUser(user);
    }
    const updateMovielists = (movielist) => {
        setMovielists(prev => [...prev, movielist]);
    } 
    const updateSM = (movie) => {
        setSearchedMovie(movie);
    }

    return(
        <UserContext.Provider value={{user, updateUser, movielists, updateMovielists, searchedMovie, updateSM}} >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;