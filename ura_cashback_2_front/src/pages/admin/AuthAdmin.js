import React, {Component} from 'react';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {getUser, isActiveUser, pageUser, removeUser, saveUser} from "../redux/actions/AppAction";

import {getUser, isActiveUser, removeUser, saveUser} from "../../redux/actions/AppAction";




class AuthAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getUser());
    }

    render() {

        const {user, dispatch, showModal,currentUser,deleteShowModal,activeUser,pages} = this.props;

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

        const changeActive = () => {
            dispatch({
              type:"updateState",
              payload:{
                  activeUser: !activeUser,
              }
          });
        }

        const changeActiveUser = (item)=>{
            if(item.id !== undefined) {
                this.props.dispatch(isActiveUser(item.id))
            }
        }



        const deleteUser = () =>{
            this.props.dispatch(removeUser(currentUser));
            deleteModal("")
            dispatch({
                type:"updateState",
                payload:{
                    deleteShowModal: !deleteShowModal
                }
            })
        }

        const addUser = ()=> {
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let phoneNumber = document.getElementById("phoneNumber").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let prePassword = document.getElementById("prePassword").value;
            let obj = currentUser ? {
                    id: currentUser.id,
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    password,
                    prePassword
                } :
                {firstName, lastName, phoneNumber, email, password, prePassword};
            this.props.dispatch(saveUser(obj));
            dispatch({
                type:"updateState",
                payload:{
                    showModal: !showModal
                }
            })
        }

        const page = () => {
          this.props.dispatch(pageUser(1))
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
                            <Input type="checkbox" checked={item.active} onClick={()=> changeActiveUser(item)}  onChange={changeActive}/> :
                            <Input type="checkbox" checked={item.active} onClick={()=> changeActiveUser(item)}  onChange={changeActive}/>}
                            </td>
                            <td><Button color="warning" outline onClick={()=> openModal(item)}>Edit</Button></td>
                            <td><Button color="danger" outline onClick={()=> deleteModal(item) }>Delete</Button></td>
                        </tr>
                        </tbody>
                    )}
                </Table>
                </div>

                <div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" onClick={page} >1</a></li>
                            <li className="page-item"><a className="page-link" onClick={page} >2</a></li>
                            <li className="page-item"><a className="page-link" onClick={page} >3</a></li>
                        </ul>
                    </nav>
                </div>


                {/*<div className="pagination clr ignore-select" id="pagination">*/}
                {/*    <div className="pagination__inner d-flex jc-flex-start">*/}
                {/*        <a href="https://uzfilms.tv/">1</a>*/}
                {/*        <span className="nav_ext">...</span>*/}
                {/*        <a href="https://uzfilms.tv/page/5/">5</a>*/}
                {/*        <a href="https://uzfilms.tv/page/6/">6</a>*/}
                {/*        <a href="https://uzfilms.tv/page/7/">7</a>*/}
                {/*        <a href="https://uzfilms.tv/page/8/">8</a>*/}
                {/*        <span>13</span>*/}
                {/*        <a href="https://uzfilms.tv/page/14/">14</a>*/}
                {/*        <a href="https://uzfilms.tv/page/15/">15</a>*/}
                {/*        <a href="https://uzfilms.tv/page/16/">16</a>*/}
                {/*        <a href="https://uzfilms.tv/page/17/">17</a>*/}
                {/*        <span className="nav_ext">...</span>*/}
                {/*        <a href="https://uzfilms.tv/page/22/">22</a>*/}
                {/*    </div>*/}
                {/*</div>*/}


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
    ({app:{user, dispatch,showModal,currentUser,deleteShowModal,activeUser,pages}})=>
    ({user, dispatch, showModal,currentUser, deleteShowModal,activeUser,pages}))
(AuthAdmin);