import React, {useContext} from 'react';

import {PropsWarehouseStatistics} from './interfaces';
import styles from './WarehouseStatistics.module.scss';
import clsx from 'clsx';
import DetailBox from '~/components/common/DetailBox';
import {PiSealWarningFill} from 'react-icons/pi';
import {convertCoin} from '~/common/funcs/convertCoin';
import {ContextDashbroad, IContextDashbroad} from '../MainDashboard/context';
import {convertWeight} from '~/common/funcs/optionConvert';

function WarehouseStatistics({isLoading, infoCompany}: PropsWarehouseStatistics) {
	const context = useContext<IContextDashbroad>(ContextDashbroad);

	return (
		<div
			className={clsx(styles.container, {[styles.active]: context.companyUuid == infoCompany?.companyDTO?.uuid})}
			onClick={() => context?.setCompanyUuid(infoCompany?.companyDTO?.uuid)}
		>
			<h4 className={styles.title}>{infoCompany?.companyDTO?.name}</h4>
			<div className={clsx('mt', 'col_2')}>
				<DetailBox
					isLoading={isLoading}
					name={'Khối lượng khô'}
					value={convertWeight(infoCompany?.weight?.totalAmountBdmt)}
					unit='BDMT'
					action={
						<div className={styles.action}>
							<PiSealWarningFill size={20} color='#2D74FF' className={styles.icon_warn} />
							<div className={styles.note}>
								<p>
									Chuẩn: <span>{convertWeight(infoCompany?.weight?.amountBdmt)}</span>
								</p>
								<p style={{marginTop: 2}}>
									Tạm tính: <span>{convertWeight(infoCompany?.weight?.amountBdmtDemo)}</span>
								</p>
							</div>
						</div>
					}
				/>
				<DetailBox
					isLoading={isLoading}
					name={'Tổng công nợ'}
					value={convertCoin(infoCompany?.debt?.totalDebt)}
					color='#FF6838'
					unit='VND'
					action={
						<div className={styles.action}>
							<PiSealWarningFill size={20} color='#2D74FF' className={styles.icon_warn} />
							<div className={clsx(styles.note, styles.max)}>
								<p>
									Chuẩn: <span>{convertCoin(infoCompany?.debt?.debtKCS)}</span>
								</p>
								<p style={{marginTop: 2}}>
									Tạm tính: <span>{convertCoin(infoCompany?.debt?.debtDemo)}</span>
								</p>
								<p style={{marginTop: 2}}>
									Dư đầu kỳ: <span>{convertCoin(infoCompany?.debt?.debtReal)}</span>
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
