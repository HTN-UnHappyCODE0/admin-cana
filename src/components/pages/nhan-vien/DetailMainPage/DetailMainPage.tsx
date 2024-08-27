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
function DetailMainPage({}: PropsDetailMainPage) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_id, _page, _pageSize, _status} = router.query;
	const [openChangeStatus, setOpenChangeStatus] = useState<boolean>(false);

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
					pageSize: Number(_pageSize) || 20,
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

	const fucnChangeStatus = useMutation({
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
				<Loading loading={fucnChangeStatus.isLoading} />
				<div>
					<div className={styles.header}>
						<Link href={PATH.NhanVien} className={styles.header_title}>
							<IoArrowBackOutline fontSize={20} fontWeight={600} />
							<p>Chi tiết nhân viên: {detailUser?.fullName}</p>
						</Link>

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
									{detailUser?.provinceOwner?.name || '---'}
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
										render: (data: ICustomer) => <>{data?.description || '---'}</>,
									},
								]}
							/>
						</DataWrapper>
					</div>
					<Pagination
						currentPage={Number(_page) || 1}
						pageSize={Number(_pageSize) || 20}
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
				onSubmit={fucnChangeStatus.mutate}
			/>
		</div>
	);
}

export default DetailMainPage;
