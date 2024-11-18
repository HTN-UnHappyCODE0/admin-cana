import React, { Fragment, useState } from 'react';

import { ICustomer, IDetailCustomerService, PropsDetailCustomerService } from './interfaces';
import styles from './DetailCustomerService.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_CUSTOMER,
	TYPE_PARTNER,
} from '~/constants/config/enum';
import { useRouter } from 'next/router';
import { httpRequest } from '~/services';
import partnerServices from '~/services/partnerServices';
import customerServices from '~/services/customerServices';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import clsx from 'clsx';
import GridColumn from '~/components/layouts/GridColumn';
import TagStatus from '~/components/common/TagStatus';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Button from '~/components/common/Button';
import { LuPencil } from 'react-icons/lu';
import { getTextAddress } from '~/common/funcs/optionConvert';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import { PATH } from '~/constants/config';
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';
import IconCustom from '~/components/common/IconCustom';
import Popup from '~/components/common/Popup';
import PopupDeleteCustomer from '../../xuong/PopupDeleteCustomer';
import { RiDeleteBin5Line } from 'react-icons/ri';
import ItemDashboard from '../../trang-chu/ItemDashboard';

function DetailCustomerService({ }: PropsDetailCustomerService) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { _id, _page, _pageSize, _status } = router.query;

	const [openChangeStatus, setOpenChangeStatus] = useState<boolean>(false);
	const [dataDeleteCustomer, setDataDeleteCustomer] = useState<ICustomer | null>(null);
	const [dataChangeStatusCustomer, setDataChangeStatusCustomer] = useState<ICustomer | null>(null);

	const { data: detailPartner, isLoading } = useQuery<IDetailCustomerService>([QUERY_KEY.chi_tiet_nha_cung_cap, _id], {
		queryFn: () =>
			httpRequest({
				http: partnerServices.detailPartner({
					uuid: _id as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	const listCustomer = useQuery([QUERY_KEY.table_khach_hang_doi_tac, _id, _page, _pageSize], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: customerServices.listCustomer({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 200,
					keyword: '',
					specUuid: '',
					userUuid: '',
					provinceId: '',
					status: !!_status ? Number(_status) : null,
					typeCus: null,
					partnerUUid: _id as string,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					isPaging: CONFIG_PAGING.IS_PAGING,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	const funcChangeStatusPartner = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: detailPartner?.status == CONFIG_STATUS.BI_KHOA ? 'Mở khóa thành công' : 'Khóa thành công',
				http: partnerServices.changeStatus({
					uuid: detailPartner?.uuid!,
					status: detailPartner?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess: (data) => {
			if (data) {
				setOpenChangeStatus(false);
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_nha_cung_cap]);
			}
		},
	});

	const funcChangeStatusCustomer = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataChangeStatusCustomer?.status == CONFIG_STATUS.BI_KHOA ? 'Mở khóa thành công' : 'Khóa thành công',
				http: customerServices.changeStatus({
					uuid: dataChangeStatusCustomer?.uuid!,
					status:
						dataChangeStatusCustomer?.status! == STATUS_CUSTOMER.HOP_TAC
							? STATUS_CUSTOMER.DUNG_HOP_TAC
							: STATUS_CUSTOMER.HOP_TAC,
				}),
			});
		},
		onSuccess: (data) => {
			if (data) {
				setDataChangeStatusCustomer(null);
				queryClient.invalidateQueries([QUERY_KEY.table_khach_hang_doi_tac]);
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_nha_cung_cap]);
			}
		},
	});

	return (
		<Fragment>
			<Loading loading={funcChangeStatusPartner.isLoading} />
			<div className={styles.header}>
				<Link
					href={PATH.NhaCungCap}
					onClick={(e) => {
						e.preventDefault();
						window.history.back();
					}}
					className={styles.header_title}
				>
					<IoArrowBackOutline fontSize={20} fontWeight={600} />
					<p>Chi tiết khách hàng dịch vụ: {detailPartner?.name}</p>
				</Link>
				<div className={styles.list_btn}>
					<Button
						rounded_2
						w_fit
						light_outline
						p_8_16
						bold
						href={`/khach-hang-dich-vu/chinh-sua?_id=${detailPartner?.uuid}`}
						icon={<LuPencil color='#23262F' fontSize={16} fontWeight={600} />}
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
							detailPartner?.status == CONFIG_STATUS.HOAT_DONG ? (
								<HiOutlineLockClosed color='#23262F' fontSize={18} fontWeight={600} />
							) : (
								<HiOutlineLockOpen color='#23262F' fontSize={18} fontWeight={600} />
							)
						}
						onClick={() => setOpenChangeStatus(true)}
					>
						{detailPartner?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa' : 'Mở khóa'}
					</Button>
				</div>
			</div>
			<div>
				<div className={clsx('mt')}>
					<GridColumn col_4>
						<ItemDashboard
							isLoading={isLoading}
							color='#3772FF'
							text='Công nợ tạm tính'
							value={detailPartner?.debtDemo!}
							unit='VND'
						/>
						<ItemDashboard
							isLoading={isLoading}
							color='#3772FF'
							text='Công nợ chuẩn'
							value={detailPartner?.debtReal!}
							unit='VND'
						/>
						<ItemDashboard
							isLoading={isLoading}
							color='#3772FF'
							text='Tổng công nợ'
							value={detailPartner?.debtDemo! + detailPartner?.debtReal!}
							unit='VND'
						/>
						<ItemDashboard isLoading={isLoading} color='#3772FF' text='Tổng tiền thuế' value={detailPartner?.tax} unit='VND' />
					</GridColumn>
				</div>

				<div className={clsx('mt')}>
					<GridColumn col_5>
						<ItemDashboard isLoading={isLoading} color='#3772FF' text='Khách hàng' value={detailPartner?.countCustomer!} />
						<ItemDashboard isLoading={isLoading} color='#3772FF' text='Phiếu chưa KCS' value={detailPartner?.totalBillDemo!} />
						<ItemDashboard isLoading={isLoading} color='#3772FF' text='Phiếu đã KCS' value={detailPartner?.totalBillKCS!} />
						<ItemDashboard isLoading={isLoading} color='#3772FF' text='Số lần thu' value={detailPartner?.totalTransactionIn!} />
						<ItemDashboard
							isLoading={isLoading}
							color='#3772FF'
							text='Số lần chi'
							value={detailPartner?.totalTransactionOut!}
						/>
					</GridColumn>
				</div>
			</div>
			<div className={clsx('mt')}>
				<table className={styles.container}>
					<colgroup>
						<col style={{ width: '50%' }} />
						<col style={{ width: '50%' }} />
					</colgroup>
					<tr>
						<td>
							<span style={{ marginRight: 6 }}>Mã khách hàng dịch vụ:</span>
							<span style={{ marginRight: 6, color: '#3772FF' }}>{detailPartner?.code || '---'}</span>
						</td>
						<td>
							<span style={{ marginRight: 6 }}>Người liên hệ:</span> {detailPartner?.director || '---'}
						</td>
					</tr>
					<tr>
						<td>
							<span style={{ marginRight: 6 }}>Mã số thuế:</span> {detailPartner?.taxCode || '---'}
						</td>
						<td>
							<span style={{ marginRight: 6 }}>Địa chỉ:</span>
							{getTextAddress(detailPartner?.detailAddress, detailPartner?.address)}
						</td>
					</tr>
					<tr>
						<td>
							<span style={{ marginRight: 6 }}>Số điện thoại: </span>
							{detailPartner?.phoneNumber || '---'}
						</td>
						<td>
							<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
								<span style={{ marginRight: 6 }}>Trạng thái: </span>
								<span>
									<TagStatus status={detailPartner?.status as CONFIG_STATUS} />
								</span>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<span style={{ marginRight: 6 }}>Ngân hàng:</span>
							{detailPartner?.bankName || '---'}
						</td>
						<td rowSpan={4} className={styles.description}>
							<span style={{ marginRight: 6 }}>Mô tả:</span>
							{detailPartner?.description || '---'}
						</td>
					</tr>
					<tr>
						<td>
							<span style={{ marginRight: 6 }}>Email: </span>
							<span style={{ marginRight: 6, color: '#3772FF' }}>{detailPartner?.email || '---'}</span>
						</td>
					</tr>
					<tr>
						<td>
							<span style={{ marginRight: 6 }}>Số tài khoản: </span>
							{detailPartner?.bankAccount || '---'}
						</td>
					</tr>
				</table>
			</div>
			<div className={clsx('mt')}>
				<div className={styles.btn_header}>
					<div className={styles.main_table}>
						<h1 className={styles.list_title}>
							Danh sách khách hàng thuộc khách hàng dịch vụ ({listCustomer?.data?.pagination?.totalCount})
						</h1>
					</div>
					<div>
						<Button
							href={`${PATH.ThemMoiXuong}?_partnerUuid=${_id}&_typeCus=${TYPE_PARTNER.KH_DICH_VU}`}
							p_8_16
							rounded_2
							icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						>
							Thêm khách hàng
						</Button>
					</div>
				</div>
			</div>
			<div className={clsx('mt')}>
				<div className={styles.table}>
					<DataWrapper
						data={listCustomer.data?.items || []}
						loading={listCustomer.isLoading}
						noti={<Noti disableButton des='Hiện tại chưa có khách hàng nào!' />}
					>
						<Table
							data={listCustomer.data?.items || []}
							column={[
								{
									title: 'Mã khách hàng',
									render: (data: any) => <>{data.code}</>,
								},
								{
									title: 'Tên khách hàng',
									fixedLeft: true,
									render: (data: any) => (
										<Link href={`/xuong/${data?.uuid}?_typeCus=${TYPE_PARTNER.KH_DICH_VU}`} className={styles.link}>
											{data?.name || '---'}
										</Link>
									),
								},
								{
									title: 'Kho hàng',
									render: (data: any) => <>{data?.warehouseUu?.name || '---'}</>,
								},
								{
									title: 'Số điện thoại',
									render: (data: any) => <>{data.phoneNumber || '---'}</>,
								},
								{
									title: 'Email',
									render: (data: any) => <>{data.email || '---'}</>,
								},
								{
									title: 'Nhân viên',
									render: (data: any) => <>{data?.userUu?.fullName || '---'}</>,
								},
								{
									title: 'Trạng thái',
									render: (data: any) => <TagStatus status={data?.status} />,
								},
								{
									title: 'Tác vụ',
									fixedRight: true,
									render: (data: ICustomer) =>
										data?.status != STATUS_CUSTOMER.DA_XOA && (
											<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
												<IconCustom
													edit
													icon={
														data?.status == STATUS_CUSTOMER.HOP_TAC ? (
															<HiOutlineLockClosed fontSize={22} fontWeight={600} />
														) : (
															<HiOutlineLockOpen fontSize={22} fontWeight={600} />
														)
													}
													tooltip={data?.status == STATUS_CUSTOMER.HOP_TAC ? 'Khóa' : 'Mở khóa'}
													color='#777E90'
													onClick={() => {
														setDataChangeStatusCustomer(data);
													}}
												/>
												<IconCustom
													edit
													icon={<RiDeleteBin5Line fontSize={21} fontWeight={600} />}
													tooltip='Xóa bỏ'
													color='#777E90'
													onClick={() => {
														setDataDeleteCustomer(data);
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
						total={listCustomer?.data?.pagination?.totalCount}
						pageSize={Number(_pageSize) || 200}
						dependencies={[_pageSize, _id]}
					/>
				</div>
			</div>
			<Dialog
				danger
				open={openChangeStatus}
				onClose={() => setOpenChangeStatus(false)}
				title={detailPartner?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa hoạt động' : 'Mở khóa hoạt động'}
				note={
					detailPartner?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa hoạt động khách hàng dịch vụ này?'
						: 'Bạn có chắc chắn muốn mở khóa hoạt động khách hàng dịch vụ này?'
				}
				onSubmit={funcChangeStatusPartner.mutate}
			/>

			<Dialog
				danger
				open={!!dataChangeStatusCustomer}
				onClose={() => setDataChangeStatusCustomer(null)}
				title={dataChangeStatusCustomer?.status == STATUS_CUSTOMER.HOP_TAC ? 'Khóa khách hàng' : 'Mở khóa khách hàng'}
				note={
					dataChangeStatusCustomer?.status == STATUS_CUSTOMER.HOP_TAC
						? 'Bạn có chắc chắn muốn khóa hoạt động khách hàng này?'
						: 'Bạn có chắc chắn muốn mở khóa hoạt động khách hàng này?'
				}
				onSubmit={funcChangeStatusCustomer.mutate}
			/>

			<Popup open={!!dataDeleteCustomer} onClose={() => setDataDeleteCustomer(null)}>
				<PopupDeleteCustomer onClose={() => setDataDeleteCustomer(null)} uuid={dataDeleteCustomer?.uuid!} />
			</Popup>
		</Fragment>
	);
}

export default DetailCustomerService;
