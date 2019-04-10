import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	FormFeedback,
	CustomInput,
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardHeader,
	CardFooter,
	Alert
} from "reactstrap";

import { auth, toggleAuth } from "../store/actions/auth";

class Auth extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		passwordMatched: false,
		image: ""
	};

	onChanged = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onImgChanged = e => {
		this.setState({
			image: e.target.files[0]
		});
	};

	submitForm = e => {
		e.preventDefault();
		let formData;
		if (this.props.isLogin) {
			formData = {
				email: this.state.email,
				password: this.state.password
			};
			this.props.onAuth(formData);
		} else {
			formData = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				image: this.state.image
			};
			this.props.onAuth(formData);
		}
	};

	render() {
		const { isLoading, isLogin, isAuth, error } = this.props;
		return (
			<Container>
				{isAuth && <Redirect to="/" />}
				<Row>
					<Col md={{ size: 6, offset: 3 }}>
						<Card>
							<CardHeader tag="h2">Login</CardHeader>
							<CardBody>
								{error && <Alert color="danger">{this.props.error.msg}</Alert>}
								<Form
									onSubmit={this.submitForm}
									action="POST"
									encType={
										!isLogin
											? "multipart/form-data"
											: "application/x-www-form-urlencoded"
									}
								>
									{!isLogin && (
										<FormGroup>
											<Label for="name">Name</Label>
											<Input
												type="text"
												name="name"
												id="name"
												placeholder="Full Name"
												onChange={this.onChanged}
											/>
										</FormGroup>
									)}
									<FormGroup>
										<Label for="email">Email</Label>
										<Input
											type="email"
											name="email"
											id="email"
											placeholder="Email Address"
											onChange={this.onChanged}
										/>
									</FormGroup>
									<FormGroup>
										<Label for="password">Password</Label>
										<Input
											type="password"
											name="password"
											id="password"
											placeholder="Password"
											onChange={this.onChanged}
										/>
									</FormGroup>
									{!isLogin && (
										<FormGroup>
											<Label for="password2">Confirm Password</Label>
											<Input
												type="password"
												name="password2"
												id="password2"
												placeholder="Confirm Password"
												onChange={this.onChanged}
												invalid={this.state.password !== this.state.password2}
											/>
											<FormFeedback>Password doesnt match</FormFeedback>
										</FormGroup>
									)}
									{!isLogin && (
										<FormGroup>
											<Label for="profilePic">Profile Picture</Label>
											<Input
												type="file"
												name="image"
												id="profilePic"
												accept=".jpg, .jpeg, .png"
												onChange={this.onImgChanged}
											/>
											<FormText color="muted">
												Images must be png, jpg or jpeg format.
											</FormText>
										</FormGroup>
									)}
									<Button color="primary">
										{isLogin ? "Login" : "Register"}
									</Button>
								</Form>
							</CardBody>
							<CardFooter>
								<span
									onClick={this.props.onToggleAuth}
									style={{ cursor: "pointer" }}
								>
									{isLogin
										? "Create an Account"
										: "Already have an Account? Login Here!"}
								</span>
							</CardFooter>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	isLogin: state.auth.isLogin,
	isLoading: state.auth.isLoading,
	isAuth: state.auth.token !== null,
	error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
	onAuth: formData => dispatch(auth(formData)),
	onToggleAuth: () => dispatch(toggleAuth())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
