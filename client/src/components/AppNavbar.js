import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    // NavLink as BstNavLink,
} from 'reactstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="md" className="mb-5">
                    <NavbarBrand>
                        Tech Careers
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/" className="nav-link">Jobs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/add-job" className="nav-link">Add Job</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar;