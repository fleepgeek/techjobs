import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu
} from "reactstrap";

class AppNavbar extends Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}));
	};

	render() {
		return (
			<div>
				{/* <Navbar color="primary" dark expand="md" className="mb-5"> */}
				<Navbar color="primary" dark expand="md" className="mb-5">
					<NavbarBrand tag={NavLink} to="/">
						{/* <NavLink to="/">Tech Careers</NavLink> */}
						Tech Careers
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink exact to="/jobs" className="nav-link">
									Jobs
								</NavLink>
							</NavItem>
							{this.props.isAuth && (
								<NavItem>
									<NavLink to="/add-job" className="nav-link">
										Add Job
									</NavLink>
								</NavItem>
							)}
							{this.props.isAuth ? (
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
										{this.props.user && this.props.user.name}
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem>
											<NavLink to="/dashboard">Dashboard</NavLink>
										</DropdownItem>
										<DropdownItem divider />
										<DropdownItem>
											<NavLink to="/logout">Logout</NavLink>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							) : (
								<NavLink to="/auth" className="nav-link">
									Login
								</NavLink>
							)}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default AppNavbar;
