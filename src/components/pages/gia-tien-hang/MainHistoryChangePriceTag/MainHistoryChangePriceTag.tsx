import React from 'react';

import {PropsMainHistoryChangePriceTag} from './interfaces';
import styles from './MainHistoryChangePriceTag.module.scss';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import router from 'next/router';
import Table from '~/components/common/Table';
import Link from 'next/link';
import {convertCoin} from '~/common/funcs/convertCoin';
import {TYPE_TRANSPORT} from '~/constants/config/enum';
import TagStatusSpecCustomer from '../../xuong/TagStatusSpecCustomer';
import Moment from 'react-moment';

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
								fixedLeft: true,
								render: (data: any) => (
									<Link href={`/xuong/${data?.customerUu?.uuid}`} className={styles.link}>
										{data?.customerUu?.name || '---'}
									</Link>
								),
							},
							{
								title: 'Giá tiền (VND)',
								render: (data: any) => <>{convertCoin(data?.pricetagUu?.amount) || 0} </>,
							},
							// {
							// 	title: 'Công ty',
							// 	render: (data: any) => (
							// 		<Link href={`/nha-cung-cap/${data?.partnerUu?.uuid}`} className={styles.link}>
							// 			{data?.partnerUu?.name || '---'}
							// 		</Link>
							// 	),
							// },
							{
								title: 'Loại hàng',
								render: (data: any) => <>{data?.productTypeUu?.name || '---'}</>,
							},
							{
								title: 'Quy cách',
								render: (data: any) => <>{data?.specUu?.name || '---'}</>,
							},
							{
								title: 'Vận chuyển',
								render: (data: any) => (
									<>
										{data?.transportType == TYPE_TRANSPORT.DUONG_BO && 'Đường bộ'}
										{data?.transportType == TYPE_TRANSPORT.DUONG_THUY && 'Đường thủy'}
									</>
								),
							},

							{
								title: 'Cung cấp',
								render: (data: any) => <TagStatusSpecCustomer status={data.state} />,
							},
							{
								title: 'Ngày tạo',
								render: (data: any) => (data.created ? <Moment date={data.created} format='HH:mm, DD/MM/YYYY' /> : '---'),
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
