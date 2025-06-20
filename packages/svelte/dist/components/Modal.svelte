<script>
	import { joinClassNames } from '../common/helpers'
	import { openModal, closeModal } from '../common/helpers/modal'
	import styles from '../common/css/Modal.module.css'
	let {
		open,
		title,
		description,
		onOpenChange,
		className,
		children
	} = $props()
	let elemRef
	const id = $props.id()
	const labelId = `${id}-label`
	const describeId = `${id}-describe`

	const onClose = (event) => {
		onOpenChange(false, event)
	}

	$effect(() => {
		if(open) {
			openModal(elemRef, onOpenChange)
		} else {
			closeModal()
		}
		return () => {
			if(elemRef) closeModal()
		}
	})
</script>

<div
	class={joinClassNames(
		styles.Modal,
		open ? styles.Modal_open : null,
		className
	)}
	bind:this={elemRef}
>
	<div
		class={styles.ModalOverlay}
		aria-hidden="true"
		onclick={onClose}
	></div>
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby={labelId}
		aria-describedby={describeId}
		class={styles.ModalContent}
	>
		<div
			class={styles.ModalContentBox}
		>
			{#if title}
				<hgroup
					class={styles.ModalContentHeader}
				>
					{#if title}
						<h2
							id={labelId}
						>
							{title}
						</h2>
					{/if}
					{#if description}
						<p
							id={describeId}
							class='syw-hidden'
						>
							{description}
						</p>
					{/if}
				</hgroup>
			{/if}
			{@render children?.()}
		</div>
		<button
			class={styles.ModalClose}
			aria-label="Close"
			onclick={onClose}
		></button>
	</div>
</div>