import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import Logout from "./components/Logout";
import { JobList, CreateJob, Auth } from "./pages";

import { authAutoLogin } from "./store/actions/auth";

class App extends Component {
	componentDidMount = () => {
		this.props.onAutoLogin();
	};

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={JobList} />
				<Route render={() => <h2>Not Found</h2>} />
			</Switch>
		);
		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={Auth} />
					<Route path="/add-job" component={CreateJob} />
					<Route path="/" exact component={JobList} />
					<Route render={() => <h2>Not Found</h2>} />
				</Switch>
			);
		}
		return (
			<div className="App">
				<AppNavbar isAuth={this.props.isAuth} />
				<Container>{routes}</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
	onAutoLogin: () => dispatch(authAutoLogin())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
