import React from 'react';
import styles from './TagSituationsStatus.module.scss';
import {PropsTagSituationsStatus} from './interfaces';
import clsx from 'clsx';
import {STATUS_SITUATIONS} from '~/constants/config/enum';

function TagSituationsStatus({status}: PropsTagSituationsStatus) {
	return (
		<div
			className={clsx(styles.container, {
				[styles.CHUA_KIEM_DUYET]: status == STATUS_SITUATIONS.CHUA_KIEM_DUYET,
				[styles.DA_DUYET]: status == STATUS_SITUATIONS.DA_DUYET,
				[styles.XU_LY_SAI]: status == STATUS_SITUATIONS.XU_LY_SAI,
			})}
		>
			{status == STATUS_SITUATIONS.CHUA_KIEM_DUYET && 'Chưa kiểm duyệt'}
			{status == STATUS_SITUATIONS.DA_DUYET && 'Đã duyệt'}
			{status == STATUS_SITUATIONS.XU_LY_SAI && 'Xử lý sai'}
		</div>
	);
}

export default TagSituationsStatus;
