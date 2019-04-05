import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";

import { getSingleJob } from "../store/actions/job";

class JobDetail extends Component {
	componentDidMount = () => {
		const jobId = +this.props.match.params.id;
		this.props.onGetSingleJob(jobId);
	};

	render() {
		const { job } = this.props;
		return (
			<Container>
				<h1>Detail</h1>
				{this.props.isLoading ? (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Spinner color="dark" />
					</div>
				) : (
					// <h2>{(job || {}).title}</h2>
					<h2>{job && job.title}</h2>
				)}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	job: state.job.job,
	isLoading: state.job.isLoading
});

const mapDispatchToProps = dispatch => ({
	onGetSingleJob: jobId => dispatch(getSingleJob(jobId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(JobDetail);
