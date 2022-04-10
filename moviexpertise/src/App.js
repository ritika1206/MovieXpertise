import LoginForm from "./components/auth/LoginForm";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignupForm from "./components/auth/SignupForm";
import Home from "./components/Home";
import { useContext, useEffect, useState } from "react";
import UserContext from "./context/userContext";
import axios from "axios";
import jwt_decode from "jwt-decode";

function App() {
  const [ authToken, setAuthToken ] = useState(localStorage.getItem('token'));
  const ctx = useContext(UserContext);
  let decoded;

  useEffect(() => {
    const settingUser = () => {
      if(localStorage.getItem('token')){
        decoded = jwt_decode(localStorage.getItem('token'));
        console.log("here is the decoded token");
        console.log(decoded);
    
        axios.get(`http://localhost:5000/api/user/profile/${decoded.userId}`)
        .then(user => {
          console.log("here is the stable user");
          console.log(user)
          ctx.updateUser(user.data);
        })
        .catch(err => {
          console.log(err);
        })

        axios.get(`http://localhost:5000/api/user/movielists/${decoded.userId}`)
        .then(movielists => {
          console.log(movielists);
          movielists.data.map(movielist => {
            ctx.updateMovielists(movielist);
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
    settingUser();
  }, []);

  const authTokenHandler = () => {
    setAuthToken(prev => {
      if(prev)
        return null;
      else 
        return localStorage.getItem('token')
    })
  }

  let routes;
  console.log(authToken);
  console.log(ctx);
  
  if(authToken) {
    routes = (
        <Switch>
          <Route path="/home">
            <Home setToken={authTokenHandler} />
          </Route>
          <Route>
            <Home setToken={authTokenHandler}/>
          </Route>
        </Switch>
    );
  }

  else {
    routes = (
        <Switch>
          <Route path="/login">
            <LoginForm setToken={authTokenHandler}/>
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/home">
            <Home setToken={authTokenHandler} />
          </Route>
          <Route>
            <LoginForm />
          </Route>
        </Switch>
    );
  }
  return (
    <BrowserRouter>
        {routes}
    </BrowserRouter>
  );
}

export default App;
