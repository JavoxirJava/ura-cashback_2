import React, {Component} from 'react';
import CompanySidebar from "./CompanySidebar";
import {connect} from "react-redux";
import {Button, Input, Table} from "reactstrap";

class CabinetClient extends Component {

    render() {

        document.body.style.marginLeft = "3.7%";
        document.body.style.backgroundColor = "white";

        const {companyClient} = this.props;

        return (
            <div>
                <CompanySidebar/>
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
                        {/*<th>Active</th>*/}
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
                                {/*<td>{item.active ?*/}
                                {/*    <Input type="checkbox" checked={item.active} onClick={() => changeActiveUser(item)}*/}
                                {/*           onChange={changeActive}/> :*/}
                                {/*    <Input type="checkbox" checked={item.active} onClick={() => changeActiveUser(item)}*/}
                                {/*           onChange={changeActive}/>}*/}
                                {/*</td>*/}
                            </tr>
                            </tbody>
                        )
                    }
                </Table>
            </div>
        );
    }
}

CabinetClient.propTypes = {};

export default connect(
    ({app: {companyClient }}) =>
        ({companyClient }))
(CabinetClient);