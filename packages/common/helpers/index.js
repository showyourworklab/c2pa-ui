export const joinClassNames = (...classNames) => classNames.filter(c => c).join(' ')

export const handleA11yClick = (e, callback) => {
	if(e.key === 'Enter' || e.key === ' ') {
		e.preventDefault()
		if(callback) callback()
	}
}

export const getVerifyUrl = (src) => {
	const imageUrl = `${window.location.origin}${src}`
	return `https://verify.contentauthenticity.org/inspect?source=${imageUrl}`
}