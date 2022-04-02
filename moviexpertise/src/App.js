import LoginForm from "./components/auth/LoginForm";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Switch>
        <Route path="/">
          <LoginForm />
        </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
