<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import Collapse from './Collapse.svelte'

	const { locale, getText } = getContext('i18nStoreContext');
	const { isExplainerOpen, openExplainer, closeExplainer } = getContext('uiStoreContext');

	const onCloseClick = (event) => closeExplainer(event)

</script>

<div
	class={classNames('Explainer')}
>
	<Collapse
		open={$isExplainerOpen}
	>
		<div
			class={classNames('ExplainerInner')}
		>
			<button
				class={classNames('ExplainerClose')}
				aria-pressed={$isExplainerOpen}
				onclick={onCloseClick}
			>
				{getText($locale, 'explainer', 'toggle', 'close')}
			</button>
			<div>
				<strong>
					Consectetur adipiscing elit
				</strong>
			</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim nibh, rhoncus vel enim ac, luctus efficitur risus. Quisque viverra tellus vitae arcu consectetur tincidunt. Ut vel pharetra tellus. Nam posuere suscipit maximus.</p>
			<div>
				<strong>
					Cras sagittis erat
				</strong>
			</div>
			<p>Suspendisse a neque nulla. Cras sagittis erat sed elit tristique, a efficitur ante malesuada. Quisque dapibus pharetra dictum.</p>
			<div
				class={classNames('ExplainerMore')}
			>
				{getText($locale, 'explainer', 'methods', 'pre')}
				<a
					href={getText($locale, 'explainer', 'methods', 'url')}
					target='_blank'
					rel='noreferrer noopener'
				>
					{getText($locale, 'explainer', 'methods', 'link')}
				</a>
			</div>
		</div>
	</Collapse>
</div>