import DataWrapper from '~/components/common/DataWrapper';
import {PropsMainAbnormalSituations} from './interfaces';
import styles from './MainAbnormalSituations.module.scss';
import Pagination from '~/components/common/Pagination';
import Link from 'next/link';
import Table from '~/components/common/Table';
import clsx from 'clsx';
import FilterCustom from '~/components/common/FilterCustom';
import Search from '~/components/common/Search';
import {useRouter} from 'next/router';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import TagSituationsStatus from './components/TagSituationsStatus';
import Interact from './components/Interact';
import {STATUS_SITUATIONS} from '~/constants/config/enum';
function MainAbnormalSituations({}: PropsMainAbnormalSituations) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _manager, _company, _type} = router.query;

	const listTest = [0, 0, 1, 2, 0, 1, 2, 0, 1, 2, 2];

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
				<DataWrapper data={listTest} loading={false}>
					<Table
						data={listTest}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index}</>,
							},
							{
								title: 'Số phiếu',
								render: (data: any, index: number) => <>{index + 56}</>,
							},
							{
								title: 'Mã tình huống',
								render: (data: any) => (
									<p className={clsx(styles.status, {[styles.create]: true}, styles.linkdetail)}>Tạo phiếu cân</p>
								),
							},
							{
								title: 'Mã lựa chọn',
								render: (data: any) => <span style={{color: 'var(--primary)'}}>3</span>,
							},
							{
								title: 'Lý do',
								render: (data: any) => <>---</>,
							},
							{
								title: 'Thời gian',
								render: (data: any) => <>20:48:50 - 08/05/2024</>,
							},
							{
								title: 'Trạng thái',
								render: (data: any) => <TagSituationsStatus status={data} />,
							},
							{
								title: 'Hành động',
								render: (data: any) =>
									data === STATUS_SITUATIONS.CHUA_KIEM_DUYET ? (
										<Interact onSubmit={() => console.log('onSubmit')} onCancel={() => console.log('onCancel')} />
									) : (
										<></>
									),
							},
							{
								title: 'Người kiểm duyệt',
								render: (data: any) => <>Dương Văn Bé</>,
							},
						]}
					/>
					<Pagination
						currentPage={Number(_page) || 1}
						total={listTest.length}
						pageSize={Number(_pageSize) || 50}
						dependencies={[_pageSize, _keyword, _manager, _company]}
					/>
				</DataWrapper>
			</div>
		</div>
	);
}

export default MainAbnormalSituations;
