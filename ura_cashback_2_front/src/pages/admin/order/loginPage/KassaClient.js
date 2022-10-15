import React, {useState} from 'react';
import image from "./image/logo.png";
import "./style.scss";
import {Button, Input} from "reactstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {findByUserPhoneNumber} from "../../../../redux/actions/AppAction";
import OrderAdd from "./OrderAdd";
import Kassa from "./Kassa";

function KassaClient(props) {

    const {dispatch, activeUser} = props;

    const submit = () => {
        dispatch(findByUserPhoneNumber(document.getElementById("phoneNumber").value));
    }

    const [back, setBack] = useState(true);

    const setBackClick = () => {
        setBack(!back);
    }

    return (
        <>{back
            ? <div>
                {activeUser
                    ? <OrderAdd/>
                    : <div className="login">
                        <div className="login-page client">
                            <div className="kassa-nav">
                                <Link to="/">
                                    <i className="bi bi-arrow-left-circle-fill">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                             fill="currentColor" onClick={setBackClick}
                                             className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                        </svg>
                                    </i>
                                </Link>
                                <img src={image} alt="Icon"/>
                            </div>
                            <Input type="text" placeholder="Номер телефона" id="phoneNumber"
                                   className="mt-5 fw-semibold p-3 ms-1 me-1"/>
                            <p>Введите номер телефона клиента или <br/> qr-код +998901235678</p>
                            <Button style={{
                                backgroundColor: "#5468FF",
                                height: "50px",
                                fontFamily: "'Museo Sans Cyrl', sans-serif"
                            }}
                                    className="btn btn-primary form-btn-login w-100" type="button"
                                    onClick={submit}><b>ПРОДОЛЖИТЬ</b></Button>
                        </div>
                    </div>
                }
            </div>
            :
            <Kassa/>
        }
        </>
    );
}

KassaClient.propTypes = {};

export default connect(({app: {dispatch, activeUser}}) =>
    ({dispatch, activeUser}))
(KassaClient);
