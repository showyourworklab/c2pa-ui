<script>
	import { joinClassNames } from 'syw-common/helpers'
	import { openModal, closeModal } from 'syw-common/helpers/modal'
	// import styles from 'syw-common/css/Modal.module.css'
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
		'Modal',
		open ? 'Modal_open' : null,
		className
	)}
	bind:this={elemRef}
>
	<div
		class='ModalOverlay'
		aria-hidden="true"
		onclick={onClose}
	></div>
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby={labelId}
		aria-describedby={describeId}
		class='ModalContent'
	>
		<div
			class='ModalContentBox'
		>
			{#if title}
				<hgroup
					class='ModalContentHeader'
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
			class='ModalClose'
			aria-label="Close"
			onclick={onClose}
		></button>
	</div>
</div>