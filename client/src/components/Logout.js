import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../store/actions/auth";

class Logout extends Component {
	componentDidMount() {
		this.props.onLogout();
	}

	render() {
		return <Redirect to="/" />;
	}
}

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(logout())
});

// IMPORTANT: Always remember to pass null if you wont use
// mapStateToProps(). This is because it is the required first argument
export default connect(
	null,
	mapDispatchToProps
)(Logout);
