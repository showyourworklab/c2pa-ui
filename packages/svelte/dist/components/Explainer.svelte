<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import Collapse from './Collapse.svelte'

	const { locale, getText } = getContext('i18nStoreContext');
	const { isExplainerOpen, closeExplainer } = getContext('uiStoreContext');

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
			<div
				class={classNames('ExplainerBox')}
			>
				<div
					class={classNames('ExplainerHeader')}
				>
					<button
						class={classNames('ExplainerClose')}
						aria-pressed={$isExplainerOpen}
						onClick={onCloseClick}
					>
						{getText($locale, 'explainer', 'toggle', 'close')}
					</button>
					<p
						class={classNames('ExplainerLede')}
					>
						{getText($locale, 'explainer', 'lede')}
					</p>
				</div>
				<dl
					class={classNames('ExplainerSections')}
				>
					{#each [1, 2] as index}
						<div
							key={index}
							class={classNames('ExplainerSection')}
						>
							<dt
								class={classNames('ExplainerSectionTitle')}
							>
								{getText($locale, 'explainer', 'section', index, 'title')}
							</dt>
							<dd
								class={classNames('ExplainerSectionBody')}
							>
								{@html getText($locale, 'explainer', 'section', index, 'body')}
							</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</Collapse>
</div>