import React, {useContext} from 'react';

import {PropsGeneralStatistics} from './interfaces';

import styles from './GeneralStatistics.module.scss';
import {ChartSquare} from 'iconsax-react';
import DetailBox from '~/components/common/DetailBox';
import clsx from 'clsx';
import {ContextDashbroad, IContextDashbroad} from '../MainDashboard/context';

function GeneralStatistics({isLoading, debt, weight}: PropsGeneralStatistics) {
	const context = useContext<IContextDashbroad>(ContextDashbroad);

	return (
		<div className={clsx(styles.container, {[styles.active]: !context.companyUuid})} onClick={() => context?.setCompanyUuid('')}>
			<div className={styles.head}>
				<div className={styles.icon}>
					<ChartSquare size='28' color='#2A85FF' variant='Bold' />
				</div>
				<h4 className={styles.title}>Tổng công ty</h4>
			</div>
			<div className={styles.main}>
				<div className={styles.left}>
					<DetailBox isLoading={isLoading} name={'Khối lượng khô'} value={weight?.totalAmountBdmt} color='#2A85FF' unit='BDMT' />
					<div className={clsx('mt', 'col_2')}>
						<DetailBox isLoading={isLoading} name={'Khô tạm tính'} value={weight?.amountBdmtDemo} unit='BDMT' />
						<DetailBox isLoading={isLoading} name={'Khô chuẩn'} value={weight?.amountBdmt} unit='BDMT' />
					</div>
				</div>
				<div className={styles.right}>
					<div className={clsx('col_2')}>
						<DetailBox isLoading={isLoading} name={'Tổng công nợ'} value={debt?.totalDebt} color='#2CAE39' unit='VND' />
						<DetailBox isLoading={isLoading} name={'Công nợ chuẩn'} value={debt?.debtKCS} color='#2A85FF' unit='VND' />
						<DetailBox isLoading={isLoading} name={'Công nợ tạm tính'} value={debt?.debtDemo} unit='VND' />
						<DetailBox isLoading={isLoading} name={'Dư đầu kỳ'} value={debt?.debtReal} unit='VND' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default GeneralStatistics;
