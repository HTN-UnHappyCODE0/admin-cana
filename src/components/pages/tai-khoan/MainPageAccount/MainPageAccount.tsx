import React, {Fragment, useState} from 'react';
import {IAccount, PropsMainPageAccount} from './interfaces';
import styles from './MainPageAccount.module.scss';
import Search from '~/components/common/Search';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import {HiOutlineLockClosed, HiOutlineLockOpen} from 'react-icons/hi';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import accountServices from '~/services/accountServices';
import Loading from '~/components/common/Loading';
import TagStatus from '~/components/common/TagStatus';
import FilterCustom from '~/components/common/FilterCustom';
import PopupUpdateAccount from '../PopupUpdateAccount';
import Popup from '~/components/common/Popup';
import regencyServices from '~/services/regencyServices';
import ImageFill from '~/components/common/ImageFill';
import Link from 'next/link';
import FlexLayout from '~/components/layouts/FlexLayout';
import FullColumnFlex from '~/components/layouts/FlexLayout/components/FullColumnFlex';

function MainPageAccount({}: PropsMainPageAccount) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _status, _regencyUuid} = router.query;

	const [dataStatus, setDataStatus] = useState<IAccount | null>(null);
	const [dataUpdateAccount, setDataUpdateAccount] = useState<IAccount | null>(null);

	const funcChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Dừng hoạt động thành công' : 'Mở khóa thành công',
				http: accountServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_tai_khoan]);
			}
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

	const listAccount = useQuery([QUERY_KEY.table_tai_khoan, _page, _pageSize, _keyword, _status, _regencyUuid], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: accountServices.getListAccount({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: !!_status ? Number(_status) : null,
					roleUuid: '',
					regencyUuid: (_regencyUuid as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<Fragment>
			<FlexLayout>
				<Loading loading={funcChangeStatus.isLoading} />
				<div className={styles.header}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo tên người dùng' />
						</div>
						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Trạng thái'
								query='_status'
								listFilter={[
									{
										id: CONFIG_STATUS.HOAT_DONG,
										name: 'Đang hoạt động',
									},
									{
										id: CONFIG_STATUS.BI_KHOA,
										name: 'Bị khóa',
									},
								]}
							/>
						</div>

						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Chức vụ'
								query='_regencyUuid'
								listFilter={listRegency?.data?.map((v: any) => ({
									id: v?.uuid,
									name: v?.name,
								}))}
							/>
						</div>
					</div>
				</div>

				<FullColumnFlex>
					<DataWrapper
						data={listAccount?.data?.items || []}
						loading={listAccount.isLoading}
						noti={<Noti disableButton titleButton='Thêm người dùng' des='Hiện tại chưa có người dùng nào' />}
					>
						<Table
							fixedHeader={true}
							data={listAccount?.data?.items || []}
							column={[
								{
									title: 'STT',
									render: (data: IAccount, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Mã người dùng',
									render: (data: IAccount) => <p style={{fontWeight: 600}}>{data.user?.code || '---'}</p>,
								},
								{
									title: 'Tên người dùng',
									fixedLeft: true,
									render: (data: IAccount) => (
										<div className={styles.info}>
											<ImageFill
												src={`${process.env.NEXT_PUBLIC_IMAGE}/${data.user?.linkImage}`}
												alt='avatar'
												className={styles.image}
											/>
											<Link className={styles.link} href={`/nhan-vien/${data?.user?.uuid}`}>
												{data.user?.fullName || '---'}
											</Link>
										</div>
									),
								},
								{
									title: 'Tên tài khoản',
									render: (data: IAccount) => <>{data?.username || '---'}</>,
								},
								{
									title: 'Số điện thoại',
									render: (data: IAccount) => <>{data.user?.phoneNumber || '---'}</>,
								},

								{
									title: 'Chức vụ',
									render: (data: IAccount) => <>{data.user?.regencyUu?.name || '---'}</>,
								},
								{
									title: 'Trạng thái',
									render: (data: IAccount) => <TagStatus status={data.status} />,
								},
								{
									title: 'Tác vụ',
									fixedRight: true,
									render: (data: IAccount) => (
										<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
											<IconCustom
												edit
												icon={<LuPencil fontSize={20} fontWeight={600} />}
												tooltip='Chỉnh sửa'
												color='#777E90'
												onClick={() => {
													setDataUpdateAccount(data);
												}}
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
						total={listAccount?.data?.pagination?.totalCount}
						pageSize={Number(_pageSize) || 50}
						dependencies={[_pageSize, _keyword, _status, _regencyUuid]}
					/>
				</FullColumnFlex>
			</FlexLayout>
			<Popup open={!!dataUpdateAccount} onClose={() => setDataUpdateAccount(null)}>
				<PopupUpdateAccount dataUpdateAccount={dataUpdateAccount} onClose={() => setDataUpdateAccount(null)} />
			</Popup>

			<Dialog
				danger
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa hoạt động tài khoản' : 'Mở khóa hoạt động tài khoản'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa hoạt động tài khoản này?'
						: 'Bạn có chắc chắn muốn mở khóa hoạt động tài khoản này?'
				}
				onSubmit={funcChangeStatus.mutate}
			/>
		</Fragment>
	);
}

export default MainPageAccount;
