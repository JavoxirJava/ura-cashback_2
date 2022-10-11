import React, {Component} from 'react';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {getUser, isActiveUser, removeUser, saveUser} from "../redux/actions/AppAction";




class AuthAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getUser());
    }

    render() {

        const {user, dispatch, showModal,currentUser,deleteShowModal,activeUser} = this.props;

        const openModal = (item) =>{
            dispatch({
                type:"updateState",
                payload:{
                    showModal: !showModal,
                    currentUser: item
                }
            })
        }

        const deleteModal = (item)=>{
            dispatch({
                type:"updateState",
                payload:{
                    deleteShowModal: !deleteShowModal,
                    currentUser: item
                }
            })
        }

        const changeActive = (item) => {
            dispatch({
              type:"updateState",
              payload:{
                  activeUser: !activeUser,
                  currentUser: item
              }
          });
            if(currentUser.id !== undefined) {
                this.props.dispatch(isActiveUser(currentUser.id))
            }
        }



        const deleteUser = () =>{
            this.props.dispatch(removeUser(currentUser));
            deleteModal("")
        }

        const addUser = ()=> {
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let phoneNumber = document.getElementById("phoneNumber").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let prePassword = document.getElementById("prePassword").value;
            let obj = currentUser ? {id : currentUser.id,firstName,lastName,phoneNumber,email,password,prePassword } :
                {firstName,lastName,phoneNumber,email,password,prePassword};
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
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th>Active</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    {user.map((item,i)=>
                        <tbody key={i}>
                        <tr>
                            <td>{i + 1}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.password}</td>
                            <td>{item.active ?
                            <Input type="checkbox" checked={item.active}  onChange={()=> changeActive(item)}/> :
                            <Input type="checkbox" checked={item.active}   onChange={()=> changeActive(item)}/>}
                            </td>
                            <td><Button color="warning" outline onClick={()=> openModal(item)}>Edit</Button></td>
                            <td><Button color="danger" outline onClick={()=> deleteModal(item) }>Delete</Button></td>
                        </tr>
                        </tbody>
                    )}
                </Table>
                </div>

                <Modal isOpen={showModal}>
                    <ModalHeader>{currentUser ? "Edit User" : "add User"}</ModalHeader>
                    <ModalBody>
                        <Input className='mb-2' type="text" id="firstName" placeholder="Enter first name" required/>
                        <Input className='mb-2' type="text" id="lastName" placeholder="Enter last name" required/>
                        <Input className='mb-2' type="text" id="phoneNumber" placeholder="Enter phone number" required/>
                        <Input className='mb-2' type="email" id="email" placeholder="Enter email" required/>
                        <Input className='mb-2' type="password" id="password" placeholder="Enter password" required/>
                        <Input className='mb-2' type="password" id="prePassword" placeholder="Enter pre  password" required/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" outline onClick={openModal}>Cansel</Button>
                        <Button color="success" outline onClick={addUser}>Save</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={deleteShowModal}>
                    <ModalHeader>Delete User</ModalHeader>
                    <ModalFooter>
                        <Button color="secondary" outline onClick={()=> deleteModal("")}>Cansel</Button>
                        <Button color="danger" outline onClick={deleteUser}>Delete</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

AuthAdmin.propTypes = {};

export default connect(
    ({app:{user, dispatch,showModal,currentUser,deleteShowModal,activeUser}})=>
    ({user, dispatch, showModal,currentUser, deleteShowModal,activeUser}))
(AuthAdmin);