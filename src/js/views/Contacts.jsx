import React from "react";
import { Link } from "react-router-dom";

import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';

import { Context } from '../store/appContext';

export default class Contacts extends React.Component {
	constructor(){
		super();
		this.state = { 
		};
	}
	
	

	render() {
	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">Add new contact</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						
						<Context.Consumer>
							{({ store, actions }) => {
								window.onload = actions.getContacts;
								return store.contactList.map((content, index) => {
									return (
						
										<div
											className="col-12 border border-danger bg-success pt-2 pb-2 pl-3 pr-3 w-10 mw-100"
											key={index}>
											
											<ContactCard 
												onDelete={() => this.setState({ showModal: true})}
												full_name={content.full_name}
												phone= {content.phone}
												address= {content.address}
												email= {content.email}
												agenda_slug= {content.agenda_slug}
												index={index}
											/>
											
										
										</div>
									);
								});
							}}
						</Context.Consumer>
					</ul>
				</div>
			</div>
			<Modal 
				show={this.state.showModal} 
				onClose={() => this.setState({showModal: false})} />
		</div>
		);
	}
}
