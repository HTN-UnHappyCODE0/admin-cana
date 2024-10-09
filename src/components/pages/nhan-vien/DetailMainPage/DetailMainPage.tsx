import React, {Fragment, useState} from 'react';
import {ICustomer, IUserDetail, PropsDetailMainPage} from './interfaces';
import styles from './DetailMainPage.module.scss';
import Link from 'next/link';
import {IoArrowBackOutline} from 'react-icons/io5';
import {LuPencil} from 'react-icons/lu';
import {PATH} from '~/constants/config';
import {HiOutlineLockClosed, HiOutlineLockOpen} from 'react-icons/hi';
import clsx from 'clsx';
import Table from '~/components/common/Table';
import Button from '~/components/common/Button';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, GENDER, QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import Moment from 'react-moment';
import Dialog from '~/components/common/Dialog';
import customerServices from '~/services/customerServices';
import Pagination from '~/components/common/Pagination';
import TagStatus from '~/components/common/TagStatus';
import {getTextAddress} from '~/common/funcs/optionConvert';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
function DetailMainPage({}: PropsDetailMainPage) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {infoUser} = useSelector((state: RootState) => state.user);

	const {_id, _page, _pageSize, _status} = router.query;

	const [openChangeStatus, setOpenChangeStatus] = useState<boolean>(false);
	const [uuidDescription, setUuidDescription] = useState<string>('');

	const {data: detailUser} = useQuery<IUserDetail>([QUERY_KEY.chi_tiet_nhan_vien, _id], {
		queryFn: () =>
			httpRequest({
				http: userServices.detailUser({
					uuid: _id as string,
				}),
			}),
		onSuccess(data) {
			return data;
		},
		enabled: !!_id,
	});

	const listCustomer = useQuery([QUERY_KEY.table_khach_hang_quan_ly, _id, _page, _pageSize], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: customerServices.listCustomer({
					userUuid: _id as string,
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 50,
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					partnerUUid: '',
					status: !!_status ? Number(_status) : null,
					typeCus: null,
					provinceId: '',
					specUuid: '',
				}),
			}),
		onSuccess(data) {
			console.log(data);
		},
		enabled: !!_id,
	});

	const funcChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess:
					detailUser?.status == CONFIG_STATUS.HOAT_DONG ? 'Dừng hoạt động nhân viên thành công' : 'Mở khóa nhân viên thành công',
				http: userServices.changeStatus({
					uuid: detailUser?.uuid!,
					status: detailUser?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setOpenChangeStatus(false);
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_nhan_vien, _id]);
			}
		},
	});
	return (
		<div>
			<Fragment>
				<Loading loading={funcChangeStatus.isLoading} />
				<div>
					<div className={styles.header}>
						<Link href={PATH.NhanVien} className={styles.header_title}>
							<IoArrowBackOutline fontSize={20} fontWeight={600} />
							<p>Chi tiết nhân viên: {detailUser?.fullName}</p>
						</Link>

						{detailUser?.uuid != infoUser?.userUuid && (
							<div className={styles.list_btn}>
								<Button
									rounded_2
									w_fit
									light_outline
									p_8_16
									bold
									icon={<LuPencil color='#23262F' fontSize={16} fontWeight={600} />}
									onClick={() => router.push(`${PATH.NhanVien}/chinh-sua?_id=${detailUser?.uuid}`)}
								>
									Chỉnh sửa
								</Button>

								<Button
									rounded_2
									w_fit
									light_outline
									p_8_16
									bold
									icon={
										detailUser?.status == CONFIG_STATUS.HOAT_DONG ? (
											<HiOutlineLockClosed color='#23262F' fontSize={18} fontWeight={600} />
										) : (
											<HiOutlineLockOpen color='#23262F' fontSize={18} fontWeight={600} />
										)
									}
									onClick={() => setOpenChangeStatus(true)}
								>
									{detailUser?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa' : 'Mở khóa'}
								</Button>
							</div>
						)}
					</div>
					<div className={clsx('mt')}>
						<table className={styles.container}>
							<colgroup>
								<col style={{width: '50%'}} />
								<col style={{width: '50%'}} />
							</colgroup>
							<tr>
								<td>
									<span>Mã nhân viên: </span>
									{detailUser?.code || '---'}
								</td>
								<td>
									<span>Vai trò: </span> {'---'}
								</td>
							</tr>
							<tr>
								<td>
									<span>Chức vụ: </span>
									{detailUser?.regencyUu?.name || '---'}
								</td>
								<td>
									<span>Người quản lý: </span>
									{detailUser?.userOwnerUu?.fullName || '---'}
								</td>
							</tr>

							<tr>
								<td>
									<span>Email: </span> <span style={{color: 'var(--primary)'}}>{detailUser?.email || '---'}</span>
								</td>
								{/* <td>
									<span>Người tạo:</span> {'---'}
								</td> */}
								<td>
									<div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
										<span>Trạng thái: </span>
										<span>
											<TagStatus status={detailUser?.status as CONFIG_STATUS} />
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<span>Giới tính: </span> {detailUser?.sex == GENDER.NAM ? 'Nam' : 'Nữ' || '---'}
								</td>
								<td>
									<span>Ngày sinh: </span>
									<Moment date={detailUser?.birthDay || '---'} format='DD/MM/YYYY' />
								</td>
							</tr>
							<tr>
								<td>
									<span>Số điện thoại: </span>
									{detailUser?.phoneNumber || '---'}
								</td>
								<td rowSpan={2} className={styles.description}>
									<span>Ghi chú: </span>
									{detailUser?.description || '---'}
								</td>
							</tr>
							<tr>
								<td>
									<span>Tỉnh thành quản lý: </span>
									{detailUser?.provinceOwner || '---'}
								</td>
							</tr>
						</table>
					</div>
					<div>
						<h2 className={clsx('mt', 'mb')}> Danh sách khách hàng quản lý</h2>
						<DataWrapper data={listCustomer?.data?.items || []} loading={listCustomer.isLoading} noti={<Noti disableButton />}>
							<Table
								data={listCustomer?.data?.items || []}
								column={[
									{
										title: 'Mã khách hàng',
										render: (data: ICustomer) => <>{data?.code || '---'}</>,
									},
									{
										title: 'Tên khách hàng',
										fixedLeft: true,
										render: (data: ICustomer) => (
											<Link href={`/khach-hang/${data?.uuid}`} className={styles.link}>
												{data?.name || '---'}
											</Link>
										),
									},
									{
										title: 'Thuộc công ty',
										render: (data: ICustomer) => <>{data?.partnerUu?.name || '---'}</>,
									},
									{
										title: 'Khu vực',
										render: (data: ICustomer) => <>{getTextAddress(data.detailAddress, data.address)}</>,
									},
									{
										title: 'Số điện thoại',
										render: (data: ICustomer) => <>{data?.phoneNumber || '---'}</>,
									},
									{
										title: 'Email',
										render: (data: ICustomer) => <>{data?.email || '---'}</>,
									},
									{
										title: 'Ghi chú',
										render: (data: ICustomer) => (
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
												<Tippy content='Xem chi tiết ghi chú'>
													<p
														onClick={() => {
															if (!data.description) {
																return;
															} else {
																setUuidDescription(uuidDescription ? '' : data.uuid);
															}
														}}
														className={clsx(styles.description, {
															[styles.active]: uuidDescription == data.uuid,
														})}
													>
														{data?.description || '---'}
													</p>
												</Tippy>
											</TippyHeadless>
										),
									},
								]}
							/>
						</DataWrapper>
					</div>
					<Pagination
						currentPage={Number(_page) || 1}
						pageSize={Number(_pageSize) || 50}
						total={listCustomer?.data?.pagination?.totalCount}
						dependencies={[_pageSize]}
					/>
				</div>
			</Fragment>
			<Dialog
				danger
				open={openChangeStatus}
				onClose={() => setOpenChangeStatus(false)}
				title={detailUser?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa hoạt động' : 'Mở khóa hoạt động'}
				note={
					detailUser?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa hoạt động chức vụ này?'
						: 'Bạn có chắc chắn muốn mở khóa hoạt động chức vụ này?'
				}
				onSubmit={funcChangeStatus.mutate}
			/>
		</div>
	);
}

export default DetailMainPage;
