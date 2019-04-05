import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";

import JobList from "../components/JobList";
import { getJobs } from "../store/actions/job";

export class Jobs extends Component {
	componentDidMount() {
		this.props.onGetJobs();
	}

	render() {
		return (
			<Container>
				{this.props.isLoading ? (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Spinner color="dark" />
					</div>
				) : (
					<JobList jobs={this.props.jobs} />
				)}
			</Container>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Jobs);
