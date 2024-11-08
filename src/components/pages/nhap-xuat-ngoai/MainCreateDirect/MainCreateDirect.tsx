import React from 'react';

import {PropsMainCreateDirect} from './interfaces';
import styles from './MainCreateDirect.module.scss';
import {useRouter} from 'next/router';

function MainCreateDirect({}: PropsMainCreateDirect) {
	const router = useRouter();
	return <div>MainCreateDirect</div>;
}

export default MainCreateDirect;
