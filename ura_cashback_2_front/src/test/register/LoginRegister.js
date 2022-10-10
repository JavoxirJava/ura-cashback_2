import React, {Component} from 'react';
import './login.css';

class Login extends Component {
    render() {
        let isLogin = false;

        const submit = () => {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            isLogin = (username === "user" && password === "123");
        }

        return (
            <>
                <form className="log">
                    <source/>
                    <h3>Sign In</h3>
                    <div className="username">
                        <label>username</label>
                        <input type="text" id="username" placeholder="Enter username" onChange={submit}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" id="password" placeholder="Enter password" onChange={submit}/>
                    </div>
                    <div>
                        <button className={isLogin ? "login-true" : "login-false"} type="button" onClick={submit}>Submit</button>
                    </div>
                </form>
            </>
        );
    }
}

Login.propTypes = {};

export default Login;
