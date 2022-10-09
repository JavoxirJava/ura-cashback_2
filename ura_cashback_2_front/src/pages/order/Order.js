import React, {Component} from 'react';
import "./orderC.css"
import {Button, FormGroup, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Table} from "reactstrap";
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
        console.log(showModal)
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
                                    <td>
                                        <p> Accepted
                                        </p>
                                    </td>

                                    <td>
                                        <p>{item.cash_price}</p>
                                    </td>
                                    <td>
                                        <p>{item.cashback}</p>
                                    </td>
                                    <td>
                                        <p>{item.comment}</p>
                                    </td>
                                    <td>

                                    </td>
                                    <td><Button color="warning" outline onClick={() => openModal(item)}>Edit</Button>
                                    </td>
                                    <td><Button color="danger" outline
                                                onClick={() => openDeleteModal(item)}>Delete</Button></td>
                                </tr>

                                </tbody>
                            )
                            : " Malumot mavjud emas"
                        }
                    </Table>
                    <div>
                        <Button
                            color="primary"
                            onClick={openModal}>
                            Open
                        </Button>
                        <Offcanvas isOpen={showModal}>
                            <OffcanvasHeader toggle={openModal}>
                                {"Add order"}
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <strong>
                                    <FormGroup>
                                        <Label for="examplePassword">Comment</Label>
                                        <Input type="text" name="comment" id="comment" placeholder="Please enter comment" required={true} defaultValue={currentItem.id ? currentItem.comment : ""}/>
                                    </FormGroup>
                                </strong>
                            </OffcanvasBody>
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