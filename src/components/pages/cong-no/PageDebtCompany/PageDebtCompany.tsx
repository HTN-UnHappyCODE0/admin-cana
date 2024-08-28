import React from 'react';
import styles from './PageDebtCompany.module.scss';
import {IPartnerDebt, PropsPageDebtCompany} from './interface';
import Search from '~/components/common/Search';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import {useRouter} from 'next/router';
import MoneyDebt from '../MoneyDebt';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, TYPE_PARTNER} from '~/constants/config/enum';
import partnerServices from '~/services/partnerServices';
import {httpRequest} from '~/services';
import Pagination from '~/components/common/Pagination';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {convertCoin} from '~/common/funcs/convertCoin';
import Moment from 'react-moment';

const PageDebtCompany = ({}: PropsPageDebtCompany) => {
	const router = useRouter();

	const {_page, _pageSize, _keyword} = router.query;

	const listPartnerDebt = useQuery([QUERY_KEY.table_cong_no_nha_cung_cap, _page, _pageSize, _keyword], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: partnerServices.listPartnerDebt({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					status: null,
					provinceId: '',
					userUuid: '',
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					type: TYPE_PARTNER.NCC,
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm đối tác' />
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={listPartnerDebt?.data?.items || []}
					loading={listPartnerDebt?.isLoading}
					noti={<Noti disableButton={true} title='Dữ liệu trống!' des='Danh sách công nợ đối tác trống!' />}
				>
					<Table
						data={listPartnerDebt?.data?.items || []}
						column={[
							{
								title: 'Mã đối tác',
								render: (data: IPartnerDebt) => <>{data?.code}</>,
							},
							{
								title: 'Tên đối tác',
								fixedLeft: true,
								render: (data: IPartnerDebt) => (
									<Link href={`/nha-cung-cap/${data?.uuid}`} className={styles.link}>
										{data?.name}
									</Link>
								),
							},
							{
								title: 'Số NCC',
								render: (data: IPartnerDebt) => <>{data?.countCustomer}</>,
							},
							{
								title: 'Công nợ tạm tính (VND)',
								render: (data: IPartnerDebt) => <>{convertCoin(data?.debtDemo)}</>,
							},
							{
								title: 'Công nợ chuẩn (VND)',
								render: (data: IPartnerDebt) => <>{convertCoin(data?.debtReal)}</>,
							},
							{
								title: 'Tổng công nợ (VND)',
								render: (data: IPartnerDebt) => <>{convertCoin(data?.debtDemo + data?.debtReal)}</>,
							},

							{
								title: 'Thuế đã trả (VND)',
								render: (data: IPartnerDebt) => <>{convertCoin(data?.tax)}</>,
							},
							{
								title: 'Thanh toán gần nhất',
								fixedRight: true,
								render: (data: IPartnerDebt) => (
									<>
										{data?.lastTransaction ? (
											<p style={{display: 'flex', flexDirection: 'column', gap: 2}}>
												<span>
													<Moment date={data?.lastTransaction?.created} format='DD/MM/YYYY' />
												</span>
												<MoneyDebt value={data?.lastTransaction?.totalAmount} />
											</p>
										) : (
											'---'
										)}
									</>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={listPartnerDebt?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword]}
				/>
			</div>
		</div>
	);
};

export default PageDebtCompany;
