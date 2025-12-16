import { useEffect, useId, useRef } from 'react'
import styles from 'syw-common/css/Modal.module.css'
import { joinClassNames } from 'syw-common/helpers'
import { openModal, closeModal } from 'syw-common/helpers/modal'

const Modal = ({
	open = false,
	title,
	description,
	onOpenChange,
	children,
	className
}) => {
	const ref = useRef();
	const labelId = useId();
	const describeId = useId();

	const onClose = (event) => {
		onOpenChange(false, event)
	}

	useEffect(() => {
		if(open) {
			openModal(ref.current, onOpenChange)
		} else {
			closeModal()
		}
		return () => {
			if(ref.current) closeModal()
		}
	}, [open, ref])

	return (
		<div
			ref={ref}
			className={joinClassNames(
				styles.Modal,
				open ? styles.Modal_open : null,
				className
			)}
		>
			<div
				className={styles.ModalOverlay}
				onClick={onClose}
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelId}
				aria-describedby={describeId}
				className={styles.ModalContent}
			>
				<div
					className={styles.ModalContentBox}
				>
					{title ?
						<hgroup
							className={styles.ModalContentHeader}
						>
							{title ?
								<h2
									id={labelId}
								>
									{title}
								</h2>
							: null}
							{description ?
								<p
									id={describeId}
									className='syw-hidden'
								>
									{description}
								</p>
							: null}
						</hgroup>
					: null}
					{children}
				</div>
				<button
					onClick={onClose}
					className={styles.ModalClose}
				/>
			</div>
		</div>
	)
}

export default Modal