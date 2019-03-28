import React, { Component } from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";

import { getJobs } from "../store/actions/job";

class JobList extends Component {
    componentDidMount = () => {
        this.props.onGetJobs();
    }
    
    render() {
        return (
            <div>
                {this.props.isLoading
                    ? (
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Spinner color="dark" />
                        </div>

                    )
                    : (

                        <ListGroup>
                            {this.props.jobs.map(job => (
                                <ListGroupItem key={job.id}>{job.title}</ListGroupItem>
                            ))}
                        </ListGroup>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    jobs: state.job.jobs,
    isLoading: state.job.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    onGetJobs: () => dispatch(getJobs())
})

export default connect(mapStateToProps, mapDispatchToProps)(JobList);