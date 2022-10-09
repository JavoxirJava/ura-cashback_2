import React, {Component} from 'react';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/AppAction";



class AuthAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getUser());
    }

    render() {

        const {user, dispatch} = this.props;


        return (

            <div>
                <div>
                    <Button color="blue" outline>Add User</Button>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    {user.map((item,i)=>
                        <tbody key={i}>
                        <tr>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.password}</td>
                            <td><Button color="warning" outline>Edit</Button></td>
                            <td><Button color="danger" outline>Delete</Button></td>
                        </tr>
                        </tbody>
                    )}
                </Table>
                </div>

                <Modal>
                    <ModalHeader>Add User</ModalHeader>
                    <ModalBody>
                        <Input type="text" id="firstName" placeholder="Enter first name" required/>
                        <Input type="text" id="lastName" placeholder="Enter last name" required/>
                        <Input type="text" id="phoneNumber" placeholder="Enter phone number" required/>
                        <Input type="email" id="email" placeholder="Enter email" required/>
                        <Input type="password" id="password" placeholder="Enter password" required/>
                        <Input type="email" id="prePassword" placeholder="Enter pre  password" required/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" outline>Concel</Button>
                        <Button color="success" outline>Save</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

AuthAdmin.propTypes = {};

export default connect(
    ({app:{user, dispatch}})=>
    ({user, dispatch}))
(AuthAdmin);