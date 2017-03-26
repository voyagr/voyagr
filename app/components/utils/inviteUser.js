import axios from 'axios'

export const inviteUser = (email, tripId) =>
	// console.log(email, tripId)
	axios.post('/api/invite/', { email, tripId })
		.then((res) => {
			console.log('added?')
		})
		.catch(console.error)
