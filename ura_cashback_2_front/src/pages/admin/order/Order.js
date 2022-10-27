import React, {Component} from 'react';
import "./orderC.css"
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    Row,
    Table
} from "reactstrap";
import {delOrder, getOneUser, getOrder, saveOrder} from "../../../redux/actions/AppAction";
import {connect} from "react-redux";
import Sidebar from "../../clint/navbar/Sidebar";

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
            let comment = document.getElementById("comment").value;
            let cash_price = document.getElementById("cash_price").value;
            let cashback = document.getElementById("cashback").value;
            let id = currentItem.id ? currentItem.id : null;
            let obj = currentItem.id ?{id, comment, cash_price, cashback} : {comment, cash_price, cashback};
            this.props.dispatch(saveOrder(obj))
        }

        return (
            <div>
                <Sidebar/>
                <div className="ms-5 me-5 mt-5">
                    {/*<Button color="info" outline onClick={openModal}>Add Order</Button>*/}
                    <Table>
                        <thead>
                        <tr>
                            <th>Status</th>
                            <th>Cash price</th>
                            <th>Cashback</th>
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
                        <ModalHeader toggle={() => openDeleteModal("")}> </ModalHeader>
                        <ModalBody><h5>siz haqiqatdanham ushbu orderni uchirmoqchimisiz?</h5></ModalBody>
                        <ModalFooter>
                            <Button color="success" outline onClick={() => openDeleteModal("")}>Cancel</Button>
                            <Button color="danger" outline onClick={deleteOrders}>Delete</Button>
                        </ModalFooter>
                    </Modal>
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
