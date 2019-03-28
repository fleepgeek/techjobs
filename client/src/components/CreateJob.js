import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

import { addJob, addJobInit } from "../store/actions/job";

class CreateJob extends Component {
    state = {
        title: ""
    }

    componentDidMount() {
        // Sets the "jobCreated" state to false when component is mounted
        this.props.onAddJobInit();
    }
    

    save = (e) => {
        e.preventDefault();
        const formData = {
            title: this.state.title
        }
        // Sets the "jobCreated" state to true on success,
        // this to redirect to home because we're using
        // the <Redirect /> component.
        this.props.onAddJob(formData);
    }

    onChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                {this.props.jobCreated && <Redirect to="/" />}
                <Form onSubmit={this.save}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input 
                            type="text" 
                            name="title" 
                            id="title" 
                            placeholder="Job Title"
                            onChange={this.onChanged}
                        />
                    </FormGroup>
                    {this.props.isLoading 
                        ? <Spinner color="danger" /> 
                        : <Button color="danger">Add</Button>
                    }
                    
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.job.isLoading,
    jobCreated: state.job.jobCreated
})

const mapDispatchToProps = (dispatch) => ({
    onAddJobInit: () => dispatch(addJobInit()),
    onAddJob: (jobData) => dispatch(addJob(jobData))
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);