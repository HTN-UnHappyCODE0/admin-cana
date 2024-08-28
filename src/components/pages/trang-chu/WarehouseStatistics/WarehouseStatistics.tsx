import React from 'react';

import {PropsWarehouseStatistics} from './interfaces';
import styles from './WarehouseStatistics.module.scss';
import clsx from 'clsx';
import DetailBox from '~/components/common/DetailBox';
import {PiSealWarningFill} from 'react-icons/pi';
import {convertCoin} from '~/common/funcs/convertCoin';

function WarehouseStatistics({}: PropsWarehouseStatistics) {
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Tổng kho Cái Lân</h4>
			<div className={clsx('mt', 'col_3')}>
				<DetailBox name={'Tổng lượng hàng trong kho'} value={100} color='#2A85FF' />
				<DetailBox
					name={'Hàng khô'}
					value={100}
					action={
						<div className={styles.action}>
							<PiSealWarningFill size={20} color='#2D74FF' className={styles.icon_warn} />
							<div className={styles.note}>
								<p>
									Đã KCS: <span>{convertCoin(1000)}</span>
								</p>
								<p style={{marginTop: 2}}>
									Chưa KCS: <span>{convertCoin(1000)}</span>
								</p>
							</div>
						</div>
					}
				/>
				<DetailBox
					name={'Tổng công nợ'}
					value={100}
					color='#FF6838'
					action={
						<div className={styles.action}>
							<PiSealWarningFill size={20} color='#2D74FF' className={styles.icon_warn} />
							<div className={styles.note}>
								<p>
									Đã KCS: <span>{convertCoin(1000)}</span>
								</p>
								<p style={{marginTop: 2}}>
									Chưa KCS: <span>{convertCoin(1000)}</span>
								</p>
							</div>
						</div>
					}
				/>
			</div>
		</div>
	);
}

export default WarehouseStatistics;
