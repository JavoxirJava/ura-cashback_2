import React, {Component} from 'react';
import CompanySidebar from "./CompanySidebar";
import {addAttachmentAction, saveCompany} from "../../redux/actions/AppAction";
import registerCom1 from "../admin/company/img/Rectangle.png";
import logoCash from "../admin/company/img/Left.png";
import done from "../admin/company/img/photo_2022-10-20_11-19-28.jpg";
import {Button, Input} from "reactstrap";
import {api} from "../../api/api";
import registerCom from "../admin/company/img/img_1.png";
import {connect} from "react-redux";

class CompanySettings extends Component {
    render() {

        const {currentCompany, currentUser, attachmentId, active} = this.props;

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
            let obj = {
                name,
                bio,
                description,
                clintPercentage,
                attachmentId: attachmentId,
                userId: currentUser,
                active
            };
            console.log(obj)
            this.props.dispatch(saveCompany(obj));
        }
        return (
            <div>
                <CompanySidebar/>
                <div className="main-div1">
                    <h1 className="logotipCom1">Logotip company</h1>
                    <Input className="companyImg" type="file" src={registerCom1} multiple
                           onChange={(item) => sendPhoto(item)}
                           required accept="image/*"/>
                    <img className="compLogo1" data-aos-duration="1000"
                         src={api.getAttachment + attachmentId} data-aos-easing="ease-in-back" alt="Loading..."/>
                    <Input className='company-name1' name="name" id="name" type='text'
                           defaultValue={currentCompany ? currentCompany.name : ""} placeholder='Enter company name'
                           required/>
                    <Input className='company-bio1' name="bio" id="bio" type='text'
                           defaultValue={currentCompany ? currentCompany.bio : ""} placeholder='Enter company bio'
                           required/>
                    <Input className='company-description1' name="description" id="description" type='text'
                           defaultValue={currentCompany ? currentCompany.description : ""}
                           placeholder='Enter company description'
                           required/>
                    <Input className='company-cPercentage1' name="clintPercentage" id="clintPercentage" type='number'
                           defaultValue={currentCompany ? currentCompany.clintPercentage : ""}
                           placeholder='Enter company clintPercentage'
                           required/>
                    <Button className="registerComp1" color='primary' type="submit"
                            onClick={addCompany}>✔Register</Button>
                    <img className="compImg21"
                         data-aos-duration="1000"
                         data-aos-easing="ease-in-back" src={registerCom} alt="Loading..."/>

                </div>
            </div>
        );
    }
}

CompanySettings.propTypes = {};

export default connect(
    ({app: {currentCompany, currentUser, attachmentId, active}}) =>
        ({currentCompany, currentUser, attachmentId, active}))
(CompanySettings);