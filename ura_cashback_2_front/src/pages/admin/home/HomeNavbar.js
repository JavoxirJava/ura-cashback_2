import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import Button from "react-redux-toastr/lib/Button";
import "./home.css";

function HomeNavbar(props) {
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
            <div>
                <Button className="bepulButton" color='primary'><a color="white" href="/authUserCompany/register">Bepul urinib kuring. </a></Button>
                <Button className="bepulButton1" color='primary'>Bepul urinib kuring. </Button>
                <Button className="kirishButton" color='primary'>Kirish </Button>
            </div>
        </>
    );
}

export default HomeNavbar;