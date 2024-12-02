import DataWrapper from '~/components/common/DataWrapper';
import {ILog, PropsMainAbnormalSituations} from './interfaces';
import styles from './MainAbnormalSituations.module.scss';
import Pagination from '~/components/common/Pagination';
import Table from '~/components/common/Table';
import clsx from 'clsx';
import Search from '~/components/common/Search';
import {useRouter} from 'next/router';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import logServices from '~/services/logServices';
import {useQuery} from '@tanstack/react-query';
import Noti from '~/components/common/DataWrapper/components/Noti';
import FullColumnFlex from '~/components/layouts/FlexLayout/components/FullColumnFlex';
import FlexLayout from '~/components/layouts/FlexLayout';
import {Fragment, useState} from 'react';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
function MainAbnormalSituations({}: PropsMainAbnormalSituations) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _status, _type} = router.query;
	const [uuidDescription, setUuidDescription] = useState<string>('');
	const [uuidCase, setUuidCase] = useState<string>('');
	const [uuidCaseSelection, setUuidCaseSelection] = useState<string>('');

	const listLog = useQuery([QUERY_KEY.table_log_bat_thuong, _page, _pageSize, _keyword, _status, _type], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: logServices.getListLog({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 200,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: !!_status ? Number(_status) : null,
					caseId: null,
					weightSessionUuid: '',
					type: !!_type ? Number(_type) : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<Fragment>
			<FlexLayout>
				<div className={styles.header}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo...' />
						</div>
						<div className={styles.filter}>
							<DateRangerCustom />
						</div>
					</div>
				</div>

				<FullColumnFlex>
					<DataWrapper
						data={listLog?.data?.items || []}
						loading={listLog?.isLoading}
						noti={<Noti des='Hiện tại chưa có thông tin nào!' disableButton />}
					>
						<Table
							fixedHeader={true}
							data={listLog?.data?.items || []}
							column={[
								{
									title: 'STT',
									render: (data: ILog, index: number) => <>{index}</>,
								},
								{
									title: 'Tài khoản',
									fixedLeft: true,
									render: (data: ILog) => <>{data?.accountUu?.username || '---'}</>,
								},
								{
									title: 'Lượt cân',
									render: (data: ILog) => <>{data?.weightSessionUu?.code || '---'}</>,
								},
								{
									title: 'Biển số xe',
									render: (data: ILog) => <>{data?.weightSessionUu?.truckUu?.licensePalate || '---'}</>,
								},

								{
									title: 'Tình huống',
									render: (data: ILog) => (
										<TippyHeadless
											maxWidth={'100%'}
											interactive
											onClickOutside={() => setUuidCase('')}
											visible={uuidCase == data?.uuid}
											placement='bottom'
											render={(attrs) => (
												<div className={styles.main_description}>
													<p>{data?.caseSelection?.name}</p>
												</div>
											)}
										>
											<Tippy content='Xem chi tiết mô tả'>
												<p
													onClick={() => {
														if (!data.caseSelection?.name) {
															return;
														} else {
															setUuidCase(uuidCase ? '' : data.uuid);
														}
													}}
													className={clsx(styles.description, {[styles.active]: uuidCase == data.uuid})}
												>
													{data?.case?.name || '---'}
												</p>
											</Tippy>
										</TippyHeadless>
									),
								},
								{
									title: 'Phương án xử lý',
									render: (data: ILog) => (
										<TippyHeadless
											maxWidth={'100%'}
											interactive
											onClickOutside={() => setUuidDescription('')}
											visible={uuidDescription == data?.uuid}
											placement='bottom'
											render={(attrs) => (
												<div className={styles.main_description}>
													<p>{data?.plan?.name}</p>
												</div>
											)}
										>
											<Tippy content='Xem chi tiết mô tả'>
												<p
													onClick={() => {
														if (!data.plan?.name) {
															return;
														} else {
															setUuidDescription(uuidDescription ? '' : data.uuid);
														}
													}}
													className={clsx(styles.description, {[styles.active]: uuidDescription == data.uuid})}
												>
													{data?.plan?.name || '---'}
												</p>
											</Tippy>
										</TippyHeadless>
									),
								},

								{
									title: 'Lý do',
									render: (data: ILog) => (
										<TippyHeadless
											maxWidth={'100%'}
											interactive
											onClickOutside={() => setUuidCaseSelection('')}
											visible={uuidCaseSelection == data?.uuid}
											placement='bottom'
											render={(attrs) => (
												<div className={styles.main_description}>
													<p>{data?.caseSelection?.name}</p>
												</div>
											)}
										>
											<Tippy content='Xem chi tiết mô tả'>
												<p
													onClick={() => {
														if (!data.caseSelection?.name) {
															return;
														} else {
															setUuidCaseSelection(uuidCaseSelection ? '' : data.uuid);
														}
													}}
													className={clsx(styles.description, {[styles.active]: uuidCaseSelection == data.uuid})}
												>
													{data?.caseSelection?.name || '---'}
												</p>
											</Tippy>
										</TippyHeadless>
									),
								},
							]}
						/>
						<Pagination
							currentPage={Number(_page) || 1}
							total={listLog?.data?.pagination?.totalCount}
							pageSize={Number(_pageSize) || 200}
							dependencies={[_pageSize, _keyword, _status, _type]}
						/>
					</DataWrapper>
				</FullColumnFlex>
			</FlexLayout>
		</Fragment>
	);
}

export default MainAbnormalSituations;
