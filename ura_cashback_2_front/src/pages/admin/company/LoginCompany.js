import React, {Component} from 'react';
import cashbackLogo from "../order/loginPage/image/logo.png";
import registerFoto from "../userAdmin/registerFoto.png";
import {Button, Input} from "reactstrap";
import {loginCompany} from "../../../redux/actions/AppAction";
import {connect} from "react-redux";
import CabinetOrder from "../../companyCabinet/CabinetOrder";


class LoginCompany extends Component {


    state={
        openPassword: false,
        resRegex:false
    }

    render() {

        const {dispatch,openCompany} = this.props;

        const flag = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
        const regex = new RegExp(flag);

        const login = ()=>{
            let password = document.getElementById("password").value;
            // if(password.match(regex) !== null){
                let phoneNumber = document.getElementById("phoneNumber").value;
                let obj = {phoneNumber,password};
                this.props.dispatch(loginCompany(obj));
            // }else {
            //     this.setState({resRegex: !this.state.resRegex})
            // }
        }

        const password = ()=>{
            this.setState({openPassword: !this.state.openPassword})
        }

        return (
            <>
                {openCompany ?
                    <CabinetOrder/> :
                    <div className="row home">
                        <div className='col-6'>
                            <div className="row-cols-6 ">
                                <img className="img1" src={cashbackLogo} alt="not"/>
                                <a className="regCom" href="/#">Register</a>
                            </div>
                            <img className="img2" src={registerFoto} alt="not"/>
                            <h3>Savdolaringizni istalgan vaqtda kuzatib boring,</h3>
                            <h3>Avvalgidan ko'ra osonroq va samaraliroq</h3>
                        </div>
                        <div className="col-6 loginCom">
                            <div className="row loginCompany">
                                <h2>Krish</h2>
                                <div className="col-10 pe-0">
                                    <Input className="mb-5" type="text" id="phoneNumber" placeholder="Phone number"
                                           required/>
                                    <Input className="mb-5" type={this.state.openPassword ? "text" : "password"}
                                           id="password" placeholder="Password"
                                           required/>
                                    {this.state.resRegex ?
                                        <p style={{color: "red"}}>Password error a-z and A-Z and 0-9 password length =
                                            8</p> : ""}
                                </div>
                                <div className="col-2">
                                    <ul>
                                        <li className="row iconcaCom1"><i className="pi pi-phone"/></li>
                                        <li className="row iconcaCom2"
                                            onClick={() => password()}>{this.state.openPassword ?
                                            <i className="pi pi-eye-slash"/> : <i className="pi pi-eye"/>}</li>
                                    </ul>
                                </div>
                            </div>
                            <Button color="info" type="submit" outline onClick={() => login()}>Krish</Button>
                        </div>
                    </div>
                }
            </>
        );
    }
}

LoginCompany.propTypes = {};

export default connect(
    ({app:{dispatch, openCompany}}) =>
        ({dispatch,openCompany}))
(LoginCompany);