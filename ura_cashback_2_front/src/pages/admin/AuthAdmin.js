import React, {Component} from 'react';
import {Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {getUser, isActiveUser, removeUser, saveUser} from "../../redux/actions/AppAction";
import {connect} from "react-redux";


class AuthAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getUser());
    }

    render() {

        const {user, dispatch, showModal, currentUser, deleteShowModal, activeUser} = this.props;

        const openModal = (item) => {
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal,
                    currentUser: item
                }
            })
        }

        const deleteModal = (item) => {
            dispatch({
                type: "updateState",
                payload: {
                    deleteShowModal: !deleteShowModal,
                    currentUser: item
                }
            })
        }

        const changeActive = () => {
            dispatch({
                type: 'updateState',
                payload: {
                    active: !activeUser
                }
            })
        }


        const deleteUser = () => {
            this.props.dispatch(removeUser(currentUser));
            deleteModal("")
        }

        const changeActiveUser = (item) => {
            this.props.dispatch(isActiveUser(item))
        }

        const addUser = () => {
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let phoneNumber = document.getElementById("phoneNumber").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let prePassword = document.getElementById("prePassword").value;
            let obj;
            if (currentUser) {
                obj = {
                    id: currentUser.id,
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    password,
                    prePassword
                }
            } else {
                obj = {firstName, lastName, phoneNumber, email, password, prePassword}
            }
            this.props.dispatch(saveUser(obj));
        }


        return (

            <div>
                <div>
                    <Button color="info" outline onClick={openModal}>Add User</Button>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>LastName</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Password</th>
                            <th>Active</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        {user.map((item, i) =>
                            <tbody key={i}>
                            <tr>
                                <td>{i + 1}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.email}</td>
                                <td>{item.salary}</td>
                                <td>{item.password}</td>
                                <td>
                                    <Row>
                                        <Label check for="active">
                                            <div className="form-check form-switch">
                                                <Input type="checkbox" defaultChecked={item.active}
                                                       onChange={() => {changeActive();changeActiveUser(item.id)}}/>
                                            </div>
                                        </Label>
                                    </Row>
                                </td>
                                <td><Button color="warning" outline onClick={() => openModal(item)}>Edit</Button>
                                </td>
                                <td><Button color="danger" outline onClick={() => deleteModal(item)}>Delete</Button>
                                </td>
                            </tr>
                            </tbody>
                        )}
                    </Table>
                </div>

                <Modal isOpen={showModal}>
                    <ModalHeader>{currentUser ? "Edit User" : "add User"}</ModalHeader>
                    <ModalBody>
                        <Input className='mb-2' name="firstName" id="firstName" type='text'
                               defaultValue={currentUser ? currentUser.firstName : ""} placeholder='Enter company firstName'
                               required/>
                        <Input className='mb-2' name="lastName" id="lastName" type='text'
                               defaultValue={currentUser ? currentUser.lastName : ""} placeholder='Enter company lastName'
                               required/>
                        <Input className='mb-2' name="phoneNumber" id="phoneNumber" type='text'
                               defaultValue={currentUser ? currentUser.phoneNumber : ""} placeholder='Enter company phoneNumber'
                               required/>
                        <Input className='mb-2' name="email" id="email" type='email'
                               defaultValue={currentUser ? currentUser.email : ""} placeholder='Enter company email'
                               required/>
                        <Input className='mb-2' name="password" id="password" type='password'
                               defaultValue={currentUser ? currentUser.password : ""} placeholder='Enter company password'
                               required/>
                        <Input className='mb-2' name="prePassword" id="prePassword" type='password'
                               defaultValue={currentUser ? currentUser.prePassword : ""} placeholder='Enter company prePassword'
                               required/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" outline onClick={openModal}>Cansel</Button>
                        <Button color="success" outline onClick={addUser}>Save</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={deleteShowModal}>
                    <ModalHeader>Delete User</ModalHeader>
                    <ModalFooter>
                        <Button color="secondary" outline onClick={() => deleteModal("")}>Cansel</Button>
                        <Button color="danger" outline onClick={deleteUser}>Delete</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}


AuthAdmin.propTypes = {};

export default connect(
    ({app: {user, dispatch, showModal, currentUser, deleteShowModal, activeUser}}) =>
        ({user, dispatch, showModal, currentUser, deleteShowModal, activeUser}))
(AuthAdmin);