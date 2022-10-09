import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    activeCompany,
    addAttachmentAction, editCompanyEnabled,
    getCompany,
    saveCompany,
} from "../redux/actions/AppAction";
import {Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import './style.scss';
class Company extends Component {

    componentDidMount() {
        this.props.dispatch(getCompany());
    }

    render() {
        const {company, dispatch, showModal, deleteShowModal, currentCompany, attachmentId} = this.props;

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

        const deleteModal = (item) => {
            dispatch({
                type: 'updateState',
                payload: {
                    deleteShowModal: !deleteShowModal,
                    currentCompany: item
                }
            })
        }

        const changeActive = (item) => {
            this.props.dispatch(editCompanyEnabled(item.id));
        }

        const addCompany = () => {
            let name = document.getElementById("name").value;
            let bio = document.getElementById("bio").value;
            let description = document.getElementById("description").value;
            let percentage = document.getElementById("percentage").value;
            let obj;
            if (currentCompany) {
                obj = {id: currentCompany.id, name, bio, description, attachmentId: attachmentId.payload, percentage, }
            } else {
                obj = {name, bio, description, attachmentId: attachmentId.payload, percentage}
            }
            console.log(obj)
            this.props.dispatch(saveCompany(obj));
        }

        const deleteCompany = () => {
            this.props.dispatch(activeCompany(currentCompany));
        }

        console.log(company)
        return (
            <div>
                <div>
                    <h2 className="text-center">Company List</h2>
                    <Button className="btn btn-primary" onClick={openModal}>Add</Button>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Bio</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Valyuta</th>
                            <th>Contact</th>
                            <th>Percentage</th>
                            <th>WorkTime</th>
                            {/*<th>User</th>*/}
                            {/*<th>Order</th>*/}
                            <th colSpan='3'>Action</th>
                        </tr>
                        </thead>
                        {company.length !== null ?
                            company.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.bio}</td>
                                    <td>{item.description}</td>
                                    <td>{item.percentage}</td>
                                    <td>
                                        <Row>
                                            <Label check for="active">
                                                <Input type="checkbox" className='mb-2' id="active" checked={item.enabled}
                                                       onChange={() => changeActive(item)}/>
                                                {item.enabled ? "Active" : "Inactive"}
                                            </Label>
                                        </Row>
                                    </td>
                                    <td><Button color="warning" outline onClick={() => openModal(item)}>Edit</Button></td>
                                    <td><Button color="danger" outline onClick={() => deleteModal(item)}>Delete</Button></td>
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
                <Modal isOpen={deleteShowModal}>
                    <ModalHeader>{currentCompany.name} delete company</ModalHeader>
                    <ModalFooter>
                        <Button color='light' onClick={() => deleteModal("")}>Cancel</Button>
                        <Button color='primary' onClick={() => {deleteCompany();deleteModal("")}}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

Company.propTypes = {};

export default connect(
    ({
         app: {company, showModal, deleteShowModal, currentCompany, attachmentId}
     }) =>
        ({company, showModal, deleteShowModal, currentCompany, attachmentId})
)(Company);
