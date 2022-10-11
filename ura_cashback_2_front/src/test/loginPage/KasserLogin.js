import React from 'react';
import {connect} from "react-redux";
import "./style.scss";
import logo from "./image/logo.png";
import {Button, Input} from "reactstrap";

function KasserLogin(props) {

    const {dispatch} = props;

    return (
        <>
            <div className="login">
                <div className="login-page">
                    <h4 className="text-center">Кассир</h4>
                    <div className="big-logo-box">
                        <img src={logo} alt="URA cashback"/>
                    </div>

                    <div className="login-form inputs">
                        <div className="login-form-container">
                            <Input type="number" placeholder="Номер телефона" className="login-form-input mt-5"/>
                            <Input type="text" placeholder="Пароль" className="login-form-input mt-4"/>
                        </div>
                        <h3 style={{color: "red"}} id="error"> </h3>
                        <Button className="btn btn-primary form-btn-login w-100" type="button">
                            Войти
                            <span className="form-btn-icon">
                                <img src="https://kassa.uracashback.uz/assets/cashier/assets/images/arrow-right.svg"
                                     className="form-btn-svg" alt="Icon"/>
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

        </>
    );
}

KasserLogin.propTypes = {};

export default connect(({app: {dispatch}}) => ({dispatch}))
(KasserLogin);
