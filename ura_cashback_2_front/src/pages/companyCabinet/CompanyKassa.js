import React, {Component} from 'react';
import {connect} from "react-redux";
import CompanySidebar from "./CompanySidebar";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import add from '../companyCabinet/img/add2.png';
import edit from '../companyCabinet/img/edit2.png';
import delit from '../companyCabinet/img/delete2.png';
import './cabinet.css'
import {saveUser} from "../../redux/actions/AppAction";


class CompanyKassa extends Component {

    state={
        openPassword:false,
        openPrePassword:false,
        resRegex:false,
        openModal:false,
        deleteModal:false
    }

    render() {

        const openModal = ()=>{
            this.setState({openModal: !this.state.openModal})
        }

        const deleteModal = ()=>{
            this.setState({deleteModal: !this.state.deleteModal})
        }

        const {dispatch, companyId, companyKassa} = this.props;


        const flag = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
        const regex = new RegExp(flag);

        const registerCompanyKassr = ()=>{
            const password = document.getElementById("password").value;
            const prePassword = document.getElementById("prePassword").value;

            if(password.match(regex) !== null && prePassword.match(regex) !== null){
                const firstName = document.getElementById("firstName").value;
                const lastName = document.getElementById("lastName").value;
                const phoneNumber = document.getElementById("phoneNumber").value;
                const email = document.getElementById("email").value;
                let obj = {firstName,lastName,phoneNumber,email,password,prePassword, companyId: companyId.value};
                this.props.dispatch(saveUser(obj))
            }else {
                this.setState({resRegex: !this.state.resRegex})
            }
        }

        const deleteCompanyKassr = (item)=>{
            console.log(item)
        }


        return (
            <div>
                <CompanySidebar/>
                <div className="container">
                    <Button className="mt-5 compButton" onClick={()=>openModal()}><img src={add} /></Button>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companyKassa.map((item,i)=>
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td><img  onClick={()=> openModal(item)} src={edit}/></td>
                        <td><img  onClick={()=> deleteModal(item)} src={delit}/></td>
                    </tr>
                    )}
                    </tbody>
                </Table>
                </div>

                <Modal isOpen={this.state.openModal}>
                    <ModalHeader>Add Kassr</ModalHeader>
                    <ModalBody>
                        <Input className="mb-2" type="text" id="firstName" placeholder="First name"
                               required/>
                        <Input className="mb-2" type="text" id="lastName" placeholder="Last name" required/>
                        <Input className="mb-2" type="text" id="phoneNumber" placeholder="Phone number"
                               required/>
                        <Input className="mb-2" type="email" id="email" placeholder="Email" required/>
                        <Input className="mb-2" type="password" id="password" placeholder="Password"
                               required/>
                        <Input className="mb-2" type="password" id="prePassword" placeholder="Pre password"
                               required/>
                        {this.state.resRegex ? <p style={{color:"red"}}>Password error a-z and A-Z and 0-9 password length = 8</p> : ""}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={openModal}>Close</Button>
                        <Button color="success" onClick={registerCompanyKassr}>Save</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.deleteModal}>
                    <ModalHeader>Delete kassr</ModalHeader>
                    <ModalFooter>
                        <Button color="secondary" onClick={deleteModal}>Close</Button>
                        <Button color="danger" onClick={deleteCompanyKassr}>Delete</Button>
                    </ModalFooter>
                </Modal>


            </div>
        );
    }
}

CompanyKassa.propTypes = {};

export default connect(
    ({app:{dispatch,companyId, companyKassa}})=>
        ({dispatch,companyId, companyKassa}))
(CompanyKassa);