import React, {Component} from 'react';
import {Button, Input, Modal, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {getUser, isActiveUser, removeUser} from "../../../redux/actions/AppAction";
import Sidebar from "../../clint/navbar/Sidebar";
import './auth.css';


class AuthAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getUser());
    }


    render() {

        document.body.style.marginLeft = "3.7%";
        document.body.style.backgroundColor = "white"

        const {user,page,size,search, dispatch, currentUser,deleteShowModal,activeUser} = this.props;


        const paginate = (number) => {
            dispatch({
                type: "updateState",
                payload: {
                    page: number
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
            });
        }

        const changeActive = () => {
            dispatch({
                type: "updateState",
                payload: {
                    activeUser: !activeUser,
                }
            });
        }

        const changeActiveUser = (item) => {
            if (item.id !== undefined) {
                this.props.dispatch(isActiveUser(item.id));
            }
        }

        const deleteUser = () => {
            this.props.dispatch(removeUser(currentUser));
            deleteModal("")
            dispatch({
                type: "updateState",
                payload: {
                    deleteShowModal: !deleteShowModal
                }
            });
        }



        const set = (item)=>{
            const lowerCase = item.target.value.toLowerCase();
            dispatch({
                type:"updateState",
                payload:{
                    search:lowerCase
                }
            })
        }

        //Search
        const filter = user.filter((el)=>{
            if(search === ''){
                return el;
            }else {
                return el.phoneNumber.toLowerCase().includes(search)
            }
        })

        const indexOfLasPost = page * size;
        const indexOfFirstPosts = indexOfLasPost - size;
        const currentPosts = filter.slice(indexOfFirstPosts,indexOfLasPost);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(user.length / size); i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="ms-5 me-5">
                <Sidebar/>
                <div className="mt-5">
                    <div className="wrapper">
                        <div className="search-wrapper">
                            <label htmlFor="search-form">
                                <Input type="search" name="search-form" placeholder="Search phone"
                                       onChange={(item)=> set(item)}/>
                                <Button><i className="pi pi-search"/></Button>
                            </label>
                        </div>
                    </div>

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
                        {currentPosts.map((item, i) =>
                            <tbody key={i}>
                            <tr>
                                <td>{i + 1}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.password}</td>
                                <td>{item.active ?
                                    <Input type="checkbox" checked={item.active} onClick={() => changeActiveUser(item)}
                                           onChange={changeActive}/> :
                                    <Input type="checkbox" checked={item.active} onClick={() => changeActiveUser(item)}
                                           onChange={changeActive}/>}
                                </td>
                                <td><Button color="danger" outline onClick={() => deleteModal(item)}>Delete</Button>
                                </td>
                            </tr>
                            </tbody>
                        )}
                    </Table>
                </div>


                <nav>
                    <ul className="pagination">
                        {pageNumbers.map((number, i) =>
                            <li key={i} className="page-item">
                                <a onClick={() => paginate(number)} className="page-link">{number}</a>
                            </li>
                        )}
                    </ul>
                </nav>




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
    ({app:{user,page,size,search, dispatch,currentUser,deleteShowModal,activeUser,pages}})=>
    ({user,page, size, search,dispatch,currentUser, deleteShowModal,activeUser,pages}))
(AuthAdmin);

