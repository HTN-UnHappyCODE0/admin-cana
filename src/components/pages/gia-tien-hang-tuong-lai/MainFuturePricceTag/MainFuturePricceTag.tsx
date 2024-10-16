import React, {useState} from 'react';

import {PropsMainFuturePricceTag} from './interfaces';
import styles from './MainFuturePricceTag.module.scss';
import Popup from '~/components/common/Popup';
import {useRouter} from 'next/router';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_BILL,
	TYPE_DATE,
	TYPE_PRODUCT,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Link from 'next/link';
import {convertCoin} from '~/common/funcs/convertCoin';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import Pagination from '~/components/common/Pagination';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import Moment from 'react-moment';
import priceTagServices from '~/services/priceTagServices';
import FormUpdateFuturePriceTag from '../FormUpdateFuturePriceTag';
import {Trash} from 'iconsax-react';
import Dialog from '~/components/common/Dialog';

function MainFuturePricceTag({}: PropsMainFuturePricceTag) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _specUuid, _productTypeUuid, _parentUserUuid, _userUuid, _state, _transportType, _status} =
		router.query;

	const [dataDelete, setDataDelete] = useState<any>(null);
	const [dataUpdate, setDataUpdate] = useState<any>(null);

	const listProductType = useQuery([QUERY_KEY.dropdown_loai_go], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listProductType({
					page: 1,
					pageSize: 100,
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					type: [TYPE_PRODUCT.CONG_TY, TYPE_PRODUCT.DUNG_CHUNG],
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listSpecifications = useQuery([QUERY_KEY.dropdown_quy_cach], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listSpecification({
					page: 1,
					pageSize: 100,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					qualityUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	// const funcChangeStatus = useMutation({
	// 	mutationFn: () => {
	// 		return httpRequest({
	// 			showMessageFailed: true,
	// 			showMessageSuccess: true,
	// 			msgSuccess: scalesStation?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa trạm cân thành công!' : 'Mở khóa trạm cân thành công!',
	// 			http: scalesStationServices.changeStatus({
	// 				uuid: _id as string,
	// 				status: scalesStation?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
	// 			}),
	// 		});
	// 	},
	// 	onSuccess(data) {
	// 		if (data) {
	// 			setOpenChangeStatus(false);
	// 			queryClient.invalidateQueries([QUERY_KEY.chi_tiet_tram_can, _id]);
	// 		}
	// 	},
	// });

	const listPriceTag = useQuery(
		[
			QUERY_KEY.table_gia_tien_hang,
			_page,
			_pageSize,
			_keyword,
			_parentUserUuid,
			_userUuid,
			_specUuid,
			_productTypeUuid,
			_state,
			_transportType,
			_status,
		],
		{
			queryFn: () =>
				httpRequest({
					isList: true,
					http: priceTagServices.listPriceTag({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 50,
						keyword: (_keyword as string) || '',
						isPaging: CONFIG_PAGING.IS_PAGING,
						isDescending: CONFIG_DESCENDING.NO_DESCENDING,
						typeFind: CONFIG_TYPE_FIND.TABLE,
						status: !!_status ? Number(_status) : null,
						customerUuid: '',
						specUuid: (_specUuid as string) || '',
						productTypeUuid: (_productTypeUuid as string) || '',
						priceTagUuid: '',
						state: !!_state ? Number(_state) : null,
						transportType: !!_transportType ? Number(_transportType) : null,
						userUuid: (_userUuid as string) || '',
						parentUserUuid: (_parentUserUuid as string) || '',
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
						<Search keyName='_keyword' placeholder='Tìm kiếm theo nhà cung cấp' />
					</div>

					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Loại hàng'
							query='_productTypeUuid'
							listFilter={listProductType?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>

					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Quy cách'
							query='_specUuid'
							listFilter={listSpecifications?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Vận chuyển'
							query='_transportType'
							listFilter={[
								{
									id: TYPE_TRANSPORT.DUONG_BO,
									name: 'Đường bộ',
								},
								{
									id: TYPE_TRANSPORT.DUONG_THUY,
									name: 'Đường thủy',
								},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<DateRangerCustom titleTime='Thời gian' typeDateDefault={TYPE_DATE.TODAY} />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_status'
							listFilter={[
								{
									id: CONFIG_STATUS.HOAT_DONG,
									name: 'Chưa áp dụng',
								},
								{
									id: CONFIG_STATUS.BI_KHOA,
									name: 'Đang áp dụng',
								},
								{
									id: CONFIG_STATUS.HOAT_DONG,
									name: 'Đã hủy',
								},
								{
									id: CONFIG_STATUS.BI_KHOA,
									name: 'Đã kết thúc',
								},
							]}
						/>
					</div>
				</div>
				<div>
					<Button p_8_16 rounded_2 href={PATH.ThemGiaTien} icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}>
						Thêm giá tiền
					</Button>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={listPriceTag?.data?.items || []}
					loading={listPriceTag?.isLoading}
					noti={<Noti titleButton='Thêm mới' onClick={() => router.push('')} des='Hiện tại chưa có giá tiền nào, thêm ngay?' />}
				>
					<Table
						data={listPriceTag?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Nhà cung cấp',
								fixedLeft: true,
								render: (data: any) => (
									<Link href={`/xuong/${data?.customerUu?.uuid}`} className={styles.link}>
										{data?.customerUu?.name || '---'}
									</Link>
								),
							},

							{
								title: 'Loại hàng',
								render: (data: any) => <>{data?.productTypeUu?.name || '---'}</>,
							},
							{
								title: 'Vận chuyển',
								render: (data: any) => (
									<>
										{data?.transportType == TYPE_TRANSPORT.DUONG_BO && 'Đường bộ'}
										{data?.transportType == TYPE_TRANSPORT.DUONG_THUY && 'Đường thủy'}
									</>
								),
							},
							{
								title: 'Giá tiền (VND)',
								render: (data: any) => <>{convertCoin(data?.pricetagUu?.amount) || 0} </>,
							},
							// {
							// 	title: 'Công ty',
							// 	render: (data: any) => (
							// 		<Link href={`/nha-cung-cap/${data?.partnerUu?.uuid}`} className={styles.link}>
							// 			{data?.partnerUu?.name || '---'}
							// 		</Link>
							// 	),
							// },
							{
								title: 'Quy cách',
								render: (data: any) => <>{data?.specUu?.name || '---'}</>,
							},

							{
								title: 'Ngày áp dụng',
								render: (data: any) => (data.created ? <Moment date={data.created} format='HH:mm, DD/MM/YYYY' /> : '---'),
							},
							{
								title: 'Ngày kết thúc',
								render: (data: any) => (data.created ? <Moment date={data.created} format='HH:mm, DD/MM/YYYY' /> : '---'),
							},
							{
								title: 'Trạng thái',
								render: (data: any) => (
									<>
										{data?.status == STATUS_BILL.DANG_CAN && <span style={{color: '#9757D7'}}>Chưa áp dụng</span>}
										{data?.status == STATUS_BILL.DA_CAN_CHUA_KCS && <span style={{color: '#D94212'}}>Đã hủy</span>}
										{data?.status == STATUS_BILL.DA_KCS && <span style={{color: '#3772FF'}}>Đã kết thúc</span>}
										{data?.status == STATUS_BILL.CHOT_KE_TOAN && <span style={{color: '#2CAE39'}}>Đang áp dụng</span>}
									</>
								),
							},
							{
								title: 'Tác vụ',
								fixedRight: true,
								render: (data: any) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											delete
											icon={<Trash fontSize={20} fontWeight={600} />}
											tooltip='Xóa cầu cân'
											color='#777E90'
											onClick={() => setDataDelete(data)}
										/>
										<IconCustom
											icon={<LuPencil size='22' />}
											tooltip='Chỉnh sửa'
											color='#777E90'
											onClick={() => setDataUpdate(data)}
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					total={listPriceTag?.data?.pagination?.totalCount}
					pageSize={Number(_pageSize) || 50}
					dependencies={[_pageSize, _keyword, _specUuid, _productTypeUuid, _transportType, _status]}
				/>
			</div>

			{/* <Dialog
				danger
				open={!!dataDelete}
				onClose={() => setDataDelete(null)}
				title={'Xóa cầu cân'}
				note={'Bạn có chắc chắn muốn xóa giá hàng này không??'}
				onSubmit={funcDeleteScalesStation.mutate}
			/> */}

			{/* Popup */}
			<Popup open={!!dataUpdate} onClose={() => setDataUpdate(null)}>
				<FormUpdateFuturePriceTag dataUpdate={dataUpdate} onClose={() => setDataUpdate(null)} />
			</Popup>
		</div>
	);
}

export default MainFuturePricceTag;
