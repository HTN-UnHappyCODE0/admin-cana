import React from 'react';

import {PropsFlexLayout} from './interfaces';
import styles from './FlexLayout.module.scss';

function FlexLayout({children}: PropsFlexLayout) {
	return <div className={styles.container}>{children}</div>;
}

export default FlexLayout;
