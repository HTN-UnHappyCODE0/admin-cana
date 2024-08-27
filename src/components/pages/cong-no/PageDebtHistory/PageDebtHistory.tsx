import React from 'react';
import styles from './PageDebtHistory.module.scss';
import {ITransaction, PropsPageDebtHistory} from './interface';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import DataWrapper from '~/components/common/DataWrapper';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import StatePaymentMode from '../StatePaymentMode';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_TRANSACTION,
	TYPE_PARTNER,
	TYPE_TRANSACTION,
} from '~/constants/config/enum';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import partnerServices from '~/services/partnerServices';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Moment from 'react-moment';
import {convertCoin} from '~/common/funcs/convertCoin';
import Pagination from '~/components/common/Pagination';
import Link from 'next/link';
import Popup from '~/components/common/Popup';
import PopupDetailDebtHistory from '../PopupDetailDebtHistory';
import transactionServices from '~/services/transactionServices';

const PageDebtHistory = ({}: PropsPageDebtHistory) => {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _partnerUuid, _type, _dateFrom, _dateTo, _status, _uuid} = router.query;

	const listPartner = useQuery([QUERY_KEY.dropdown_nha_cung_cap], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: partnerServices.listPartner({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					userUuid: '',
					provinceId: '',
					type: TYPE_PARTNER.NCC,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listTransaction = useQuery(
		[QUERY_KEY.table_lich_su_thanh_toan, _page, _pageSize, _keyword, _partnerUuid, _type, _dateFrom, _dateTo, _status],
		{
			queryFn: () =>
				httpRequest({
					isList: true,
					http: transactionServices.listTransaction({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 20,
						keyword: (_keyword as string) || '',
						isPaging: CONFIG_PAGING.IS_PAGING,
						isDescending: CONFIG_DESCENDING.NO_DESCENDING,
						typeFind: CONFIG_TYPE_FIND.TABLE,
						status: !!_status ? Number(_status) : null,
						type: !!_type ? Number(_type) : null,
						partnerUuid: (_partnerUuid as string) || '',
						timeStart: _dateFrom ? (_dateFrom as string) : null,
						timeEnd: _dateTo ? (_dateTo as string) : null,
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	const getTextPaymentMethod = (amountCash: number, amountBank: number, type: number) => {
		if (type == TYPE_TRANSACTION.THUE) {
			return '---';
		} else {
			if (amountCash > 0 && amountBank == 0) {
				return 'Tiền mặt';
			}
			if (amountCash == 0 && amountBank > 0) {
				return 'Chuyển khoản';
			}
			if (amountCash > 0 && amountBank > 0) {
				return 'Tiền mặt + Chuyển khoản';
			}

			return '---';
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã GD' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Nhà cung cấp'
							query='_partnerUuid'
							listFilter={listPartner?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Hình thức'
							query='_type'
							listFilter={[
								{id: TYPE_TRANSACTION.THU_HOI, name: 'Thu hồi công nợ'},
								{id: TYPE_TRANSACTION.THANH_TOAN, name: 'Thanh toán công nợ'},
								{id: TYPE_TRANSACTION.THUE, name: 'Thanh toán thuế'},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<DateRangerCustom titleTime='Thời gian' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_status'
							listFilter={[
								{id: STATUS_TRANSACTION.DA_XOA, name: 'Đã xóa'},
								{id: STATUS_TRANSACTION.BINH_THUONG, name: 'Bình thường'},
							]}
						/>
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={listTransaction?.data?.items || []}
					loading={listTransaction?.isLoading}
					noti={<Noti disableButton={true} title='Dữ liệu trống!' des='Danh sách lịch sử thanh toán trống!' />}
				>
					<Table
						data={listTransaction?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: ITransaction, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Mã giao dịch',
								fixedLeft: true,
								render: (data: ITransaction) => <>{data?.code || '---'}</>,
							},
							{
								title: 'Thời gian',
								render: (data: ITransaction) => <Moment date={data?.created} format='DD/MM/YYYY' />,
							},
							{
								title: 'Nhà cung cấp',
								render: (data: ITransaction) => <>{data?.partnerUu?.name}</>,
							},
							{
								title: 'Hình thức',
								render: (data: ITransaction) => <StatePaymentMode state={data?.type} />,
							},
							{
								title: 'Phương thức',
								render: (data: ITransaction) => <>{getTextPaymentMethod(data?.amountCash, data?.amountBank, data?.type)}</>,
							},
							{
								title: 'Số tiền (VND)',
								render: (data: ITransaction) => <>{convertCoin(data?.totalAmount)}</>,
							},
							{
								title: 'Tác vụ',
								fixedRight: true,
								render: (data: ITransaction) => (
									<Link href={`/cong-no/lich-su?_uuid=${data?.uuid}`} className={styles.linkdetail}>
										Chi tiết
									</Link>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={listTransaction?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _partnerUuid, _type, _dateFrom, _dateTo, _status]}
				/>
				<Popup open={!!_uuid} onClose={() => router.replace('/cong-no/lich-su')}>
					<PopupDetailDebtHistory onClose={() => router.replace('/cong-no/lich-su')} />
				</Popup>
			</div>
		</div>
	);
};

export default PageDebtHistory;
