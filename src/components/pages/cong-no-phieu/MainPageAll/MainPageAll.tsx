import React from 'react';
import {IDebtBill, PropsMainPageAll} from './interfaces';
import styles from './MainPageAll.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import DataWrapper from '~/components/common/DataWrapper';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import clsx from 'clsx';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	REGENCY_NAME,
	STATUS_BILL,
	TYPE_PARTNER,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import regencyServices from '~/services/regencyServices';
import debtBillServices from '~/services/debtBillServices';
import {convertCoin} from '~/common/funcs/convertCoin';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Moment from 'react-moment';
import partnerServices from '~/services/partnerServices';

function MainPageAll({}: PropsMainPageAll) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _partnerUuid, _userUuid, _dateFrom, _dateTo} = router.query;

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
					userUuid: '',
					status: CONFIG_STATUS.HOAT_DONG,
					provinceId: '',
					type: TYPE_PARTNER.NCC,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listRegency = useQuery([QUERY_KEY.dropdown_chuc_vu], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: regencyServices.listRegency({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listUser = useQuery([QUERY_KEY.dropdown_nhan_vien_thi_truong], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: userServices.listUser({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					provinceIDOwer: '',
					regencyUuid: listRegency?.data?.find((v: any) => v?.code == REGENCY_NAME['Quản lý nhập hàng'])
						? listRegency?.data?.find((v: any) => v?.code == REGENCY_NAME['Quản lý nhập hàng'])?.uuid
						: null,
					regencyUuidExclude: '',
				}),
			}),
		select(data) {
			return data;
		},
		enabled: listRegency.isSuccess,
	});

	const listDebtBill = useQuery(
		[QUERY_KEY.table_cong_no_phieu, _page, _pageSize, _keyword, _partnerUuid, _userUuid, _dateFrom, _dateTo],
		{
			queryFn: () =>
				httpRequest({
					isList: true,
					http: debtBillServices.getListDebtBill({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 20,
						keyword: (_keyword as string) || '',
						isDescending: CONFIG_DESCENDING.IS_DESCENDING,
						status: [STATUS_BILL.DA_CAN_CHUA_KCS, STATUS_BILL.DA_KCS],
						partnerUuid: (_partnerUuid as string) || '',
						userUuid: (_userUuid as string) || '',
						timeStart: _dateFrom ? (_dateFrom as string) : null,
						timeEnd: _dateTo ? (_dateTo as string) : null,
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã lô hàng' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Đối tác'
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
							name='Quản lý nhập liệu'
							query='_userUuid'
							listFilter={listUser?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.fullName,
							}))}
						/>
					</div>

					<div className={styles.filter}>
						<DateRangerCustom titleTime='Thời gian' />
					</div>
				</div>
			</div>
			<div className={clsx('mt')}>
				<div className={styles.parameter}>
					<div>
						TỔNG LÔ HÀNG: <span style={{color: '#2D74FF', marginLeft: 4}}>{listDebtBill?.data?.pagination?.totalCount}</span>
					</div>
					<div>
						TỔNG CÔNG NỢ TẠM TÍNH: <span style={{marginLeft: 4}}>{convertCoin(listDebtBill?.data?.debtDemo)} VND</span>
					</div>
					<div>
						TỔNG CÔNG NỢ CHUẨN: <span style={{marginLeft: 4}}>{convertCoin(listDebtBill?.data?.debtReal)} VND</span>
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={listDebtBill?.data?.items || []}
					loading={listDebtBill?.isLoading}
					noti={<Noti disableButton={true} title='Dữ liệu trống!' des='Danh sách công nợ phiếu trống!' />}
				>
					<Table
						data={listDebtBill?.data?.items || []}
						column={[
							{
								title: 'Mã lô',
								fixedLeft: true,
								render: (data: IDebtBill) => <>{data?.code}</>,
							},
							{
								title: 'Trạng thái',
								render: (data: IDebtBill) => (
									<span style={{color: data.status === STATUS_BILL.DA_KCS ? 'blue' : 'red'}}>
										{data?.status == STATUS_BILL.DA_CAN_CHUA_KCS && 'Chưa KCS'}
										{data?.status == STATUS_BILL.DA_KCS && 'Đã KCS'}
									</span>
								),
							},
							{
								title: 'Đối tác',
								render: (data: IDebtBill) => <>{data?.fromUu?.partnerUu?.name || '---'}</>,
							},
							{
								title: 'Quản lý nhập liệu',
								render: (data: IDebtBill) => <>{data?.fromUu?.userUu?.fullName || '---'}</>,
							},
							{
								title: 'KL hàng (Tấn)',
								render: (data: IDebtBill) => <>{convertCoin(data?.weightTotal)}</>,
							},
							{
								title: 'Quy cách',
								render: (data: IDebtBill) => <>{data?.specificationsUu?.name}</>,
							},
							{
								title: 'Loại gỗ',
								render: (data: IDebtBill) => <>{data?.productTypeUu?.name}</>,
							},
							{
								title: 'Giá tiền (VND)',
								render: (data: IDebtBill) => <>{convertCoin(data?.priceTagUu?.amount)}</>,
							},
							{
								title: 'Công nợ tạm tính (VND)',
								render: (data: IDebtBill) => (
									<>{data?.status == STATUS_BILL.DA_CAN_CHUA_KCS ? convertCoin(data?.moneyTotal) : '---'}</>
								),
							},
							{
								title: 'Công nợ chuẩn (VND)',
								render: (data: IDebtBill) => (
									<>{data?.status == STATUS_BILL.DA_KCS ? convertCoin(data?.moneyTotal) : '---'}</>
								),
							},
							{
								title: 'Ngày nhập',
								render: (data: IDebtBill) => (
									<>{data?.timeStart ? <Moment date={data?.timeStart} format='DD/MM/YYYY' /> : '---'}</>
								),
							},
							{
								title: 'Tác vụ',
								fixedRight: true,
								render: (data: IDebtBill) => (
									<Link href={`/cong-no-phieu/${data?.uuid}`} className={styles.linkdetail}>
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
					total={listDebtBill?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _partnerUuid, _userUuid, _dateFrom, _dateTo]}
				/>
			</div>
		</div>
	);
}

export default MainPageAll;
