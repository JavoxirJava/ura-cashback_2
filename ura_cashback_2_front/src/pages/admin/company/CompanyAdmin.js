import React, {Component} from 'react';
import {connect} from "react-redux";
import {activeCompany, getCompany,} from "../../../redux/actions/AppAction";
import {Button, Input, Label, Row, Table} from "reactstrap";
import {api} from "../../../api/api";
import '../style.scss';
import Sidebar from "../../clint/navbar/Sidebar";

class CompanyAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getCompany());
    }

    render() {
        document.body.style.marginLeft = "3.7%";
        document.body.style.backgroundColor = "white";

        const {company,search, page, size, dispatch, active} = this.props;

        const set = (item)=>{
            const lowerCase = item.target.value.toLowerCase();
            dispatch({
                type:"updateState",
                payload:{
                    search:lowerCase
                }
            })
        }

        //Search
        const filter = company.filter((el)=>{
            if(search === ''){
                return el;
            }else {
                return el.name.toLowerCase().includes(search)
            }
        })

        const indexOfLasPost = page * size;
        const indexOfFirstPosts = indexOfLasPost - size;
        const currentPosts = filter.slice(indexOfFirstPosts, indexOfLasPost);


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
                    <div className="wrapper">
                        <div className="search-wrapper">
                            <label htmlFor="search-form">
                                <Input type="search" name="search-form" placeholder="Search name"
                                       onChange={(item)=> set(item)}/>
                                <Button><i className="pi pi-search"/></Button>
                            </label>
                        </div>
                    </div>
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
                <div className='comPagination'>
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
            </div>
        );
    }
}
CompanyAdmin.propTypes = {};

export default connect(
    ({app: {company,search, page, size, active}}) =>
        ({company,search, page, size, active}))
(CompanyAdmin);

