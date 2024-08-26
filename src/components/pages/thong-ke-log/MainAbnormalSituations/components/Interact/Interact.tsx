import React from 'react'
import { PropsInteract } from './interfaces'
import styles from './Interact.module.scss';
import clsx from 'clsx';

function Interact({ onSubmit, onCancel }: PropsInteract) {
    return (
        <div className={clsx(styles.interact)}>
            <div onClick={onSubmit} className={clsx(styles.container, styles.SUBMIT)}>
                Submit
            </div>
            <div onClick={onCancel} className={clsx(styles.container, styles.CANCEL)}>
                Cancel
            </div>
        </div>
    )
}

export default Interact