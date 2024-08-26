import DataWrapper from '~/components/common/DataWrapper';
import {PropsMainWeigh} from './interfaces';
import styles from './MainWeigh.module.scss';
import Pagination from '~/components/common/Pagination';
import Link from 'next/link';
import Table from '~/components/common/Table';
import clsx from 'clsx';
import FilterCustom from '~/components/common/FilterCustom';
import Search from '~/components/common/Search';
import {useRouter} from 'next/router';
import DateRangerCustom from '~/components/common/DateRangerCustom';
function MainWeigh({}: PropsMainWeigh) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _manager, _company, _type} = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo id, tên' />
					</div>
					<div className={styles.filter}>
						<DateRangerCustom />
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper data={[1, 2, 3]} loading={false}>
					<Table
						data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
						column={[
							{
								title: 'Người thao tác',
								render: (data: any) => <>Dương Văn Bé</>,
							},
							{
								title: 'Hành động',
								render: (data: any) => <p className={clsx(styles.status, {[styles.create]: true})}>Tạo phiếu cân</p>,
							},

							{
								title: 'Ghi chú',
								render: (data: any) => <>Dương Văn Bé vừa tạo phiếu cân Nhập </>,
							},
							{
								title: 'Mã lô',
								render: (data: any) => <span style={{color: 'var(--primary)'}}>#67232</span>,
							},
							{
								title: 'Thời gian',
								render: (data: any) => <>20:48:50 - 08/05/2024</>,
							},
						]}
					/>
					<Pagination
						currentPage={Number(_page) || 1}
						total={400}
						pageSize={Number(_pageSize) || 20}
						dependencies={[_pageSize, _keyword, _manager, _company]}
					/>
				</DataWrapper>
			</div>
		</div>
	);
}

export default MainWeigh;
