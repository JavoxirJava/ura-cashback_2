import React, {Component} from 'react';
import {connect} from "react-redux";
import {activeCompany, getCompany,} from "../../../redux/actions/AppAction";
import {Input, Label, Row, Table} from "reactstrap";
import {api} from "../../../api/api";
import '../style.scss';
import Sidebar from "../../clint/navbar/Sidebar";

class Company extends Component {

    componentDidMount() {
        this.props.dispatch(getCompany());
    }

    render() {
        document.body.style.marginLeft = "3.7%";
        document.body.style.backgroundColor = "white";

        const {company, page, size, dispatch, active} = this.props;

        const indexOfLasPost = page * size;
        const indexOfFirstPosts = indexOfLasPost - size;
        const currentPosts = company.slice(indexOfFirstPosts, indexOfLasPost);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(company.length / size); i++) {
            pageNumbers.push(i);
        }

        const paginate = (number) => {
            dispatch({
                type: "updateState",
                payload: {
                    page: number
                }
            })
        }


        const changeActive = () => {
            dispatch({
                type: 'updateState',
                payload: {
                    active: !active
                }
            });
        }
        const changeActiveCompany = (item) => {
            this.props.dispatch(activeCompany(item));
        }

        return (
            <div>
                <Sidebar/>
                <div className="ms-5 me-5 comp">
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Attachment</th>
                            <th>Name</th>
                            <th>Bio</th>
                            <th>Description</th>
                            <th>ClintPercentage</th>
                            <th>Active</th>
                        </tr>
                        </thead>
                        {currentPosts.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td><img className="company-img" src={api.getAttachment + item.attachment.id}
                                             alt="not"/></td>
                                    <td>{item.name}</td>
                                    <td>{item.bio}</td>
                                    <td>{item.description}</td>
                                    <td>{item.clientPercentage}</td>
                                    <td>
                                        <Row>
                                            <Label check for="active">
                                                <div className="form-check form-switch">
                                                    <Input type="checkbox" defaultChecked={item.active}
                                                           onChange={() => {changeActive();changeActiveCompany(item.id)}}/>
                                                </div>
                                            </Label>
                                        </Row>
                                    </td>
                                </tr>
                                </tbody>
                            )}
                    </Table>
                </div>
                <nav>
                    <ul className="pagination">
                        {pageNumbers.map((number, i) =>
                            <li key={i} className="page-item">
                                <a onClick={() => paginate(number)} className="page-link">{number}</a>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        );
    }
}

Company.propTypes = {};

export default connect(
    ({app: {company, page, size, active}}) =>
        ({company, page, size, active}))
(Company);



//add company
//**********render*******
// const openModal = (item) => {
//     dispatch({
//         type: 'updateState',
//         payload: {
//             showModal: !showModal,
//             currentCompany: item
//         }
//     })
// }

// const sendPhoto = (item) => {
//     let obj = new FormData();
//     obj.append("file", item.target.files[0]);
//     this.props.dispatch(addAttachmentAction(obj));
// }

// const addCompany = () => {
//     let name = document.getElementById("name").value;
//     let bio = document.getElementById("bio").value;
//     let description = document.getElementById("description").value;
//     let clintPercentage = document.getElementById("clintPercentage").value;
//     let kassaPercentage = document.getElementById("kassaPercentage").value;
//     let obj = currentCompany
//         ? {id: currentCompany.id, name, bio, description, clintPercentage, kassaPercentage, attachmentId: attachmentId.payload, active}
//         : {name, bio, description, clintPercentage, kassaPercentage, attachmentId: attachmentId.payload, active};
//     this.props.dispatch(saveCompany(obj));
// }

//********************return***********************
{/*<Button className="btn btn-primary" onClick={openModal}>Add Company</Button>*/}
{/*<th colSpan='1'>Action</th>*/}
{/*<td>*/}
{/*    <Button color="warning" outline onClick={() => openModal(item)}>Edit</Button>*/}
{/*</td>*/}

{/*<Modal isOpen={showModal}>*/}
{/*    <ModalHeader>{currentCompany.id ? "Edit Company" : "Add Company"}</ModalHeader>*/}
{/*    <ModalBody>*/}
{/*        <Input className='mb-2' name="name" id="name" type='text'*/}
{/*               defaultValue={currentCompany ? currentCompany.name : ""} placeholder='Enter company name'*/}
{/*               required/>*/}
{/*        <Input className='mb-2' name="bio" id="bio" type='text'*/}
{/*               defaultValue={currentCompany ? currentCompany.bio : ""} placeholder='Enter company bio'*/}
{/*               required/>*/}
{/*        <Input className='mb-2' name="description" id="description" type='text'*/}
{/*               defaultValue={currentCompany ? currentCompany.description : ""}*/}
{/*               placeholder='Enter company description'*/}
{/*               required/>*/}
{/*        <Input className='mb-2' name="clintPercentage" id="clintPercentage" type='number'*/}
{/*               defaultValue={currentCompany ? currentCompany.clintPercentage : ""}*/}
{/*               placeholder='Enter company clintPercentage'*/}
{/*               required/>*/}
{/*        <Input className='mb-2' name="te" id="kassaPercentage" type='number'*/}
{/*               defaultValue={currentCompany ? currentCompany.kassaPercentage : ""}*/}
{/*               placeholder='Enter company kassaPercentage'*/}
{/*               required/>*/}
{/*        <Row className="mb-2">*/}
{/*            <Col>*/}
{/*                Logo*/}
{/*                <Input type="file" multiple id="attachment"*/}
{/*                       onChange={(item) => sendPhoto(item)}*/}
{/*                       label="Upload your document picture:"*/}
{/*                       required accept="image/*"/>*/}
{/*            </Col>*/}
{/*        </Row>*/}

{/*    </ModalBody>*/}
{/*    <ModalFooter>*/}
{/*        <Button color='light' onClick={openModal}>Cancel</Button>*/}
{/*        <Button color='primary' onClick={addCompany}>Save</Button>*/}
{/*    </ModalFooter>*/}
{/*</Modal>*/}
{/*<Modal isOpen={deleteShowModal}>*/}
{/*    <ModalHeader>{currentCompany.name} delete company</ModalHeader>*/}
{/*    <ModalFooter>*/}
{/*        <Button color='light' onClick={() => deleteModal("")}>Cancel</Button>*/}
{/*        <Button color='primary' onClick={() => {deleteCompany();deleteModal("")}}>Delete</Button>*/}
{/*    </ModalFooter>*/}
{/*</Modal>*/}