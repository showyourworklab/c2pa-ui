export const joinClassNames = (...classNames) => classNames.filter(c => c).join(' ')

export const handleA11yClick = (event, callback) => {
	if(event.key === 'Enter' || event.key === ' ') {
		event.preventDefault()
		if(callback) callback(event)
	}
}

export const getVerifyUrl = (src) => {
	// const imageUrl = `${window.location.origin}${src}`
	return `https://verify.contentauthenticity.org/inspect?source=${src}`
}