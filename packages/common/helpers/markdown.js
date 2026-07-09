import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Don't allow DOMPurify outside of the browser
if(typeof window !== 'undefined') {
	// Add hooks to DOMPurify
	DOMPurify.addHook('afterSanitizeAttributes', node => {
		// If anchor tag, open links in new tab
		if(node.tagName === 'A') {
			node.setAttribute('target', '_blank')
			node.setAttribute('rel', 'noopener noreferrer')
		}
	})
}

/**
 * Strips a paragraph tags from single lines
 * @function
 * @param {string} html - HTML string
 * @return {string} - HTML string
 */
const unwrapSingleParagraph = (html) => {
	const trimmed = html.trim()
	const paragraphCount = (trimmed.match(/<p>/g) || []).length
	const match = paragraphCount === 1 && trimmed.match(/^<p>([\s\S]*)<\/p>$/)
	return match ? match[1] : html
}

/**
 * Converts markup (Markdown or HTML) to sanitized, safe HTML
 * @function
 * @param {string} content - Markdown or HTML content
 * @return {string} - Sanitized HTML string
 */
export const convertMarkupToSafeHtml = (content) => {
	if(!content) return ''
	const html = unwrapSingleParagraph(marked.parse(content, { async: false }))
	// Don't allow DOMPurify outside of the browser, return empty if serverside
	if(typeof window === 'undefined') return ''
	return DOMPurify.sanitize(html)
}
