import LoginForm from "./components/auth/LoginForm";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignupForm from "./components/auth/SignupForm";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
        <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route>
          <LoginForm />
        </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
