import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    activeCompany,
    addAttachmentAction,
    getCompany,
    saveCompany,
} from "../redux/actions/AppAction";
import {Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {api} from "../api/api";
import './style.scss';
class Company extends Component {

    componentDidMount() {
        this.props.dispatch(getCompany());
    }

    render() {
        const {company, dispatch, showModal, currentCompany, attachmentId, active} = this.props;

        const openModal = (item) => {
            dispatch({
                type: 'updateState',
                payload: {
                    showModal: !showModal,
                    currentCompany: item
                }
            })
        }

        const sendPhoto = (item) => {
            let obj = new FormData();
            obj.append("file", item.target.files[0]);
            this.props.dispatch(addAttachmentAction(obj));
        }

        const changeActive = () => {
            dispatch({
                type: 'updateState',
                payload: {
                    active: !active
                }
            })
        }
        const changeActiveCompany = (item) => {
            this.props.dispatch(activeCompany(item));
        }

        const addCompany = () => {
            let name = document.getElementById("name").value;
            let bio = document.getElementById("bio").value;
            let description = document.getElementById("description").value;
            let percentage = document.getElementById("percentage").value;
            let obj;
            if (currentCompany) {
                obj = {id: currentCompany.id, name, bio, description, percentage, attachmentId: attachmentId.payload , active}
            } else {
                obj = {name, bio, description, percentage, attachmentId: attachmentId.payload, active}
            }
            this.props.dispatch(saveCompany(obj));
        }



        return (
            <div>
                <div>
                    <h2 className="text-center">Company List</h2>
                    <Button className="btn btn-primary" onClick={openModal}>Add Company</Button>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Attachment</th>
                            <th>Name</th>
                            <th>Bio</th>
                            <th>Description</th>
                            <th>Percentage</th>
                            <th>Active</th>
                            <th colSpan='1'>Action</th>
                        </tr>
                        </thead>
                        {company.length !== null ?
                            company.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td><img className="company-img" src={api.getAttachment + item.attachment.id}
                                             alt="not"/></td>
                                    <td>{item.name}</td>
                                    <td>{item.bio}</td>
                                    <td>{item.description}</td>
                                    <td>{item.percentage}</td>
                                    <td><Row>
                                        <Label check for="active">
                                            <div className="form-check form-switch">
                                                <Input type="checkbox"
                                                       onChange={() => {changeActive();changeActiveCompany(item.id)}}/>
                                            </div>
                                        </Label>
                                    </Row></td>
                                    <td><Button color="warning" outline onClick={() => openModal(item)}>Edit</Button></td>
                                </tr>
                                </tbody>
                            )
                            : " Malumot mavjud emas"
                        }
                    </Table>
                </div>
                <Modal isOpen={showModal}>
                    <ModalHeader>{currentCompany ? "Edit Company" : "add Company"}</ModalHeader>
                    <ModalBody>
                        <Input className='mb-2' name="name" id="name" type='text'
                               defaultValue={currentCompany ? currentCompany.name : ""} placeholder='Enter company name'
                               required/>
                        <Input className='mb-2' name="bio" id="bio" type='text'
                               defaultValue={currentCompany ? currentCompany.bio : ""} placeholder='Enter company bio'
                               required/>
                        <Input className='mb-2' name="description" id="description" type='text'
                               defaultValue={currentCompany ? currentCompany.description : ""}
                               placeholder='Enter company description'
                               required/>
                        <Input className='mb-2' name="percentage" id="percentage" type='number'
                               defaultValue={currentCompany ? currentCompany.percentage : ""}
                               placeholder='Enter company percentage'
                               required/>
                        <Row className="mb-2">
                            <Col>
                                Logo
                                <Input type="file" multiple id="attachment"
                                       onChange={(item) => sendPhoto(item)}
                                       label="Upload your document picture:"
                                       required accept="image/*"/>
                            </Col>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button color='light' onClick={openModal}>Cancel</Button>
                        <Button color='primary' onClick={addCompany}>Save</Button>
                    </ModalFooter>
                </Modal>
                {/*<Modal isOpen={deleteShowModal}>*/}
                {/*    <ModalHeader>{currentCompany.name} delete company</ModalHeader>*/}
                {/*    <ModalFooter>*/}
                {/*        <Button color='light' onClick={() => deleteModal("")}>Cancel</Button>*/}
                {/*        <Button color='primary' onClick={() => {deleteCompany();deleteModal("")}}>Delete</Button>*/}
                {/*    </ModalFooter>*/}
                {/*</Modal>*/}
            </div>
        );
    }
}

Company.propTypes = {};

export default connect(
    ({
         app: {company, showModal, deleteShowModal, currentCompany, attachmentId, active}
     }) =>
        ({company, showModal, deleteShowModal, currentCompany, attachmentId, active})
)(Company);
