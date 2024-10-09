import React from 'react';

import {PropsMainHistoryChangePriceTag} from './interfaces';
import styles from './MainHistoryChangePriceTag.module.scss';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import router from 'next/router';
import Table from '~/components/common/Table';

function MainHistoryChangePriceTag({}: PropsMainHistoryChangePriceTag) {
	const {_page, _pageSize} = router.query;
	return (
		<div className={styles.container}>
			<div className={styles.header}></div>

			<div className={styles.table}>
				<DataWrapper data={[]} noti={<Noti disableButton title='Dữ liệu trống!' des='Hiện tại chưa có  nào, thêm ngay?' />}>
					<Table
						data={[]}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Nhà cung cấp',
								render: (data: any) => <>{'---'}</>,
							},
						]}
					/>
				</DataWrapper>
				<Pagination currentPage={Number(_page) || 1} total={20} pageSize={Number(_pageSize) || 50} dependencies={[_pageSize]} />
			</div>
		</div>
	);
}

export default MainHistoryChangePriceTag;
