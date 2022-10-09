import React, {Component} from 'react';
import {Button, Table} from "reactstrap";


class AuthAdmin extends Component {

    render() {

        const {user} = this.props;


        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    {user.map((item,i)=>
                        <tbody key={i}>
                        <tr>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.password}</td>
                            <td><Button>Edit</Button></td>
                            <td><Button>Delete</Button></td>
                        </tr>
                        </tbody>
                    )}
                </Table>
            </div>
        );
    }
}

AuthAdmin.propTypes = {};

export default AuthAdmin;