import React from 'react';
import {withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import { Context } from "../store/appContext.jsx";



class ContactCard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			
			// initialize your state
		};
	}
	
	render(){
		return (
			<li className="list-group-item">
				<div className="row w-100">
					{/* Profile Picture */}
					<div className="col-12 col-sm-6 col-md-3 px-0">
						<img src={this.props.pic} alt={this.props.full_name} className="rounded-circle mx-auto d-block img-fluid w-50" />
					</div>
					<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
						{/* Edit/Delete */}
						<div className=" float-right">
							{/* Edit */}
							<button className="btn" onClick={() => this.props.history.push('/edit/'+(this.props.index))}><i className="fas fa-pencil-alt mr-3"></i></button>
							{/* Delete */}
							<Context.Consumer>
								{({ store, actions }) => {
									return (
										<Link to={"/contacts"}>
											<button className="btn" onClick={() => actions.deleteContact(this.props.index)}><i className="fas fa-trash-alt"></i></button>
										</Link>);
								}}
							</Context.Consumer>
						</div>
						{/* Name */}
						<label className="name lead">{this.props.full_name} </label>
						<br /> 
						{/* Address */}
						<i className="fas fa-map-marker-alt text-muted mr-3"></i>
						<span className="text-muted">{this.props.address}</span>
						<br />
						{/* Phone */}
						<span className="fa fa-phone fa-fw text-muted mr-3" data-toggle="tooltip" title="" data-original-title={this.props.phone}></span>
						<span className="text-muted small">{this.props.phone}</span>
						<br />
						{/* Email */}
						<span className="fa fa-envelope fa-fw text-muted mr-3" data-toggle="tooltip" data-original-title="" title=""></span>
						<span className="text-muted small text-truncate">{this.props.email}</span>
					</div>
				</div>
			</li>
		);
	}
}

/**
 * Define the data-types for
 * your component's properties
**/
ContactCard.propTypes = {
		index: PropTypes.number,
		full_name: PropTypes.string,
		email: PropTypes.string,
		address: PropTypes.string,
		phone: PropTypes.string,
		history: PropTypes.object,
		pic: PropTypes.string,
		agenda_slug: PropTypes.string,
		onDelete: PropTypes.func
};

/**
 * Define the default values for
 * your component's properties
**/
ContactCard.defaultProps = {
	full_name: "Enter Name",
	email: "Enter Email",
	address: "Enter Address",
	phone: "Enter Phone",
	pic: "https://svgshare.com/i/65U.svg",
	agenda_slug: "alejo",
	onDelete: null
	
};
export default withRouter(ContactCard);