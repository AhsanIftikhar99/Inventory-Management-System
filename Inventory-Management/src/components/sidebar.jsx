import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function Example(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar  color="dark"
    dark {...args}>
        <NavbarBrand href="/">Inventory Management System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Categories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Products">
                Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Stocks">
                Stocks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Supplier">
                Supplier
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/PID">
                Purchase Invoice Details
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;