import {CONFIG_STATUS} from '~/constants/config/enum';
import {PropsTagStatus} from './interfaces';
import styles from './TagStatus.module.scss';
import clsx from 'clsx';

function TagStatus({status}: PropsTagStatus) {
	return (
		<div
			className={clsx(styles.container, {
				[styles.HOAT_DONG]: status == CONFIG_STATUS.HOAT_DONG,
				[styles.BI_KHOA]: status == CONFIG_STATUS.BI_KHOA,
				[styles.DA_XOA]: status == CONFIG_STATUS.DA_XOA,
			})}
		>
			{status == CONFIG_STATUS.HOAT_DONG && 'Hoạt động'}
			{status == CONFIG_STATUS.BI_KHOA && 'Bị khóa'}
			{status == CONFIG_STATUS.DA_XOA && 'Đã xóa'}
		</div>
	);
}

export default TagStatus;
