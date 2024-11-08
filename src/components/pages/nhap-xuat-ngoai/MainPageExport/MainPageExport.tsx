import React from 'react';

import {PropsMainPageExport} from './interfaces';
import styles from './MainPageExport.module.scss';
import DataWrapper from '~/components/common/DataWrapper';
import Pagination from '~/components/common/Pagination';
import {Eye} from 'iconsax-react';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import Moment from 'react-moment';
import {convertWeight} from '~/common/funcs/optionConvert';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATE_BILL,
	STATUS_BILL,
	TYPE_BATCH,
	TYPE_DATE,
	TYPE_SCALES,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import Link from 'next/link';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Button from '~/components/common/Button';
import Image from 'next/image';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import Search from '~/components/common/Search';
import {useRouter} from 'next/router';
import icons from '~/constants/images/icons';
import batchBillServices from '~/services/batchBillServices';
import {httpRequest} from '~/services';
import {useQuery} from '@tanstack/react-query';

function MainPageExport({}: PropsMainPageExport) {
	const router = useRouter();

	const {
		_page,
		_pageSize,
		_keyword,
		_dateFrom,
		_dateTo,
		_isBatch,
		_state,
		_status,
		_customerUuid,
		_productTypeUuid,
		_shipUuid,
		_storageUuid,
		_scalesStationUuid,
	} = router.query;

	const ListBill = useQuery(
		[
			QUERY_KEY.table_phieu_can_tat_ca,
			_page,
			_pageSize,
			_keyword,
			_isBatch,
			_customerUuid,
			_productTypeUuid,
			_shipUuid,
			_status,
			_dateFrom,
			_dateTo,
			_state,
			_storageUuid,
			_scalesStationUuid,
		],
		{
			queryFn: () =>
				httpRequest({
					isList: true,
					http: batchBillServices.getListBill({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 50,
						keyword: (_keyword as string) || '',
						isPaging: CONFIG_PAGING.IS_PAGING,
						isDescending: CONFIG_DESCENDING.NO_DESCENDING,
						typeFind: CONFIG_TYPE_FIND.TABLE,
						scalesType: [TYPE_SCALES.CAN_XUAT],
						state: !!_state
							? [Number(_state)]
							: [
									STATE_BILL.NOT_CHECK,
									STATE_BILL.QLK_REJECTED,
									STATE_BILL.QLK_CHECKED,
									STATE_BILL.KTK_REJECTED,
									STATE_BILL.KTK_CHECKED,
									STATE_BILL.END,
							  ],
						customerUuid: (_customerUuid as string) || '',
						isBatch: TYPE_BATCH.KHONG_CAN,
						isCreateBatch: null,
						productTypeUuid: (_productTypeUuid as string) || '',
						specificationsUuid: '',
						status: !!_status
							? [Number(_status)]
							: [
									STATUS_BILL.DANG_CAN,
									STATUS_BILL.TAM_DUNG,
									STATUS_BILL.DA_CAN_CHUA_KCS,
									STATUS_BILL.DA_KCS,
									STATUS_BILL.CHOT_KE_TOAN,
							  ],
						timeStart: _dateFrom ? (_dateFrom as string) : null,
						timeEnd: _dateTo ? (_dateTo as string) : null,
						warehouseUuid: '',
						qualityUuid: '',
						transportType: null,
						shipUuid: (_shipUuid as string) || '',
						typeCheckDay: 0,
						scalesStationUuid: (_scalesStationUuid as string) || '',
						storageUuid: (_storageUuid as string) || '',
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	const handleExportExcel = () => {
		// return exportExcel.mutate();
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo số phiếu và mã lô hàng' />
					</div>

					<div className={styles.filter}>
						<DateRangerCustom titleTime='Thời gian' typeDateDefault={TYPE_DATE.TODAY} />
					</div>
				</div>

				<div className={styles.btn}>
					<Button rounded_2 w_fit p_8_16 green bold onClick={handleExportExcel}>
						Xuất excel
					</Button>
					<div>
						<Button
							rounded_2
							w_fit
							p_8_16
							bold
							href={'/nhap-xuat-ngoai/them-moi-xuat'}
							icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						>
							Tạo phiếu
						</Button>
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					loading={ListBill?.isLoading}
					data={ListBill?.data?.items || []}
					noti={<Noti des='Hiện tại chưa có dữ liệu nào!' disableButton />}
				>
					<Table
						data={ListBill?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Mã lô',
								fixedLeft: true,
								render: (data: any) => (
									<Link href={`/phieu-can/${data.uuid}`} className={styles.link}>
										{data?.code}
									</Link>
								),
							},
							{
								title: 'Loại cân',
								render: (data: any) => (
									<p style={{fontWeight: 600}}>
										{data?.scalesType == TYPE_SCALES.CAN_NHAP && 'Cân nhập'}
										{data?.scalesType == TYPE_SCALES.CAN_XUAT && 'Cân xuất'}
										{data?.scalesType == TYPE_SCALES.CAN_DICH_VU && 'Cân dịch vụ'}
										{data?.scalesType == TYPE_SCALES.CAN_CHUYEN_KHO && 'Cân chuyển kho'}
										{data?.scalesType == TYPE_SCALES.CAN_TRUC_TIEP && 'Cân xuất thẳng'}
									</p>
								),
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
								title: 'Từ (tàu/xe)',
								render: (data: any) => (
									<>
										<p style={{marginBottom: 4, fontWeight: 600}}>{data?.fromUu?.name || data?.customerName}</p>
										{/* {data?.isBatch == TYPE_BATCH.CAN_LO && (
											<p style={{fontWeight: 600, color: '#3772FF'}}>
												{data?.batchsUu?.shipUu?.licensePalate || '---'}
											</p>
										)}
										{data?.isBatch == TYPE_BATCH.CAN_LE && (
											<p style={{fontWeight: 600, color: '#3772FF'}}>
												{data?.weightSessionUu?.truckUu?.licensePalate || '---'}
											</p>
										)} */}
									</>
								),
							},

							{
								title: 'Quy cách',
								render: (data: any) => <>{data?.specificationsUu?.name || '---'}</>,
							},
							{
								title: 'KL 1 (Tấn)',
								render: (data: any) => <>{convertWeight(data?.weigth1)}</>,
							},
							{
								title: 'KL 2 (Tấn)',
								render: (data: any) => <>{convertWeight(data?.weigth2)}</>,
							},
							{
								title: 'KL tươi (Tấn)',
								render: (data: any) => <>{convertWeight(data?.weightTotal) || 0}</>,
							},
							{
								title: 'Đến',
								render: (data: any) => (
									<>
										<p style={{marginBottom: 4, fontWeight: 600}}>{data?.toUu?.name || '---'}</p>
										{/* <p style={{fontWeight: 600, color: '#3772FF'}}>
											{data?.batchsUu?.shipOutUu?.licensePalate || '---'}
										</p> */}
									</>
								),
							},
							{
								title: 'Ngày bắt đầu',
								render: (data: any) => (
									<>{data?.timeStart ? <Moment date={data?.timeStart} format='DD/MM/YYYY' /> : '---'}</>
								),
							},
							{
								title: 'Ngày kết thúc',
								render: (data: any) => <>{data?.timeEnd ? <Moment date={data?.timeEnd} format='DD/MM/YYYY' /> : '---'}</>,
							},

							{
								title: 'Tác vụ',
								fixedRight: true,
								render: (data: any) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											lock
											icon={<LuPencil size='22' />}
											tooltip={'Chỉnh sửa xuất'}
											color='#777E90'
											href={`/lenh-can/chinh-sua-xuat?_uuid=${data.uuid}`}
										/>

										<IconCustom
											edit
											icon={<Eye size={22} fontWeight={600} />}
											tooltip='Xem chi tiết'
											color='#777E90'
											href={`/nhap-xuat-ngoai/${data.uuid}`}
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>

				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 50}
					total={ListBill?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _dateFrom, _dateTo, _isBatch]}
				/>
			</div>
		</div>
	);
}

export default MainPageExport;
