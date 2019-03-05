const getState = ({getStore, setStore, getActions}) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contactList: [
			
			]
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			
			getContacts: () => {
				const store = getStore();
				var tempList = store.contactList;
				
				fetch('https://assets.breatheco.de/apis/fake/contact/agenda/alejo')
				.then( (response) => { 
					if (response.ok){
						console.log(response); 
						return response.json();
					}else{
						console.log("gayyyy");
					}
				})
				.then( (response2) => {
						
						setStore({contactList: response2});
				});
			},
			createContact: (a_fullName, a_phone, a_email, a_address, a_agenda) => {
				
				var data = {
					full_name: a_fullName,
					phone: a_phone,
					email: a_email,
					address: a_address,
					agenda_slug: a_agenda
				};

				fetch('https://assets.breatheco.de/apis/fake/contact/', {
					method: 'PUT', // or 'PUT'
					body: JSON.stringify(data), // data can be `string` or {object}!
					headers:{
						'Content-Type': 'application/json'
					}
				})
					.then(res => res.json())
					.then(response => {
						console.log('Success:', (response));
						
					})
					.catch(error => console.error('Error:', error))
					.finally(()=> getActions().getContacts());
					
					
				}
				,
			
			deleteContact: (index) => {
				
				const store = getStore();
				
				var data = store.contactList[index].id;
				
				fetch('https://assets.breatheco.de/apis/fake/contact/'+data, {
					method: 'DELETE', // or 'PUT'
				})
				.then(res => res.json())
					.then(response => {
						console.log('Success:', (response));
						return ;
					})
					.catch(error => console.error('Error:', error))
					.finally(()=> getActions().getContacts());
				
			}
			,
			updateContact: (index, a_fullName, a_phone, a_email, a_address, a_agenda) => {
				const store = getStore();

				/*
				tempList.splice(index, 1, {
					full_name: a_fullName,
					phone: a_phone,
					email: a_email,
					address: a_address,
					agenda_slug: a_agenda
				});
				*/
				var data = {
					full_name: a_fullName,
					phone: a_phone,
					email: a_email,
					address: a_address,
					agenda_slug: a_agenda
				};
				
				var id = store.contactList[index].id;
				
				fetch('https://assets.breatheco.de/apis/fake/contact/'+id, {
					method: 'POST', // or 'PUT'
					body: JSON.stringify(data), // data can be `string` or {object}!
					headers:{
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
					.then(response => {
						console.log('Success:', (response));
						return ;
					})
					.catch(error => console.error('Error:', error))
					.finally(()=> getActions().getContacts());
				
			}
		}
	};
};

export default getState;

