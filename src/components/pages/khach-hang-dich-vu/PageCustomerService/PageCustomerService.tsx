import React, {Fragment, useState} from 'react';
import {IPageCustomerService, PropsPageCustomerService} from './interfaces';
import styles from './PageCustomerService.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import {LuPencil} from 'react-icons/lu';
import IconCustom from '~/components/common/IconCustom';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import Link from 'next/link';
import {HiOutlineLockClosed, HiOutlineLockOpen} from 'react-icons/hi';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	REGENCY_NAME,
	TYPE_PARTNER,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import partnerServices from '~/services/partnerServices';
import userServices from '~/services/userServices';
import TagStatus from '~/components/common/TagStatus';
import Loading from '~/components/common/Loading';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import regencyServices from '~/services/regencyServices';
import FlexLayout from '~/components/layouts/FlexLayout';
import FullColumnFlex from '~/components/layouts/FlexLayout/components/FullColumnFlex';

function PageCustomerService({}: PropsPageCustomerService) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _manager, _dateFrom, _dateTo, _status, _userUuid} = router.query;
	const [uuidDescription, setUuidDescription] = useState<string>('');
	const [dataStatus, setDataStatus] = useState<IPageCustomerService | null>(null);

	const listRegency = useQuery([QUERY_KEY.dropdown_chuc_vu], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: regencyServices.listRegency({
					page: 1,
					pageSize: 50,
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

	const listUser = useQuery([QUERY_KEY.dropdown_nguoi_quan_ly], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: userServices.listUser({
					page: 1,
					pageSize: 50,
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

	const listPartner = useQuery([QUERY_KEY.table_cong_ty, _page, _pageSize, _keyword, _status, _userUuid], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: partnerServices.listPartner({
					pageSize: Number(_pageSize) || 50,
					page: Number(_page) || 1,
					keyword: (_keyword as string) || '',
					status: !!_status ? Number(_status) : null,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					isPaging: CONFIG_PAGING.IS_PAGING,
					userUuid: (_userUuid as string) || '',
					provinceId: '',
					type: TYPE_PARTNER.KH_DICH_VU,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.BI_KHOA ? 'Mở khóa thành công' : 'Khóa thành công',
				http: partnerServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess: (data) => {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_cong_ty, _page, _pageSize, _keyword, _status]);
			}
		},
	});

	return (
		<Fragment>
			<FlexLayout>
				<Loading loading={funcChangeStatus.isLoading} />
				<div className={styles.header}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo tên khách hàng dịch vụ' />
						</div>
						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Người quản lý'
								query='_userUuid'
								listFilter={listUser?.data?.map((v: any) => ({
									id: v?.uuid,
									name: v?.fullName,
								}))}
							/>
						</div>

						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Trạng thái'
								query='_status'
								listFilter={[
									{
										id: CONFIG_STATUS.BI_KHOA,
										name: 'Bị khóa',
									},
									{
										id: CONFIG_STATUS.HOAT_DONG,
										name: 'Hoạt động',
									},
								]}
							/>
						</div>
					</div>

					<div className={styles.btn}>
						<Button
							href={PATH.ThemMoiKhachHangDichVu}
							p_8_16
							rounded_2
							icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						>
							Thêm mới
						</Button>
					</div>
				</div>

				<FullColumnFlex>
					<DataWrapper
						data={listPartner?.data?.items || []}
						loading={listPartner?.isLoading}
						noti={
							<Noti
								titleButton='Thêm mới'
								onClick={() => router.push(PATH.ThemMoiKhachHangDichVu)}
								des='Hiện tại chưa có khách hàng dịch vụ nào, thêm ngay?'
							/>
						}
					>
						<Table
							fixedHeader={true}
							data={listPartner?.data?.items || []}
							column={[
								{
									title: 'Mã KHDV',
									render: (data: IPageCustomerService) => <>{data?.code || '---'}</>,
								},
								{
									title: 'Tên khách hàng dịch vụ',
									fixedLeft: true,
									render: (data: IPageCustomerService) => (
										<Link href={`/khach-hang-dich-vu/${data?.uuid}`} className={styles.link}>
											{data?.name || '---'}
										</Link>
									),
								},
								{
									title: 'KV cảng xuất khẩu',
									render: (data: IPageCustomerService) => <>{data?.companyUu?.name || '---'}</>,
								},
								{
									title: 'SL nhà cung cấp',
									render: (data: IPageCustomerService) => <>{data?.countCustomer}</>,
								},
								{
									title: 'Số điện thoại',
									render: (data: IPageCustomerService) => <>{data?.phoneNumber || '---'}</>,
								},
								{
									title: 'Quản lý mua hàng',
									render: (data: IPageCustomerService) => <>{data?.userOwnerUu?.fullName || '---'}</>,
								},
								{
									title: 'Ghi chú',
									render: (data: IPageCustomerService) => (
										<TippyHeadless
											maxWidth={'100%'}
											interactive
											onClickOutside={() => setUuidDescription('')}
											visible={uuidDescription == data?.uuid}
											placement='bottom'
											render={(attrs) => (
												<div className={styles.main_description}>
													<p>{data?.description}</p>
												</div>
											)}
										>
											<Tippy content='Xem chi tiết mô tả'>
												<p
													onClick={() => {
														if (!data.description) {
															return;
														} else {
															setUuidDescription(uuidDescription ? '' : data.uuid);
														}
													}}
													className={clsx(styles.description, {[styles.active]: uuidDescription == data.uuid})}
												>
													{data?.description || '---'}
												</p>
											</Tippy>
										</TippyHeadless>
									),
								},
								{
									title: 'Trạng thái',
									render: (data: IPageCustomerService) => <TagStatus status={data.status} />,
								},
								{
									title: 'Tác vụ',
									fixedRight: true,
									render: (data: IPageCustomerService) => (
										<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
											<IconCustom
												edit
												icon={<LuPencil fontSize={20} fontWeight={600} />}
												tooltip='Chỉnh sửa'
												color='#777E90'
												href={`/khach-hang-dich-vu/chinh-sua?_id=${data?.uuid}`}
											/>

											<IconCustom
												lock
												icon={
													data?.status == CONFIG_STATUS.HOAT_DONG ? (
														<HiOutlineLockClosed size='22' />
													) : (
														<HiOutlineLockOpen size='22' />
													)
												}
												tooltip={data.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa' : 'Mở khóa'}
												color='#777E90'
												onClick={() => {
													setDataStatus(data);
												}}
											/>
										</div>
									),
								},
							]}
						/>
					</DataWrapper>
					<Pagination
						currentPage={Number(_page) || 1}
						total={listPartner?.data?.pagination?.totalCount}
						pageSize={Number(_pageSize) || 50}
						dependencies={[_pageSize, _keyword, _manager, _dateFrom, _dateTo, _status]}
					/>
				</FullColumnFlex>
			</FlexLayout>
			<Dialog
				danger
				open={!!dataStatus}
				s
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa khách hàng dịch vụ' : 'Dùng khách hàng dịch vụ'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa khách hàng dịch vụ này?'
						: 'Bạn có chắc chắn muốn dùng khách hàng dịch vụ này?'
				}
				onSubmit={funcChangeStatus.mutate}
			/>
		</Fragment>
	);
}

export default PageCustomerService;
