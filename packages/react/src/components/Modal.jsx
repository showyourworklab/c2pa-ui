import { useMemo } from 'react'
import { useCollapse } from 'react-collapsed'
import * as RadixDialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import styles from '$common/css/Modal.module.scss'
import { joinClassNames } from '$common/helpers'

const Modal = ({
	open = false,
	onOpenChange,
	children,
	className
}) => {

	const onClose = (event) => {
		onOpenChange(false, event)
	}

	return (
		<RadixDialog.Root
			open={open}
			modal={true}
			// onOpenChange={onOpenChange}
		>
			{/* <RadixDialog.Trigger /> */}
			<RadixDialog.Overlay
				// forceMount={true}
				className={joinClassNames(
					styles.ModalOverlay,
					open ? styles.ModalOverlay_open : null,
				)}
			/>
			{/* <div
				className={joinClassNames(
					styles.ModalOverlay,
					open ? styles.ModalOverlay_open : null,
				)}
			/> */}
			<RadixDialog.Content
				// forceMount={true}
				onEscapeKeyDown={onClose}
				onPointerDownOutside={onClose}
				onInteractOutside={onClose}
				className={joinClassNames(
					styles.ModalContent,
					open ? styles.ModalContent_open : null,
					className
				)}
			>
				<div
					className={styles.ModalContentBox}
				>
					<VisuallyHidden>
						<RadixDialog.Title>
							Image Origin
						</RadixDialog.Title>
						<RadixDialog.Description>
							Explore the provenance of this image
						</RadixDialog.Description>
					</VisuallyHidden>
					{children}
				</div>
				<RadixDialog.Close
					onClick={onClose}
					className={styles.ModalClose}
				/>
			</RadixDialog.Content>
		</RadixDialog.Root>
	)
}

export default Modal