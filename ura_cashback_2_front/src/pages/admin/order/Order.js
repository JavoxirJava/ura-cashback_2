import React, {Component} from 'react';
import "./orderC.css"
import {
    Button,
    Col,
    Modal, ModalBody,
    ModalFooter,
    ModalHeader,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    Row,
    Table
} from "reactstrap";
import {delOrder, getOneUser, getOrder} from "../../../redux/actions/AppAction";
import {connect} from "react-redux";

class Order extends Component {
    componentDidMount() {
        this.props.dispatch(getOrder())
    }

    state = {
        infoModal: false,
        currentUserOrder: {},
    }

    render() {

        document.body.style.marginLeft = "3.7%";
        document.body.style.backgroundColor = "white"
        const {orders, deleteModal, currentItem, dispatch, currentUser} = this.props;

        // const openModal = (item) => {
        //     dispatch({
        //         type: 'updateState',
        //         payload: {
        //             showModal: !showModal,
        //             currentItem: item
        //         }
        //     });
        // };

        const infoModal = (user, admin) => {
            this.setState({currentUserOrder: user});
            this.props.dispatch(getOneUser(admin));
            openInfoModal();
        }

        const openInfoModal = () => {
            this.setState({infoModal: !this.state.infoModal});
        }

        const openDeleteModal = (item) => {
            dispatch({
                type: 'updateState',
                payload: {
                    deleteModal: !deleteModal,
                    currentItem: item
                }
            });
        };

        const deleteOrders = () => {
            this.props.dispatch(delOrder(currentItem));
            openDeleteModal("");
        }

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



        const deleteOrders = () => {
            this.props.dispatch(delOrder(currentItem));
            openDeleteModal("");
        }

        return (
            <div>
                <div className="ms-5 me-5 mt-5">
                    {/*<Button color="info" outline onClick={openModal}>Add Order</Button>*/}
                    <Table>
                        <thead>
                        <tr>
                            <th>Status</th>
                            <th>Cash price</th>
                            <th>Cashback</th>
                            <th>Comment</th>
                            <th colSpan="2">Action</th>
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
                                    <td><Button color="primary" outline
                                                onClick={() => infoModal(item.client, item.createdBy)}>full
                                        info</Button></td>
                                    <td><Button color="danger" outline
                                                onClick={() => openDeleteModal(item)}>Delete</Button></td>
                                </tr>
                                </tbody>
                            )
                        }
                    </Table>

                    <Offcanvas
                        isOpen={this.state.infoModal}
                        direction="end" style={{width: "40%"}}
                        toggle={openInfoModal}
                    >
                        <OffcanvasHeader className="d-block">
                            <h3 className="text-center">Full info</h3>
                            <hr/>
                        </OffcanvasHeader>
                        <OffcanvasBody>
                            <div>
                                <Row>
                                    <Col className="border-end">
                                        {currentUser.id &&
                                            <div className="ms-3">
                                                <h4 className="text-center mb-3">Admin</h4>
                                                <h5>firstName: {currentUser.firstName}</h5>
                                                <h5>lastName: {currentUser.lastName}</h5>
                                                <h5>p-Number: {currentUser.phoneNumber}</h5>
                                                <h5>email: {currentUser.email}</h5>
                                                <h5>salary: {currentUser.salary}</h5>
                                            </div>
                                        }
                                    </Col>
                                    <Col>
                                        {this.state.currentUserOrder.id &&
                                            <div className="ms-3">
                                                <h4 className="text-center mb-3">Client</h4>
                                                <h5>firstName: {this.state.currentUserOrder.firstName}</h5>
                                                <h5>lastName: {this.state.currentUserOrder.lastName}</h5>
                                                <h5>p-Number: {this.state.currentUserOrder.phoneNumber}</h5>
                                                <h5>email: {this.state.currentUserOrder.email}</h5>
                                                <h5>cashback: {this.state.currentUserOrder.salary}</h5>
                                            </div>
                                        }
                                    </Col>
                                </Row>
                            </div>
                        </OffcanvasBody>
                    </Offcanvas>

                    <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")}>
                        <ModalHeader toggle={() => openDeleteModal("")}></ModalHeader>
                        <ModalBody><h5>siz haqiqatdanham ushbu orderni uchirmoqchimisiz?</h5></ModalBody>
                        <ModalFooter>
                            <Button color="success" outline onClick={() => openDeleteModal("")}>Cancel</Button>
                            <Button color="danger" outline onClick={deleteOrders}>Delete</Button>
                        </ModalFooter>
                    </Modal>

                    {/*<div>*/}
                    {/*    <Offcanvas isOpen={showModal}>*/}
                    {/*        <OffcanvasHeader toggle={openModal}>*/}
                    {/*            {currentItem ? "Edit Order" : "Add order"}*/}
                    {/*        </OffcanvasHeader>*/}
                    {/*        <OffcanvasBody>*/}
                    {/*            <strong>*/}
                    {/*                <FormGroup>*/}
                    {/*                    <Label for="examplePassword">Comment</Label>*/}
                    {/*                    <Input type="text" name="comment" id="comment"*/}
                    {/*                           placeholder="Please enter comment" required={true}/>*/}
                    {/*                </FormGroup>*/}
                    {/*                <FormGroup>*/}
                    {/*                    <Label for="examplePassword">Comment</Label>*/}
                    {/*                    <Input type="number" name="cashback" id="cashback"*/}
                    {/*                           placeholder="Please enter cash back" required={true}/>*/}
                    {/*                </FormGroup>*/}
                    {/*                <FormGroup>*/}
                    {/*                    <Label for="examplePassword">Comment</Label>*/}
                    {/*                    <Input type="number" name="cash_price" id="cash_price"*/}
                    {/*                           placeholder="Please enter cash price" required={true}/>*/}
                    {/*                    <Input type="text" name="comment" id="comment"*/}
                    {/*                           placeholder="Please enter comment" required={true}*/}
                    {/*                           defaultValue={currentItem ? currentItem.comment : ""}/>*/}
                    {/*                </FormGroup>*/}
                    {/*            </strong>*/}
                    {/*            <Button color="primary" onClick={saveOrders}>Save</Button>*/}
                    {/*            <Button color='light' onClick={openModal}>Cancel</Button>*/}
                    {/*        </OffcanvasBody>*/}
                    {/*    </Offcanvas>*/}
                    {/*</div>*/}
                </div>
            </div>

        );
    }
}

Order.propTypes = {};

export default connect(
    ({app: {orders, showModal, deleteModal, currentItem, currentUser}}) =>
        ({orders, showModal, deleteModal, currentItem, currentUser}))
(Order);
