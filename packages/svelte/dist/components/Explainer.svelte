<script>
	import styles from '../../../../common/css/Explainer.module.scss'
	import { locale, getText } from '../store/i18n'
	import { isShowExplainer } from '../store/ui'
	import Collapse from './Collapse.svelte'
</script>

<div
	class={styles.Explainer}
>
	<Collapse
		open={$isShowExplainer}
	>
		<div
			class={styles.ExplainerInner}
		>
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