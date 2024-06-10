export const joinClassNames = (...classNames) => classNames.filter(c => c).join(' ')

export const handleA11yClick = (e, callback) => {
	if(e.key === 'Enter' || e.key === ' ') {
		e.preventDefault()
		if(callback) callback()
	}
}