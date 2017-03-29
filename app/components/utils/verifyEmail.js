import { auth } from 'APP/db/firebase'

const getParameterByName = function (name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

export const handleVerifyEmail = () => {
	const actionCode = this.getParameterByName('oobCode')
	// Try to apply the email verification code.
	auth.applyActionCode(actionCode).then(function(resp) {
		this.setState({ emailVerified: true })
		// Email address has been verified.
		console.log(auth.currentUser)

		return this.emailVerified()

	}).catch(error => {
		this.emailVerified()
		console.log('sdfds')
		console.error(error)
	})
}
