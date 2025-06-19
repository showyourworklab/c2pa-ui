let modalElement = null;
let focusableElements = [];
let firstFocusable = null;
let lastFocusable = null;
let prevFocusable = null;
let closeCallback = null;

/**
 * Adds accessibility features when modal is open
 * @param {HTMLElement} elem - DOM element of the modal
 */
export function openModal(elem, callback) {
	// Set global variable for modal element
	modalElement = elem;
	// Set global variable for callback function to trigger React/Svelte close from within this helper
	closeCallback = callback;
	setupFocusTrap();
	setupInertPage(true);
}

/**
 * Removes accessibility features when modal is closed and restores focus
 * @param {HTMLElement} elem - DOM element of the instance
 */
export function closeModal() {
	if(!modalElement) return;
	// Triggers React/Svelte close from within this helper
	if(closeCallback) closeCallback();
	// Remove modal's event listeners and tabability
	document.removeEventListener('keydown', handleKeydown);
	// If an element was previously focused at point of modal open
	if(prevFocusable && prevFocusable.focus) {
		// Revert active focus to previously focused
		prevFocusable.focus();
		// Reset saved previously focused element
		prevFocusable = null;
	}
	// Reset saved modal element
	modalElement = null;
	// Reset page's inert state
	setupInertPage(false);
}

/**
 * Handles keyboard events for focus trapping and closing with Escape.
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeydown(event) {
	if(!modalElement) return;
	// If pressed escape, key trigger close callback
	if(event.key === 'Escape') {
		return closeModal()
	}
	// If pressed tab key, handle 
	if(event.key === 'Tab') {
		// If no focusable elements exist in the modal
		if(focusableElements.length === 0) {
			// Prevent tabbing out
			event.preventDefault();
			return;
		}
		// If shift key is also pressed (reversing tab order)
		if(event.shiftKey) {
			// If focused on first element, jump to last
			if(document.activeElement === firstFocusable) {
				lastFocusable.focus();
				event.preventDefault();
			}
		} else {
			// If focused on last element, jump to first
			if(document.activeElement === lastFocusable) {
				firstFocusable.focus();
				event.preventDefault();
			}
		}
	}
}

/**
 * Sets up a focus trap within the modal
 */
function setupFocusTrap() {
	// Set global variable for last element focused before modal opened
	prevFocusable = document.activeElement;
	// Set global variable for all focusable elements in modal
	focusableElements = Array.from(
		modalElement.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
	).filter(elem => elem.tabIndex !== -1);
	// Set global variable for first focusable element in modal
	firstFocusable = focusableElements[0];
	// Set global variable for last focusable element in modal
	lastFocusable = focusableElements[focusableElements.length - 1];
	// Set focus on first focusable element in modal
	firstFocusable.focus();
	// Add listener to handle key events when modal is open
	document.addEventListener('keydown', handleKeydown);
}

/**
 * Manages inertness of content outside the modal.
 * @param {boolean} isInert
 */
function setupInertPage(isInert) {
	document.body.style.overflow = isInert ? 'hidden' : '';
}