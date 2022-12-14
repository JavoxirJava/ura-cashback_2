import React, {useState} from 'react';
import {Link} from "react-router-dom";
import image from "./image/logo.png";
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {Button, Input, Label, Row} from "reactstrap";
import {saveOrder} from "../../../../redux/actions/AppAction";
import {connect} from "react-redux";
import Kassa from "./Kassa";


function OrderAdd(props) {
    const {dispatch, currentUser, currentAdmin, modal} = props;


    const [back, setBack] = useState(true);
    const [open, setOpen] = useState(false);
    const [res, setRes] = useState(false);

    let cashback, cash_price;

    const isModal = () => {
        dispatch({
            type: 'updateState',
            payload: {
                modal: !modal
            }
        });
    }

    const setBackClick = () => {
        setBack(!back);
    }

    const addOrderSend = () => {
        cash_price = document.getElementById("cash_price").value;
        cashback = document.getElementById("cashback").value;
        dispatch(saveOrder({adminId: currentAdmin.id, clientId: currentUser.id, cash_price, cashback}));
    }

    const openModal = () => {
        cash_price = document.getElementById("cash_price").value;
        cashback = document.getElementById("cashback").value;
        setOpen(!open);
    }

    const onChange = (item) => {
        setRes(currentUser.salary < item.target.value);
    const onChange = (item) =>{
        if(currentUser.salary < item.target.value){
            setRes(true)
        }else {
            setRes(false)
        }
    }


    return (
        <>
            {back
                ? <div className="login container">
                    <Row>
                        <div className="login-page client">
                            <div className="kassa-nav">
                                <Link to="/">
                                    <i className="bi bi-arrow-left-circle-fill">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                             className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"
                                             onClick={setBackClick}>
                                            <path
                                                d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                        </svg>
                                    </i>
                                </Link>
                                <img src={image} alt="Icon"/>
                            </div>
                            <p>Name: {currentUser.firstName} {currentUser.lastName}</p>
                            <p>userCashback: {currentUser.salary}</p>
                            <Input type="number" placeholder="cash_price" id="cash_price"
                                   className="mt-3 mb-5 fw-semibold p-3 ms-1 me-1"/>
                            {open ? <Input onChange={(item) => onChange(item)} type="text" placeholder="cashback"
                                           defaultValue={currentUser.salary} id="cashback"
                                           className="mt-3 mb-5 fw-semibold p-3 ms-1 me-1  float-start cash"/> :
                                <Input onChange={(item) => onChange(item)} type="text" placeholder="cashback" id="cashback"
                                       className="mt-3 mb-5 fw-semibold p-3 ms-1 me-1  float-start cash"/>}
                            <Button onClick={() => openModal()} className="orderButton">All</Button>
                            {res ? <small style={{color: "red"}}>kiritilgan cashback katta</small> : ""}
                            <Button style={{
                                backgroundColor: "#5468FF",
                                height: "50px",
                                fontFamily: "'Museo Sans Cyrl', sans-serif"
                            }}
                                    className="btn btn-primary form-btn-login w-100 mt-5"
                                    type="button"
                                    onClick={() => {
                                        addOrderSend();
                                    }}
                            ><b>????????????????????</b></Button>
                        </div>
                    </Row>
                        {res ? <small style={{color:"red",marginTop:"-30px"}}>  Sizda bu miqdardagi cashback yo'q</small> : ""}
                        {open
                            ? <Input max={currentUser.salary} type="number" value={currentUser.salary} id="cashback" className="mt-5 mb-5 fw-semibold p-3 ms-1 me-1 w-75 float-start"/>
                            : <Input max={currentUser.salary} type="number" placeholder="cashback"  id="cashback" className="mt-5 mb-5 fw-semibold p-3 ms-1 me-1 w-75 float-start"/>
                        }
                        <Row>
                            <Label check for="active">
                                <div className="form-check form-switch" style={{marginTop: "60%"}}>
                                    <Input className="mt-5" type="checkbox" defaultChecked={open} onChange={openModal}/>
                                </div>
                            </Label>
                        </Row>
                        {/*<input type="range" placeholder="nimadur" max={2}/>*/}

                        <Button style={{
                            backgroundColor: "#5468FF",
                            height: "50px",
                            fontFamily: "'Museo Sans Cyrl', sans-serif"
                        }}
                                className="btn btn-primary form-btn-login w-100 mt-5"
                                type="button"
                                onClick={addOrderSend}
                        ><b>????????????????????</b></Button>
                    </div>
                </div>
                : <Kassa/>
            }
            <Modal isOpen={modal} fullscreen="lg">
                <ModalHeader> </ModalHeader>
                <ModalBody>
                    <h4 className="text-center">Report</h4>
                    <Row>
                        <Col>
                            <h4>Kasser</h4>
                            <p>firstName: <b>{currentAdmin.firstName}</b></p>
                            <p>phoneNumber: <b>{currentAdmin.phoneNumber}</b></p>
                            <p>email: <b>{currentAdmin.email}</b></p>
                        </Col>

                        <Col>
                            <h4>User</h4>
                            <p>firstName: <b>{currentUser.firstName}</b></p>
                            <p>phoneNumber: <b>{currentUser.phoneNumber}</b></p>
                            <p>email: <b>{currentUser.email}</b></p>
                            <p>cashback: <b>{currentUser.salary}</b></p>
                        </Col>
                    </Row>
                    <p>naqt dan: <b>{cashback - cash_price}</b></p>
                    <p>cashback dan: <b>{cashback}</b></p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" outline onClick={isModal}>Cansel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

OrderAdd.propTypes = {};

export default connect(
    ({app: {activeUser, dispatch, currentUser, currentAdmin, showModal, modal}}) =>
        ({activeUser, dispatch, currentUser, currentAdmin, showModal, modal}))
(OrderAdd);
