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
import {delOrder} from "../../redux/actions/AppAction";
import delit from '../companyCabinet/img/delete2.png'

class CabinetOperation extends Component {

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

        const { deleteShowModal, dispatch} = this.props;


        // const infoModal = (admin, client) => {
        //     this.setState({currentUserOrder: client});
        //     this.setState({admin: admin})
        //     openInfoModal();
        // }
        //
        // const openInfoModal = () => {
        //     this.setState({infoModal: !this.state.infoModal});
        // }

        const openDeleteModal = (item) => {
            // this.props.dispatch(delOrder(item.id));
            dispatch({
                type: 'updateState',
                payload:{
                    deleteShowModal: !deleteShowModal
                }
            })
        };

        const order = localStorage.getItem("orders")
        const orders = JSON.parse(order);

        const deleteOrders = (item) => {
            console.log(item)
            // this.props.dispatch(delOrder());
        }
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
                            <th>Kassir</th>
                            <th>Date</th>
                            <th>Clinet</th>
                            <th>Cash price</th>
                            <th>Cashback</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        {orders.length != null &&
                            orders.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>{item.admin.firstName} {item.admin.lastName}</td>
                                    <td>{item.admin.createdAt}</td>
                                    <td>{item.client.firstName} {item.client.lastName}</td>
                                    <td>{item.cash_price}</td>
                                    <td>{item.cashback}</td>
                                    <td><img onClick={() => {openDeleteModal(item) ; deleteOrders(item)}} src={delit}/></td>
                                </tr>
                                </tbody>
                            )
                        }
                    </Table>

                    {/*<Offcanvas*/}
                    {/*    isOpen={this.state.infoModal}*/}
                    {/*    direction="end" style={{width: "40%"}}*/}
                    {/*    toggle={openInfoModal}*/}
                    {/*>*/}
                    {/*    <OffcanvasHeader className="d-block">*/}
                    {/*        <h3 className="text-center">Full info</h3>*/}
                    {/*        <hr/>*/}
                    {/*    </OffcanvasHeader>*/}
                    {/*    <OffcanvasBody>*/}
                    {/*        <div>*/}
                    {/*            <Row>*/}
                    {/*                <Col className="border-end">*/}
                    {/*                    {this.state.admin.id &&*/}
                    {/*                        <div className="ms-3">*/}
                    {/*                            <h4 className="text-center mb-3">Admin</h4>*/}
                    {/*                            <h5>firstName: {this.state.admin.firstName}</h5>*/}
                    {/*                            <h5>lastName: {this.state.admin.lastName}</h5>*/}
                    {/*                            <h5>p-Number: {this.state.admin.phoneNumber}</h5>*/}
                    {/*                            <h5>email: {this.state.admin.email}</h5>*/}
                    {/*                        </div>*/}
                    {/*                    }*/}
                    {/*                </Col>*/}
                    {/*                <Col>*/}
                    {/*                    {this.state.currentUserOrder.id &&*/}
                    {/*                        <div className="ms-3">*/}
                    {/*                            <h4 className="text-center mb-3">Client</h4>*/}
                    {/*                            <h5>firstName: {this.state.currentUserOrder.firstName}</h5>*/}
                    {/*                            <h5>lastName: {this.state.currentUserOrder.lastName}</h5>*/}
                    {/*                            <h5>p-Number: {this.state.currentUserOrder.phoneNumber}</h5>*/}
                    {/*                            <h5>email: {this.state.currentUserOrder.email}</h5>*/}
                    {/*                            <h5>cashback: {this.state.currentUserOrder.salary}</h5>*/}
                    {/*                        </div>*/}
                    {/*                    }*/}
                    {/*                </Col>*/}
                    {/*            </Row>*/}
                    {/*        </div>*/}
                    {/*    </OffcanvasBody>*/}
                    {/*</Offcanvas>*/}

                    <Modal isOpen={deleteShowModal} toggle={() => openDeleteModal("")}>
                        <ModalHeader> Delete operation </ModalHeader>
                        <ModalFooter>
                            <Button color="success" outline onClick={() => openDeleteModal()}>Cancel</Button>
                            <Button color="danger" outline onClick={deleteOrders}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

CabinetOperation.propTypes = {};

export default connect(
    ({app: { showModal, deleteShowModal}}) =>
        ({ showModal, deleteShowModal}))
(CabinetOperation);
