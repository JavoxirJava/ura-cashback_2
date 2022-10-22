import React, {Component} from 'react';
import {addAttachmentAction, saveCompany} from "../../../redux/actions/AppAction";
import {Button,Input} from "reactstrap";
import {connect} from "react-redux";
import "./company.css";
import ura from './img.png';
import search from './IMG_20221021_070117_004.jpg';
import done from "./photo_2022-10-20_11-19-28.jpg"
import {api} from "../../../api/api";
import Order from "../order/Order";

class CompanyRegister extends Component {

    render() {
        const {currentCompany,currentUser, attachmentId,active,openCompany} = this.props;

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
            let obj = {name, bio, description, clintPercentage, userId: currentUser, attachmentId: attachmentId, active};
            this.props.dispatch(saveCompany(obj));
        }
        console.log(openCompany," company openCompany")
        console.log(attachmentId)

        return (
            <>
                {openCompany ?
                    <Order/> :
                    <div className="main-div">
                        <h1 className="informationComp">Company xaqida malumot</h1>
                        <h1 className="registerCom">Register company</h1>
                        <h1 className="logotipCom">Logotip company</h1>
                        <img className="img"
                             data-aos-duration="1000"
                             data-aos-easing="ease-in-back" alt="Loading..."/>
                        <h1 className="malumot">Company xaqida malumot</h1>
                        <img className="compImg1"
                             data-aos-duration="1000"
                             data-aos-easing="ease-in-back" src={ura} alt="Loading..."/>
                        <img className="oval"
                             data-aos-duration="1000"
                             data-aos-easing="ease-in-back" src={done} alt="Loading..."/>
                        <Input className="companyImg" type="file" multiple
                               onChange={(item) => sendPhoto(item)}
                               required accept="image/*"/>
                        <img className="compLogo" data-aos-duration="1000"
                             src={api.getAttachment + attachmentId} data-aos-easing="ease-in-back" alt="Loading..."/>
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
                        <Button className="registerComp" color='primary' onClick={addCompany}>✔Register</Button>
                        <img className="compImg2"
                             data-aos-duration="1000"
                             data-aos-easing="ease-in-back" src={search} alt="Loading..."/>

                    </div>
                }
            </>
        );
    }
}

CompanyRegister.propTypes = {};

export default connect(
    ({app: {currentCompany,currentUser, attachmentId, active,openCompany}}) =>
        ({currentCompany,currentUser, attachmentId, active,openCompany}))
(CompanyRegister);