import React from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import {
	Card,
	CardBody,
	CardText,
	CardTitle,
	CardColumns,
	CardFooter
} from "reactstrap";

const JobList = ({ jobs }) => {
	return (
		<CardColumns>
			{jobs.map(job => (
				<NavLink key={job.id} to={`/jobs/${job.id}`} className="nav-link">
					<Card className="job-card">
						<CardBody>
							<CardTitle>{job.title}</CardTitle>
							<CardText>
								<small className="text-muted">By: {job.user.name}</small>
							</CardText>
						</CardBody>
						<CardFooter>
							<small className="text-muted">
								Last updated <Moment fromNow>{job.updatedAt}</Moment>
							</small>
						</CardFooter>
					</Card>
				</NavLink>
			))}
		</CardColumns>
	);
};

export default JobList;
