import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import Logout from "./components/Logout";
import { Home, CreateJob, Jobs, JobDetail, Auth, Dashboard } from "./pages";

import { authAutoLogin, loadAuthUser } from "./store/actions/auth";

class App extends Component {
	componentDidMount = () => {
		this.props.onAutoLogin();
		if (this.props.isAuth) {
			this.props.onLoadAuthUser();
		}
	};

	render() {
		let routes = (
			<Switch>
				<Route path="/jobs/:id" component={JobDetail} />
				<Route path="/jobs" component={Jobs} />
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={Home} />
				<Route render={() => <h2>Not Found</h2>} />
			</Switch>
		);
		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/jobs/:id" component={JobDetail} />
					<Route path="/jobs" component={Jobs} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={Auth} />
					<Route path="/add-job" component={CreateJob} />
					<Route path="/" exact component={Home} />
					<Route render={() => <h2>Not Found</h2>} />
				</Switch>
			);
		}
		return (
			<div className="App">
				<AppNavbar isAuth={this.props.isAuth} user={this.props.user} />
				{routes}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuth: state.auth.token !== null,
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	onAutoLogin: () => dispatch(authAutoLogin()),
	onLoadAuthUser: () => dispatch(loadAuthUser())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
