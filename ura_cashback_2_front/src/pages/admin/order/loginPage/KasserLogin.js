import {connect} from "react-redux";
import "./style.scss";
import logo from "./image/logo.png";
import {Button, Input} from "reactstrap";
import {loginOrderAction} from "../../../../redux/actions/AppAction";
import Kassa from "./Kassa";

function KasserLogin(props) {

    const {dispatch, showModal, companyId} = props;
    console.log(companyId, "company id")

    const orderLogin = () => {
        const phoneNumber = document.getElementById("phoneNumber").value;
        const password = document.getElementById("password").value;
        dispatch(loginOrderAction({phoneNumber, password,companyId}));
    }

    return (
        <>
            {showModal ?
                <Kassa/>
                : <div className="login">
                    <div className="login-page">
                        <h4 className="text-center">Кассир</h4>
                        <div className="big-logo-box">
                            <img src={logo} alt="URA cashback"/>
                        </div>
                        <div className="login-form inputs">
                            <div className="login-form-container">
                                <Input type="text" placeholder="Номер телефона" id="phoneNumber"
                                       className="login-form-input mt-5"/>
                                <Input type="text" placeholder="Пароль" id="password"
                                       className="login-form-input mt-4"/>
                            </div>
                            <h3 style={{color: "red"}} id="error"> </h3>
                            <Button
                                className="btn btn-primary form-btn-login w-100"
                                type="button"
                                onClick={orderLogin}
                            >
                                Войти
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

KasserLogin.propTypes = {};

export default connect(({app: {dispatch,companyId, currentUser, showModal}}) =>
    ({dispatch, currentUser, companyId, showModal}))
(KasserLogin);
