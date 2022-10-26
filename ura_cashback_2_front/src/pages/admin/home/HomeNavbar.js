import React from 'react';
import {Button, Nav, NavItem, NavLink} from 'reactstrap';
import "./home.css";
import {Link} from "react-router-dom";

function HomeNavbar() {
    return (
        <>
            <Nav className="nav1">
                <NavItem >
                    <NavLink className='navlinkHrefBosh' href="">Cashback nima uchun kerak?</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='navlinkHref'  href="">Onlayn savdo</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='navlinkHref'  href="">Yangiliklar</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='navlinkHref'  href="">Tariflar</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='navlinkHref'  href="">Biz bilan bog'lanish</NavLink>
                </NavItem>
            </Nav>
            <div >
                <Button className="bepulButton" color='primary'><a color="white" href="/authUserCompany/register">Bepul urinib kuring. </a></Button>
                <Button className="bepulButton1" color='primary'><a color="white" href="/authUserCompany/register">Bepul urinib kuring. </a></Button>
                <Button className="kirishButton" outline color='primary'><Link to="/company/login" className="link-button">Kirish</Link></Button>

            </div>
        </>
    );
}

export default HomeNavbar;