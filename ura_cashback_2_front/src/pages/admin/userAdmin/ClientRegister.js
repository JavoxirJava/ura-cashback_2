import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCompany, saveCompanyUser} from "../../../redux/actions/AppAction";
import cashbackLogo from "../order/loginPage/image/logo.png";
import registerFoto from "./registerFoto.png";
import {Button, Input} from "reactstrap";
import ResultClient from "./ResultClient";


class ClientRegister extends Component {

    componentDidMount() {
        this.props.dispatch(getCompany())
    }

    state={
        openPassword:false,
        openPrePassword:false,
        resRegex:false
    }

    render() {

        const {res,dispatch,company} = this.props;

        const flag = /^(?=.*[0-9]).{8,}$/;
        const regex = new RegExp(flag);

        const registerClient = ()=>{
            const password = document.getElementById("password").value;
            const prePassword = document.getElementById("prePassword").value;

            if(password.match(regex) !== null && prePassword.match(regex) !== null){
                const firstName = document.getElementById("firstName").value;
                const lastName = document.getElementById("lastName").value;
                const phoneNumber = document.getElementById("phoneNumber").value;
                const email = document.getElementById("email").value;
                const companyId = document.getElementById("companyId");
                let obj = {firstName,lastName,phoneNumber,email,password,prePassword, companyId: companyId.value};
                this.props.dispatch(saveCompanyUser(obj))
            }else {
                this.setState({resRegex: !this.state.resRegex})
            }
        }


        const password = ()=>{
            this.setState({openPassword: !this.state.openPassword})
        }

        const prePassword = ()=>{
            this.setState({openPrePassword: !this.state.openPrePassword})
        }
        console.log(company)

        return (
            <>
                {res ?
                    <ResultClient/>  :

                    <div className="row home">
                        <div className='col-6'>
                            <img className="row img1" src={cashbackLogo} alt="not"/>
                            <img className="img2" src={registerFoto} alt="not"/>
                            <h3>Savdolaringizni istalgan vaqtda kuzatib boring,</h3>
                            <h3>Avvalgidan ko'ra osonroq va samaraliroq</h3>
                        </div>
                        <div className="col-6 register">
                            <h2>Hisob ochish</h2>
                            <div className="row">
                                <div className="col-10 pe-0">
                                    <Input className="mb-2" type="text" id="firstName" placeholder="First name"
                                           required/>
                                    <Input className="mb-2" type="text" id="lastName" placeholder="Last name" required/>
                                    <Input className="mb-2" type="text" id="phoneNumber" placeholder="Phone number"
                                           required/>
                                    <Input className="mb-2" type="email" id="email" placeholder="Email" required/>
                                    <select className="mb-2 select" id="companyId">
                                        <option>Company</option>
                                        {company.map((item,i)=>
                                            <option key={i} value={item.id}  >{item.name}</option>
                                        )}
                                    </select>
                                    <Input className="mb-2" type={this.state.openPassword ? "text" : "password"} id="password" placeholder="Password"
                                         required/>
                                    <Input className="mb-2" type={this.state.openPrePassword ? "text" : "password"} id="prePassword" placeholder="Pre password"
                                           required/>
                                    {this.state.resRegex ? <p style={{color:"red"}}>Password error  length = 8</p> : ""}
                                </div>
                                <div className="col-2">
                                    <ul>
                                        <li className="row iconca1"><i className="pi pi-user"/></li>
                                        <li className="row iconca2"><i className="pi pi-user"/></li>
                                        <li className="row iconca3"><i className="pi pi-phone"/></li>
                                        <li className="row iconca4"><i className="pi pi-at"/></li>
                                        <li className="row iconca7" onClick={()=> password()}>
                                            {this.state.openPassword ? <i className="pi pi-eye-slash"/> : <i className="pi pi-eye"/>}</li>
                                        <li className="row iconca8" onClick={()=> prePassword()}>
                                            {this.state.openPrePassword ? <i className="pi pi-eye-slash" /> : <i className="pi pi-eye"/> }</li>
                                    </ul>
                                </div>
                            </div>
                            <Button color="info" type="submit" onClick={registerClient} outline>Register</Button>
                        </div>
                    </div>
                }
            </>
        );
    }
}

ClientRegister.propTypes = {};

export default connect(({app:{res,dispatch,company}})=>
    ({res,dispatch,company}))
(ClientRegister);