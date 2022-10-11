import React, {Component} from 'react';
import "./orderC.css"
import {Button, FormGroup, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Table} from "reactstrap";
import {getOrder, saveOrder} from "../../redux/actions/AppAction";
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

        const saveOrders = () => {
            let obj;
            let comment = document.getElementById("comment").value;
            let cash_price = document.getElementById("cash_price").value;
            let cashback = document.getElementById("cashback").value;
            let id = currentItem.id ? currentItem.id : null;

            if (currentItem.id) {
                obj = {id, comment, cash_price, cashback}
            } else {
                obj = {comment, cash_price, cashback}
            }
            this.props.dispatch(saveOrder(obj))
        }


        // const deleteOrders = () => {
        //     this.props.dispatch(delOrder(currentItem))
        // }


        return (
            <div>
                <div className="ms-5 me-5">

                    <Table style={{marginTop: "120px"}}>
                        <thead>
                        <tr>
                            <th>Status</th>
                            <th>Cash price</th>
                            <th>Cashback</th>
                            <th>Comment</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                        </thead>
                        {orders.length != null &&
                            orders.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>Accepted</td>
                                    <td>{item.cash_price}</td>
                                    <td>{item.cashback}</td>
                                    <td>{item.comment}</td>
                                    <td><Button color="warning" outline
                                                onClick={() => openModal(item)}>Edit</Button></td>
                                    <td><Button color="danger" outline
                                                onClick={() => openDeleteModal(item)}>Delete</Button></td>
                                </tr>
                                </tbody>
                            )
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
                                {currentItem ? "Edit Order" : "Add order"}
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <strong>
                                    <FormGroup>
                                        <Label for="examplePassword">Comment</Label>
                                        <Input type="text" name="comment" id="comment"
                                               placeholder="Please enter comment" required={true}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">Comment</Label>
                                        <Input type="number" name="cashback" id="cashback"
                                               placeholder="Please enter cash back" required={true}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">Comment</Label>
                                        <Input type="number" name="cash_price" id="cash_price"
                                               placeholder="Please enter cash price" required={true}/>
                                        <Input type="text" name="comment" id="comment"
                                               placeholder="Please enter comment" required={true}
                                               defaultValue={currentItem ? currentItem.comment : ""}/>
                                    </FormGroup>
                                </strong>
                                <Button color="primary" onClick={saveOrders}>Save</Button>
                                <Button color='light' onClick={openModal}>Cancel</Button>
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
