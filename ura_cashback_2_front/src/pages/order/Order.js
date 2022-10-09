import React, {Component} from 'react';
import "./orderC.css"
import {Button, Offcanvas, OffcanvasBody, OffcanvasHeader, Table} from "reactstrap";
import {getOrder, saveOrder} from "../../redux/actions/AppAction";
import {deleteOrder} from "../../api/AppApi";
import {connect} from "react-redux";

class Order extends Component {
    componentDidMount() {
        this.props.dispatch(getOrder())
    }

    state = {
        infoModal: false
    }

    render() {

        const {orders, showModal, deleteModal, currentItem, dispatch} = this.props;

        const openModal = (item) => {
            dispatch({
                type: 'updateState',
                payload: {
                    showModal: !showModal,
                    currentItem: item
                }
            })
        };
        const openDeleteModal = (item) => {
            dispatch({
                type: 'updateState',
                payload: {
                    deleteModal: !deleteModal,
                    currentItem: item
                }
            })
        };

        const saveOrders = (e) => {
            let obj;
            let id = currentItem.id ? currentItem.id : null;
            let comment = document.getElementById("comment").value;
            let cash_price = document.getElementById("cash_price").value;
            let cashback = document.getElementById("cashback").value;

            if (currentItem.id) {
                obj = {id, comment, cash_price, cashback}
            } else {
                obj = {comment, cash_price, cashback}
            }
            this.props.dispatch(saveOrder(obj))
        }
        const deleteOrders = (e) => {
            this.props.dispatch(deleteOrder(currentItem))
        }


        return (
            <div>
                <div className="container" style={{textAlign: "center"}}>

                    <Table responsive="sm" style={{marginTop: "120px"}}>
                        <thead>
                        <tr>
                            <th>Status</th>
                            <th>Cash price</th>
                            <th>Cashback</th>
                            <th>Comment</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                        </thead>
                        {orders.length != null ?
                            orders.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>Accepted</td>
                                    <td>{item.cash_price}</td>
                                    <td>{item.cashback}</td>
                                    <td>{item.comment}</td>
                                    <td><Button color="warning" outline onClick={() => openModal(item)}>Edit</Button></td>
                                    <td><Button color="danger" outline onClick={() => openDeleteModal(item)}>Delete</Button></td>
                                </tr>
                                </tbody>
                            )
                            : " Malumot mavjud emas"
                        }
                    </Table>
                    <div>
                        <Button
                            color="primary"
                            onClick={showModal}>
                            Open
                        </Button>
                        <Offcanvas isOpen={showModal}>
                            <OffcanvasHeader>
                                {currentItem ? "Edit order" : "Add order"}
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <strong>
                                    This is the Offcanvas body.
                                </strong>
                            </OffcanvasBody>
                            <Button color="success" onClick={showModal}/>
                        </Offcanvas>
                    </div>
                </div>
            </div>

        );
    }
}

Order.propTypes = {};

export default connect(
    ({app: {orders, showModal, deleteModal, currentItem}}) =>
        ({orders, showModal, deleteModal, currentItem}))
(Order);
