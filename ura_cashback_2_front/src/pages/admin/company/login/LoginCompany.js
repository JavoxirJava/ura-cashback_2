import React, {Component} from 'react';
import cashbackLogo from "../../order/loginPage/image/logo.png";
import registerFoto from "../../userAdmin/registerFoto.png";
import {Button, Input} from "reactstrap";
import {saveCompanyUser} from "../../../../redux/actions/AppAction";
import "../company.css";
class LoginCompany extends Component {
    render() {

        const loginCompany = ()=>{
            const phoneNumber = document.getElementById("phoneNumber").value;
            const password = document.getElementById("password").value;
            let obj = {phoneNumber,password};
            this.props.dispatch(saveCompanyUser(obj))
        }
        return (
            <>
                <div className="row home">
                    <div className='col-6'>
                        <img className="row img1" src={cashbackLogo} alt="not"/>
                        <img className="img2" src={registerFoto} alt="not"/>
                        <h3>Savdolaringizni istalgan vaqtda kuzatib boring,</h3>
                        <h3>Avvalgidan ko'ra osonroq va samaraliroq</h3>
                    </div>
                    <div className="col-6 register">
                        <h2>Tizimga kirish</h2>
                        <div className="row">
                            <div className="col-10 pe-0">
                                <Input className="mb-2" type="text" id="phoneNumber" placeholder="Phone number"
                                       required/>
                                <Input className="mb-2" type="password" id="password" placeholder="Password"
                                       required/>
                            </div>
                            <div className="col-2">
                                <ul>
                                    <li className="row iconca3"><i className="pi pi-phone"></i></li>
                                    <li className="row iconca5"><i className="pi pi-lock"></i></li>
                                </ul>
                            </div>
                        </div>
                        <Button color="info" type="submit" onClick={loginCompany} outline>Tizimga kirish</Button>
                    </div>
                </div>
            </>
        );
    }
}

LoginCompany.propTypes = {};

export default LoginCompany;