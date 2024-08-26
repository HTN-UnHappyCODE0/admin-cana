import React from 'react';
import styles from './PageDebtCustomer.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {PATH} from '~/constants/config';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import {Trash} from 'iconsax-react';
import Table from '~/components/common/Table';
import {useRouter} from 'next/router';
import {PropsPageDebtCustomer} from './interface';
import MoneyDebt from '../MoneyDebt';
const PageDebtCustomer = ({}: PropsPageDebtCustomer) => {
	const router = useRouter();
	const {_keyword, _manager, _dateFrom, _dateTo} = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm khách hàng' />
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper data={[1, 2, 3]} loading={false}>
					<Table
						data={[1, 2, 3]}
						column={[
							{
								title: 'Mã KH',
								render: (data: any) => <>KH01</>,
							},
							{
								title: 'Khách hàng',
								render: (data: any) => <>Lý Mạc Sầu</>,
							},
							{
								title: 'Công ty',
								render: (data: any) => <>Gỗ Tân Mai</>,
							},
							{
								title: 'Công nợ tạm tính',
								render: (data: any) => <>240.000.000</>,
							},
							{
								title: 'Công nợ chuẩn',
								render: (data: any) => <>300.000.000</>,
							},
							{
								title: 'Tổng công nợ',
								render: (data: any) => <>400.000.000</>,
							},
							{
								title: 'Tồn tạm ứng',
								render: (data: any) => <>400.000.000</>,
							},
							{
								title: 'Công nợ phải trả',
								render: (data: any) => <MoneyDebt value={400000000} />,
							},
							{
								title: 'Thanh toán gần nhất',
								render: (data: any) => (
									<p style={{display: 'flex', flexDirection: 'column'}}>
										<span>10:50 - 24/03/2024</span>

										<MoneyDebt value={-200000000} />
									</p>
								),
							},
						]}
					/>
				</DataWrapper>
			</div>
		</div>
	);
};

export default PageDebtCustomer;
