import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from "../store/appContext.jsx";
import { Link } from "react-router-dom";


class Modal extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			history: props.history,
			show: props.show
				// Initialize your state
		};
	}
	
	dead = () => {
		this.setState({ show: false });	
	}
	
		
	render(){
		return (
			<div className="modal" tabIndex="-1" role="dialog" style={{display: (this.props.show) ? 'inline-block' : 'none'}}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Are you sure?</h5>
							{ (this.props.onClose) ?
								<button onClick={() => this.props.onClose()} type="button" 
									className="close" 
									data-dismiss="modal" 
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
									:''
							}
						</div>
						<div className="modal-body">
							<p>Warning: unknown consequences after this point... Kidding!</p>
						</div>
						<div className="modal-footer">
							
							{/* Keep it Button */}
							<button 
								type="button" 
								className="btn btn-primary"
								onClick={()=>this.dead}
								>
								Oh no!
							</button>
							
							{/* Delete Button */}
							<Context.Consumer>
								{({ store, actions }) => {
									return (
										<Link to={"/"}>
											<button 
												type="button"
												onClick={() => actions.deleteContact()
												}
												className="btn btn-secondary" 
												data-dismiss="modal">
												Do it!
											</button>
										</Link>
									);
								}}
							</Context.Consumer>
							
						</div>
					</div>
				</div>
			</div>
		);
	}
		
}
/**
 * Define the data-types for
 * your component's properties
**/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool
};

/**
 * Define the default values for
 * your component's properties
**/
Modal.defaultProps = {
	show: false,
	onClose: null
	
};
export default withRouter(Modal);