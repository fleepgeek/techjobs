import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner, Jumbotron, Container } from "reactstrap";

import JobList from "../components/JobList";
import { getJobs } from "../store/actions/job";

class Home extends Component {
	// A component life cycle method that executes immediately
	// the component mounts. Here, we get all jobs.
	componentDidMount = () => {
		this.props.onGetJobs();
	};

	render() {
		return (
			<div style={{ marginTop: "-3rem" }}>
				<Jumbotron fluid>
					<Container>
						<h1 className="display-3">Tech Careers</h1>
						<p className="lead">
							Get access to the latest tech jobs with just a click of a button.
						</p>
						<p className="lead">
							<Link to="/jobs" className="btn btn-primary">
								Explore Jobs
							</Link>
						</p>
					</Container>
				</Jumbotron>
				<Container>
					{this.props.isLoading ? (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Spinner color="dark" />
						</div>
					) : (
						<JobList jobs={this.props.jobs} />
					)}
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	jobs: state.job.jobs,
	isLoading: state.job.isLoading
});

const mapDispatchToProps = dispatch => ({
	onGetJobs: () => dispatch(getJobs())
});

/*
The connect() method gives this component access to your store and actions
that we could send to the store.
The connect() takes two args and returns a Higher Order Component (HOC).
The first arg (mapStateToProps) is required. If you are not making use of the state
from the store, you pass in null for the first arg.
A HOC in React takes in a component, makes some changes to it and returns a new transformed component.
Here, the HOC adds the state and actions to the JobList component as props.
So the new transformed component now has additional props passed to it. All thanks to the
connect() function and the power of HOC.
A state management library like redux makes our components leaner by removing business logic away from it.
Any component can have access to the store by just connecting to it. 
No more unneccessary prop drilling to just pass down information or repeatitive code when we need to get 
data that would be used in multiple places (eg authentication state)
*/
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
