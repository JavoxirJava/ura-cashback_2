import React, {Component} from 'react';
import CompanySidebar from "./CompanySidebar";
import {Button, Input} from "reactstrap";
import './settings.css';

class CompanyPassword extends Component {
    render() {
        document.body.style.backgroundColor = "#F2F2F3"
        return (
            <div>
                <CompanySidebar/>
                <div className="container">
                    <div className="inputs">
                        <h4>Parolni o'zgartirish</h4>
                        <Input className='joriyPassword' name="joriyPassword" id="joriyPassword" type='text' placeholder='Enter company joriyPassword' required/>
                        <Input name="password" id="password" type='text' placeholder='Enter company password' required/>
                        <Input name="prePassword" id="prePassword" type='text' placeholder='Enter company prePassword' required/>
                        <Button color="primary" className="btn-icon-check">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-check2" viewBox="0 0 16 16">
                                <path
                                    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                            </svg><i className="bi bi-check2"> </i>Parolni o'zgartirish</Button>

                    </div>
                </div>
            </div>
        );
    }
}

CompanyPassword.propTypes = {};

export default CompanyPassword;
