import React, {Component} from 'react';
import CompanySettings from "./CompanySettings";
import CompanySidebar from "./CompanySidebar";
import {Input} from "reactstrap";
import './settings.css';

class CompanyPassword extends Component {
    render() {
        return (
            <div style={{backgroundColor: ""}}>
                <CompanySidebar/>
                <div className="container">
                    <div className="inputs">
                        <Input className='mb-2 joriyPassword' name="joriyPassword" id="joriyPassword" type='text' placeholder='Enter company joriyPassword' required/>
                        <Input className='mb-2' name="password" id="password" type='text' placeholder='Enter company password' required/>
                        <Input className='mb-2' name="prePassword" id="prePassword" type='text' placeholder='Enter company prePassword' required/>
                    </div>
                </div>
            </div>
        );
    }
}

CompanyPassword.propTypes = {};

export default CompanyPassword;
