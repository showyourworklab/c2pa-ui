<script>
	import { getContext } from 'svelte';
	import styles from '../common/css/Explainer.module.css'
	import Collapse from './Collapse.svelte'

	const { locale, getText } = getContext('i18nStoreContext');
	const { isExplainerOpen, openExplainer, closeExplainer } = getContext('uiStoreContext');

	const onCloseClick = (event) => {
		if(isExplainerOpen) {
			closeExplainer(event)
		} else {
			openExplainer(event)
		}
	}
</script>

<div
	class={styles.Explainer}
>
	<Collapse
		open={$isExplainerOpen}
	>
		<div
			class={styles.ExplainerInner}
		>
			<button
				class={styles.ExplainerClose}
				aria-pressed={$isExplainerOpen}
				on:click={onCloseClick}
			>
				{getText($locale, 'toggle', 'explain', 'close')}
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
				class={styles.ExplainerMore}
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