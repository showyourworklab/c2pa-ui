import { useMemo } from 'react'
import { classNames } from 'syw-common/helpers'
import { convertMarkupToSafeHtml } from 'syw-common/helpers/markdown'

function Markdown({
	content,
	tag = 'div',
	className
}) {
	const html = useMemo(() => convertMarkupToSafeHtml(content), [content])
	if(!html) return null
	const Tag = tag

	return (
		<Tag
			className={classNames('Markdown', className)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}

export default Markdown
