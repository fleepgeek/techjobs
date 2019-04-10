import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";

import { loadAuthUser } from "../store/actions/auth";

class Dashboard extends Component {
	componentDidMount = () => {
		this.props.onLoadAuthUser();
	};

	render() {
		const { user } = this.props;
		return (
			<Container>
				<h1>Dashboard</h1>
				{this.props.isLoading ? (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Spinner color="dark" />
					</div>
				) : (
					// <h2>{(job || {}).title}</h2>
					<>
						{(user || {}).imageUrl && (
							<img
								src={`http://localhost:5000/${user.imageUrl}`}
								className="avatar"
								alt="profile"
							/>
						)}
						<h2>{user && user.name}</h2>
						<p>{user && user.email}</p>
					</>
				)}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	isLoading: state.auth.isLoading,
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	onLoadAuthUser: () => dispatch(loadAuthUser())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
