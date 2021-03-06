import classes from "./Form.module.css";
import Card from "../../UI/Card";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useInput from "../../Hooks/use-input";
import { useContext, useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";

import axios from 'axios';
import UserContext from "../../context/userContext";

const LoginForm = (props) => {
    const History = useHistory();
    const ctx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const {
        val: enteredEmail,
        hasErr: EmailHasErr,
        valChangeHandler: EmailChangeHandler,
        blurHandler: EmailBlurHandler,
        valIsValid: EmailIsValid
    } = useInput(val => val.includes("@"));

    const {
        val: enteredPass,
        hasErr: PassHasErr,
        valChangeHandler: PassChangeHandler,
        blurHandler: PassBlurHandler,
        valIsValid: PassIsValid
    } = useInput(val => val.trim().length >= 7);

    const submitHandler = async (event) => {
        event.preventDefault();
        EmailBlurHandler();
        PassBlurHandler();
        
        if(!EmailIsValid || !PassIsValid)
            return;
        
            const data = {
                email: enteredEmail,
                password: enteredPass
            }

            console.log(ctx)
            setIsLoading(true);
            axios.post('http://localhost:5000/api/auth/login', data)
                .then(data => {
                    setIsLoading(false);
                    console.log(data)
                    localStorage.setItem("token", data.data.token);
                    ctx.updateUser(data.data);
                    props.setToken();
                    History.replace("/home");
                })
                .catch(err => {
                    setIsLoading(false);
                    console.log(err.response.data.message);
                    alert(err.response.data.message)
                })
    }

    const mailErrCls = EmailHasErr? classes.inErr : ""
    const pErrCls = PassHasErr? classes.inErr : ""


    return(
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className={classes.landingContainer}>
                <div className={classes.brand}>
                    <h1>MovieXpertise</h1>
                </div>
                <div className={classes.formDiv}>
                    <Card class="Form">
                    <form className={classes.Form} onSubmit={submitHandler}>
                        <label htmlFor="email">E-Mail</label>
                        <input 
                            className={mailErrCls}
                            type="email"
                            onChange={EmailChangeHandler}
                            id="email"
                            onBlur={EmailBlurHandler}
                            value={enteredEmail}
                            />
                        {EmailHasErr && <p className={classes.errMsg}>Please enter a valid Email</p>}
                        <label htmlFor="pass">Password</label>
                        <input 
                            className={pErrCls} 
                            type="password" 
                            onChange={PassChangeHandler} 
                            id="pass"
                            onBlur={PassBlurHandler}
                            value={enteredPass}
                            />
                        {PassHasErr && <p className={classes.errMsg}>Password should have atleast 7 characters</p>}
                        <button type="submit">Login</button>
                    </form>
                    <div className={classes.linkTo}>
                        <Link to="/signup" className={classes.link}>Signup if not registered</Link>
                    </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default LoginForm;