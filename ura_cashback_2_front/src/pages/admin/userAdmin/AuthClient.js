import React, {Component} from 'react';
import cashbackLogo from '../order/loginPage/image/logo.png';
import registerFoto from '../userAdmin/registerFoto.png';
import {Button, Input} from "reactstrap";
import './auth.css';
import {saveUser} from "../../../redux/actions/AppAction";
import {connect} from "react-redux";

class AuthClient extends Component {

    render() {


        const registerClient = ()=>{
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const phoneNumber = document.getElementById("phoneNumber").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const prePassword = document.getElementById("prePassword").value;
            let obj = {firstName,lastName,phoneNumber,email,password,prePassword};
            this.props.dispatch(saveUser(obj))
        }


        return (
            <div className="row home">
                <div className='col-6'>
                    <img className="row img1" src={cashbackLogo}/>
                    <img className="img2" src={registerFoto}/>
                    <h3>Savdolaringizni istalgan vaqtda kuzatib boring,</h3>
                    <h3>Avvalgidan ko'ra osonroq va samaraliroq</h3>
                </div>
                <div className="col-6 register">
                    <h2>Hisob ochish</h2>
                    <Input className="mb-2" type="text" id="firstName" placeholder="First name" required/>
                    <Input className="mb-2" type="text" id="lastName" placeholder="Last name" required/>
                    <Input className="mb-2" type="text" id="phoneNumber" placeholder="Phone number" required/>
                    <Input className="mb-2" type="email" id="email" placeholder="Email" required/>
                    <Input className="mb-2" type="password" id="password" placeholder="Password" required/>
                    <Input className="mb-2" type="password" id="prePassword" placeholder="Pre password" required/>
                    <Button color="info" type="submit" onClick={registerClient} outline >Next</Button>
                </div>
            </div>
        );
    }
}

AuthClient.propTypes = {};

export default connect(
    ({app:{dispatch}})=>
        ({dispatch}))
(AuthClient);