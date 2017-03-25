import axios from 'axios'

export const inviteUser = (email, tripId) =>
	axios.post('/api/invite/', { email, tripId })
		.then((res) => {
			res.redirect('/')
		})
		.catch(console.error)
