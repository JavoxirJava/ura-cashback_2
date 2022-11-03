import React, {Component} from 'react';
import "./orderC.css"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {delOrder, getOneUser, getOrder, saveOrder} from "../../../redux/actions/AppAction";
import {connect} from "react-redux";
import Sidebar from "../../clint/navbar/Sidebar";

class Order extends Component {

    componentDidMount() {
        this.props.dispatch(getOrder())
    }


    render() {

        document.body.style.marginLeft = "3.7%";
        document.body.style.backgroundColor = "white"

        const {orders, deleteModal, currentItem, dispatch} = this.props;




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


        return (
            <div>
                <Sidebar/>
                <div className="ms-5 me-5 mt-5">
                    <Table>
                        <thead>
                        <tr>
                            <th>Kassir</th>
                            <th>Client</th>
                            <th>Cash price</th>
                            <th>Cashback</th>
                            <th colSpan="1">Action</th>
                        </tr>
                        </thead>
                        {orders.length != null &&
                            orders.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>{item.kassir.firstName} {item.kassir.lastName}</td>
                                    <td>{item.client.firstName} {item.client.lastName}</td>
                                    <td>{item.cash_price}</td>
                                    <td>{item.cashback}</td>
                                    <td><Button color="danger" outline
                                                onClick={() => openDeleteModal(item)}>Delete</Button></td>
                                </tr>
                                </tbody>
                            )
                        }
                    </Table>


                    <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")}>
                        <ModalHeader toggle={() => openDeleteModal("")}> </ModalHeader>
                        <ModalBody><h5>siz ushbu cashbackni uchirmoqchimisiz?</h5></ModalBody>
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
    ({app: {orders, showModal, deleteModal, currentItem}}) =>
        ({orders, showModal, deleteModal, currentItem}))
(Order);
