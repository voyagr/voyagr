import axios from 'axios'

export const inviteUser = (email, tripId) => {
	axios.post('/api/invite/', { email, tripId })
		.then(res => {
			// return whether or not the response contained an error
			if (res.data.code) return true
			return false
		})
		.catch(console.error)
}

export const listUsers = (userId) => {
	return axios.get(`/api/invite/${userId}`)
		.then(res => res.data)
		.catch(console.error)
}

