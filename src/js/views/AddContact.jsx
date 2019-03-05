import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import PropTypes from 'prop-types';

export default class Contacts extends React.Component {
	constructor() {
		super();
		this.state = {
			full_name: "",
			email: "",
			phone: "",
			address: "",
			agenda_slug: "alejo"
		};
	}
	
	fullNameInput = e => {
		this.setState({ full_name: e.target.value });
	};
	
	emailInput = e => {
		this.setState({ email: e.target.value });
	};
	
	phoneInput = e => {
		this.setState({ phone: e.target.value });
	};
	
	addressInput = e => {
		this.setState({ address: e.target.value });
	};
	
	render() {
		return (
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Add a new contact</h1>
					
					{/* Form */}
					<form>
						<Context.Consumer>
							{({ store, actions }) => {
								const ind = this.props.match.params.contact_id;
								const person = store.contactList[ind];
								const enter = {
												full_name: "Enter Name", 
												phone: "Enter Phone Number", 
												address: "Enter Address", 
												email: "Enter Email"
												};
								let x;
								if (ind != undefined) {
									x = person;
									} else {
										x = enter;
									}
								return (
									<div>
										
										{/* Name */}
										<div className="form-group">
											<label>Full Name</label>
											<input 
												type="text" 
												className="form-control" 
												placeholder={x.full_name}
												onChange={this.fullNameInput} 
												value={this.state.full_name} 
											/>
										</div>
										
										{/* Email */}
										
										<div className="form-group">
											<label>Email</label>
											<input 
												type="email" 
												className="form-control" 
												placeholder={x.email} 
												onChange={this.emailInput} 
												value={this.state.email}
											/>
										</div>
										
										{/* Phone */}
										
										<div className="form-group">
											<label>Phone</label>
											<input 
												type="phone" 
												className="form-control" 
												placeholder={x.phone}
												onChange={this.phoneInput} 
												value={this.state.phone}
											/>
										</div>
										
										{/* Address */}
										
										<div className="form-group">
											<label>Address</label>
											<input 
												type="text" 
												className="form-control" 
												placeholder={x.address} 
												onChange={this.addressInput} 
												value={this.state.address}/>
										</div>
									</div>);
							}}
						</Context.Consumer>
						
						{/* Save Button */}
						
						<Context.Consumer>
							{({ store, actions }) => {
								
									const ind = this.props.match.params.contact_id;
									return ind == undefined ? (
										<Link to={"/contacts"}>
											<button 
												type="button" 
												className="btn btn-primary form-control"
												onClick={() => actions.createContact(
																this.state.full_name, 
																this.state.phone, 
																this.state.email, 
																this.state.address,
																this.state.agenda_slug)}
											>Save</button>
										</Link>
									) : (
										<Link to={"/contacts"}>
											<button 
												type="button" 
												className="btn btn-primary form-control"
												onClick={() => actions.updateContact(
																ind,
																this.state.full_name, 
																this.state.phone, 
																this.state.email, 
																this.state.address,
																this.state.agenda_slug)}
											>Save</button>
										</Link>
									);
								}}
									
						</Context.Consumer>
						<Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
					</form>
				</div>
			</div>
		);
	}
}

Contacts.propTypes = {
	match: PropTypes.object		
};