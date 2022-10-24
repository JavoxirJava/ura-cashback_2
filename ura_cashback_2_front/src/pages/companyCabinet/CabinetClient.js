import React, {Component} from 'react';
import CompanySidebar from "./CompanySidebar";
import {connect} from "react-redux";
import {Table} from "reactstrap";
import "../admin/style.scss"

class CabinetClient extends Component {

    render() {

        document.body.style.marginLeft = "3.7%";
        document.body.style.backgroundColor = "white";

        const {companyClient} = this.props;



        return (
            <div>
                <CompanySidebar/>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Password</th>
                        </tr>
                        </thead>
                        {companyClient.length != null &&
                            companyClient.map((item, i) =>
                                <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.email}</td>
                                    <td>{item.salary}</td>
                                    <td>{item.password}</td>
                                </tr>
                                </tbody>
                            )
                        }
                    </Table>
                </div>
            </div>
        );
    }
}

CabinetClient.propTypes = {};

export default connect(
    ({app: {companyClient, activeUser}}) =>
        ({companyClient, activeUser}))
(CabinetClient);