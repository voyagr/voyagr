import axios from 'axios'

export const inviteUser = (email, tripId) =>
	axios.post('/api/invite/', { email, tripId })
		.then(res => {
			console.log(res)
			// return whether or not the response contained an error
			if (res.data.code) return true
			return false
		})
		.catch(console.error)
