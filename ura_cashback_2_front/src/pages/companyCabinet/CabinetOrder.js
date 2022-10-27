import React, {Component} from 'react';
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
import {connect} from "react-redux";
import CompanySidebar from "./CompanySidebar";
import {companyCabinet, delOrder} from "../../redux/actions/AppAction";

class CabinetOrder extends Component {

    // componentDidMount() {
    //     this.props.dispatch(companyCabinet())
    // }

    state = {
        infoModal: false,
        currentUserOrder: {},
        admin: {}
    }

    render() {

        document.body.style.marginLeft = "3.7%";
        document.body.style.backgroundColor = "white";

        const {comMalumot, deleteModal, dispatch} = this.props;


        const infoModal = (admin, client) => {
            this.setState({currentUserOrder: client});
            this.setState({admin: admin})
            openInfoModal();
        }

        const openInfoModal = () => {
            this.setState({infoModal: !this.state.infoModal});
        }

        const openDeleteModal = (item) => {
            this.props.dispatch(delOrder(item.id));
            window.location.reload();
        };

        // const deleteOrders = (item) => {
        //     console.log(item)
        //     this.props.dispatch(delOrder());
        //     openDeleteModal("");
        // }
        //
        // const saveOrders = () => {
        //     let obj;
        //     let comment = document.getElementById("comment").value;
        //     let cash_price = document.getElementById("cash_price").value;
        //     let cashback = document.getElementById("cashback").value;
        //     let id = currentItem.id ? currentItem.id : null;
        //
        //     if (currentItem.id) {
        //         obj = {id, comment, cash_price, cashback}
        //     } else {
        //         obj = {comment, cash_price, cashback}
        //     }
        //     this.props.dispatch(saveOrder(obj))
        // }

        return (
            <div>
               <CompanySidebar/>
                <div className="ms-5 me-5 mt-5">
                    <Table>
                        <thead>
                        <tr>
                            <th>Status</th>
                            <th>Cash price</th>
                            <th>Cashback</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        {comMalumot.payload.orders.length != null &&
                            comMalumot.payload.orders.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>Accepted</td>
                                    <td>{item.cash_price}</td>
                                    <td>{item.cashback}</td>
                                    <td><Button color="primary" outline
                                                onClick={() => infoModal(item.admin, item.client)}>full info</Button></td>
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
                                        {this.state.admin.id &&
                                            <div className="ms-3">
                                                <h4 className="text-center mb-3">Admin</h4>
                                                <h5>firstName: {this.state.admin.firstName}</h5>
                                                <h5>lastName: {this.state.admin.lastName}</h5>
                                                <h5>p-Number: {this.state.admin.phoneNumber}</h5>
                                                <h5>email: {this.state.admin.email}</h5>
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
                            {/*<Button color="danger" outline onClick={deleteOrders}>Delete</Button>*/}
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

CabinetOrder.propTypes = {};

export default connect(
    ({app: {comMalumot, showModal, deleteModal}}) =>
        ({comMalumot, showModal, deleteModal}))
(CabinetOrder);
