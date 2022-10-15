import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import '../../admin/order/order.scss';

function Navbar() {
    // const [dropdownOpen, setDropdownOpen] = useState(false);

    // const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <>
            <Nav tabs>

                {/*<Dropdown nav isOpen={dropdownOpen} toggle={toggle}>*/}
                {/*    <DropdownToggle nav caret>Dropdown</DropdownToggle>*/}
                {/*    <DropdownMenu>*/}
                {/*        <DropdownItem header>Header</DropdownItem>*/}
                {/*        <DropdownItem disabled>Action</DropdownItem>*/}
                {/*        <DropdownItem>Another Action</DropdownItem>*/}
                {/*        <DropdownItem divider />*/}
                {/*        <DropdownItem>Another Action</DropdownItem>*/}
                {/*    </DropdownMenu>*/}
                {/*</Dropdown>*/}
                <h1 className="h1-navbar" style={{margin: "0 10% 0 2%"}}>Javohir dev</h1>
                <NavItem>
                    <NavLink href="/company">Company</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/company/register">CompanyRegister</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order">Order</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/user">User</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order/login">Kassa Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/authClient">authClient</NavLink>
                </NavItem>

            </Nav>
        </>


    );
}

export default Navbar;
