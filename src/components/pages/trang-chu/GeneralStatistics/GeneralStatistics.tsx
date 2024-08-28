import React from 'react';

import {PropsGeneralStatistics} from './interfaces';

import styles from './GeneralStatistics.module.scss';
import {ChartSquare} from 'iconsax-react';
import DetailBox from '~/components/common/DetailBox';
import clsx from 'clsx';

function GeneralStatistics({}: PropsGeneralStatistics) {
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.icon}>
					<ChartSquare size='28' color='#2A85FF' variant='Bold' />
				</div>
				<h4 className={styles.title}>Tổng kho Cái Lân</h4>
			</div>
			<div className={styles.main}>
				<div className={styles.left}>
					<DetailBox name={'Tổng lượng hàng trong kho'} value={100} color='#2A85FF' />
					<div className={clsx('mt', 'col_2')}>
						<DetailBox name={'Khô tạm tính'} value={100} />
						<DetailBox name={'Khô chuẩn'} value={100} />
					</div>
				</div>
				<div className={styles.right}>
					<DetailBox name={'Tổng công nợ'} value={100} color='#2CAE39' />
					<div className={clsx('mt', 'col_2')}>
						<DetailBox name={'Công nợ tạm tính'} value={100} />
						<DetailBox name={'Công nợ chuẩn'} value={100} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default GeneralStatistics;
