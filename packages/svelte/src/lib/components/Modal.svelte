<script>
	import { Dialog } from '@ark-ui/svelte/dialog'
	import { classNames } from 'syw-common/helpers'
	import Icon from './Icon.svelte'

	let {
		open,
		title,
		description,
		onOpenChange,
		className,
		children
	} = $props()

	const handleOpenChange = (event) => {
		onOpenChange(event.open)
	}
</script>

<Dialog.Root
	open={open}
	modal={false}
	lazyMount={true}
	unmountOnExit={true}
	closeOnInteractOutside={true}
	onOpenChange={handleOpenChange}
>
	<Dialog.Backdrop
		class={classNames('ModalBackdrop')}
	/>
	<Dialog.Positioner
		class={classNames('ModalPositioner')}
	>
		<Dialog.Content
			class={classNames(
				className,
				'ModalContent'
			)}
		>
			<div
				class={classNames('ModalContentBox')}
			>
				{#if title}
					<hgroup
						class={classNames('ModalContentHeader')}
					>
						{#if title}
							<Dialog.Title>
								{title}
							</Dialog.Title>
						{/if}
						{#if description}
							<Dialog.Description
								class='syw-hidden'
							>
								{description}
							</Dialog.Description>
						{/if}
					</hgroup>
				{/if}
				{@render children?.()}
			</div>
			<Dialog.CloseTrigger
				class={classNames('ModalClose')}
			>
				<Icon
					type="close"
				/>
			</Dialog.CloseTrigger>
		</Dialog.Content>
	</Dialog.Positioner>
</Dialog.Root>

<!-- <div
	class={classNames(
		'Modal',
		open ? 'Modal_open' : null,
		className
	)}
	bind:this={elemRef}
>
	<div
		class={classNames('ModalOverlay')}
		aria-hidden="true"
		onclick={onClose}
	></div>
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby={labelId}
		aria-describedby={describeId}
		class={classNames('ModalContent')}
	>
		<div
			class={classNames('ModalContentBox')}
		>
			{#if title}
				<hgroup
					class={classNames('ModalContentHeader')}
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
							class={classNames('syw-hidden')}
						>
							{description}
						</p>
					{/if}
				</hgroup>
			{/if}
			{@render children?.()}
		</div>
		<button
			class={classNames('ModalClose')}
			aria-label="Close"
			onclick={onClose}
		></button>
	</div>
</div> -->


<!-- import { useId, useRef, useEffect, useState } from 'react'
import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { classNames } from 'syw-common/helpers'

const Modal = ({
	open = false,
	title,
	description,
	onOpenChange,
	children,
	className
}) => {
	const ref = useRef()
	const labelId = useId()
	const describeId = useId()

	const onClose = (event) => {
		onOpenChange(false, event)
	}

	const handleOpenChange = (event) => {
		onOpenChange(event.open)
	}

	return (
		
	)
}

export default Modal -->