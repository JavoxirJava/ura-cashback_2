import React, {Component} from 'react';
import {addAttachmentAction, saveCompany} from "../../../redux/actions/AppAction";
import {Button, Col, Input, Row} from "reactstrap";
import {connect} from "react-redux";
import "./company.css";
import logoCash from "../order/loginPage/image/logo.png";
import Order from "../order/Order";
// import registerCom from "./svg7.png"
// import registerCom1 from "./svg6.png"
// import registerCom2 from "./Group 2.png"

class CompanyRegister extends Component {
    render() {
        let {currentUser,currentCompany, attachmentId,active,adminPanel} = this.props;

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
            let userId = currentUser;
            let obj = {userId ,name, bio, description, clintPercentage, kassaPercentage, attachmentId: attachmentId.payload, active};
            this.props.dispatch(saveCompany(obj));
        }

        console.log(adminPanel)


        return (
            <>
                {adminPanel ?
                    <Order/>   :

                    <div className="main-div">
                        <img className="img"
                             data-aos-duration="1000"
                             data-aos-easing="ease-in-back" src={logoCash} alt="Loading..."/>
                        <img className="compImg1"
                             data-aos-duration="1000"
                             data-aos-easing="ease-in-back" alt="Loading..."/>
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
                    </div>
                }
            </>
        );
    }
}

CompanyRegister.propTypes = {};

export default connect(
    ({app: {currentUser,currentCompany, attachmentId, active,adminPanel}}) =>
        ({currentUser,currentCompany, attachmentId, active,adminPanel}))
(CompanyRegister);