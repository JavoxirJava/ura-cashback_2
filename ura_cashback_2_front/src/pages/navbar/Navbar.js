import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import '../order/order.scss';

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
                <h1 className="h1-navbar" style={{margin: "0 10% 0 2%"}}>Davohir dev</h1>
                <NavItem>
                    <NavLink href="/Country">Country</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/category">Category</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/company">Company</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/level">Level</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/levelUser">LevelUser</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order">Order</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/product">Product</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/productCategory">ProductCategory</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/user">User</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/valyuta">Valyuta</NavLink>
                </NavItem>

            </Nav>
        </>


    );
}

export default Navbar;
