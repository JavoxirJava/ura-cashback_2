import React, {Component} from 'react';
import {addAttachmentAction, saveCompany} from "../../../redux/actions/AppAction";
import {Button, Col, Input, Row} from "reactstrap";
import {connect} from "react-redux";
import "./company.css";
import logoCash from "../order/loginPage/image/logo.png";
import registerCom from "./svg7.png"
import registerCom1 from "./svg6.png"
import registerCom2 from "./Group 2.png"

class CompanyRegister extends Component {
    render() {
        const {currentCompany, attachmentId,active} = this.props;

        const sendPhoto = (item) => {
            let obj = new FormData();
            obj.append("file", item.target.files[0]);
            this.props.dispatch(addAttachmentAction(obj));
        }

        const addCompany = () => {
            let name = document.getElementById("name").value;
            let bio = document.getElementById("bio").value;
            let description = document.getElementById("description").value;
            let clintPercentage = document.getElementById("clintPercentage").value;
            let kassaPercentage = document.getElementById("kassaPercentage").value;
            let obj = {name, bio, description, clintPercentage, kassaPercentage, attachmentId: attachmentId.payload, active};
            this.props.dispatch(saveCompany(obj));
        }
        return (
            <div className="main-div">
                <img className="img"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-back" src={logoCash} alt="Loading..."/>
                <img className="compImg1"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-back" src={registerCom} alt="Loading..."/>
                <Input className='company-name' name="name" id="name" type='text'
                       defaultValue={currentCompany ? currentCompany.name : ""} placeholder='Enter company name'
                       required/>
                <Input className='company-bio' name="bio" id="bio" type='text'
                       defaultValue={currentCompany ? currentCompany.bio : ""} placeholder='Enter company bio'
                       required/>
                <Input className='company-description' name="description" id="description" type='text'
                       defaultValue={currentCompany ? currentCompany.description : ""}
                       placeholder='Enter company description'
                       required/>
                <Input className='company-cPercentage' name="clintPercentage" id="clintPercentage" type='number'
                       defaultValue={currentCompany ? currentCompany.clintPercentage : ""}
                       placeholder='Enter company clintPercentage'
                       required/>
                <Input className='company-kPercentage' name="te" id="kassaPercentage" type='number'
                       defaultValue={currentCompany ? currentCompany.kassaPercentage : ""}
                       placeholder='Enter company kassaPercentage'
                       required/>
                <Row className="mb-2">
                    <Col>
                        <Input type="file" multiple className="company-attachment" id="attachment"
                               onChange={(item) => sendPhoto(item)}
                               label="Upload your document picture:"
                               required accept="image/*"/>
                    </Col>
                </Row>
                <Button className="registerComp" color='primary' onClick={addCompany}>Register</Button>
                {/*<div>*/}
                {/*    <img className="compImg2"*/}
                {/*         data-aos-duration="1000"*/}
                {/*         data-aos-easing="ease-in-back" src={registerCom1} alt="Loading..."/>*/}
                    {/*<img className="compImg3"*/}
                    {/*     data-aos-duration="1000"*/}
                    {/*     data-aos-easing="ease-in-back" src={registerCom2} alt="Loading..."/>*/}

                {/*</div>*/}
            </div>
        );
    }
}

CompanyRegister.propTypes = {};

export default connect(
    ({app: {currentCompany, attachmentId, active}}) =>
        ({currentCompany, attachmentId, active}))
(CompanyRegister);