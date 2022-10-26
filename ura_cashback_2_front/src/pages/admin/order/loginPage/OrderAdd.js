import React, {useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import image from "./image/logo.png";
import {Button, Input} from "reactstrap";
import {saveOrder} from "../../../../redux/actions/AppAction";
import Kassa from "./Kassa";

function OrderAdd(props) {

    const {dispatch, currentUser, currentAdmin} = props;
    console.log(currentAdmin, "currentAdmin")
    console.log(currentUser, "currentUser")

    const [back, setBack] = useState(true);
    const [open, setOpen] = useState(false);
    const [price,setPrice] = useState(0);
    const [resPrice,setResPrice] = useState(false);

    const setBackClick = () => {
        setBack(!back);
    }

    const addOrderSend = () => {
        let cash_price = document.getElementById("cash_price").value;
        let cashback = document.getElementById("cashback").value;
        dispatch(saveOrder({adminId: currentAdmin.id, clientId: currentUser.id, cash_price, cashback}));
    }

    const openModal = ()=>{
        setOpen(!open);
    }

    const openPrice = ()=>{
        setResPrice(!resPrice);
        let cashPrice = document.getElementById("cash_price").value;
        if(!open){
            let cashback = document.getElementById("cashback").value;
            let obj = setPrice(cashPrice - cashback);
            dispatch(saveOrder(obj))
        }else {
            let obj2 = setPrice(cashPrice - currentUser.salary);
            dispatch(saveOrder(obj2))
        }

    }


    return (
        <>
            {back
            ? <div className="login">
                    <div className="login-page client">
                        <div className="kassa-nav">
                            <Link to="/">
                                <i className="bi bi-arrow-left-circle-fill">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" onClick={setBackClick}>
                                        <path
                                            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                    </svg>
                                </i>
                            </Link>
                            <img src={image} alt="Icon"/>
                        </div>
                        <p>Name: {currentUser.firstName} {currentUser.lastName}</p>
                        <p>userCashback: {currentUser.salary}</p>
                        <Button className="ms-1" style={{marginTop:"20px"}} outline color="info" onClick={()=> openModal()}>All cashback</Button>
                        {resPrice ?
                        <Input type="number" value={price} id="cash_price" className="mt-3 mb-5 fw-semibold p-3 ms-1 me-1"/> :
                            <Input type="number"  placeholder="cash_price"  id="cash_price" className="mt-3 mb-5 fw-semibold p-3 ms-1 me-1"/>
                        }
                        {open ?
                        <Input type="text" value={currentUser.salary} id="cashback" className="mt-5 mb-5 fw-semibold p-3 ms-1 me-1"/>  :
                            <Input type="number"   placeholder="cashback"  id="cashback" className="mt-5 mb-5 fw-semibold p-3 ms-1 me-1"/>
                        }
                        <Button style={{
                            backgroundColor: "#5468FF",
                            height: "50px",
                            fontFamily: "'Museo Sans Cyrl', sans-serif"
                        }}
                                className="btn btn-primary form-btn-login w-100 mt-5"
                                type="button"
                                onClick={addOrderSend}
                        ><b>ПРОДОЛЖИТЬ</b></Button>
                    </div>
                </div>
                : <Kassa/>
            }

        </>
    );
}

OrderAdd.propTypes = {};

export default connect(
    ({app: {activeUser, dispatch, currentUser, currentAdmin, showModal}}) =>
        ({activeUser, dispatch, currentUser, currentAdmin, showModal}))
(OrderAdd);
