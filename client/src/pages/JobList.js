import React, { Component } from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";

import { getJobs } from "../store/actions/job";

class JobList extends Component {
    // A component life cycle method that executes immediately
    // the component mounts. Here, we get all jobs.
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
export default connect(mapStateToProps, mapDispatchToProps)(JobList);