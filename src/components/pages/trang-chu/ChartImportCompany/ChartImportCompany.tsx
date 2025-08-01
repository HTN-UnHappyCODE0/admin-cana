import React, {useEffect, useState} from 'react';

import {PropsChartImportCompany} from './interfaces';
import styles from './ChartImportCompany.module.scss';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, Line} from 'recharts';

import SelectFilterDate from '../SelectFilterDate';
import {useQuery} from '@tanstack/react-query';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	REGENCY_NAME,
	STATUS_CUSTOMER,
	TYPE_CUSTOMER,
	TYPE_DATE,
	TYPE_DATE_SHOW,
	TYPE_PARTNER,
	TYPE_SHOW_BDMT,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import batchBillServices from '~/services/batchBillServices';
import moment from 'moment';
import {convertWeight, timeSubmit} from '~/common/funcs/optionConvert';
import customerServices from '~/services/customerServices';
import storageServices from '~/services/storageServices';
import regencyServices from '~/services/regencyServices';
import userServices from '~/services/userServices';
import router from 'next/router';
import companyServices from '~/services/companyServices';
import commonServices from '~/services/commonServices';
import {convertCoin} from '~/common/funcs/convertCoin';
import SelectFilterState from '~/components/common/SelectFilterState';
import partnerServices from '~/services/partnerServices';
import SelectFilterMany from '~/components/common/SelectFilterMany';

function ChartImportCompany({}: PropsChartImportCompany) {
	const [isShowBDMT, setIsShowBDMT] = useState<string>(String(TYPE_SHOW_BDMT.MT));
	const [isProductSpec, setIsProductSpec] = useState<string>('1');
	const [isTransport, setIsTransport] = useState<string>('');
	const [customerUuid, setCustomerUuid] = useState<string[]>([]);
	const [provinceUuid, setProvinceUuid] = useState<string[]>([]);
	const [userUuid, setUserUuid] = useState<string[]>([]);
	const [storageUuid, setStorageUuid] = useState<string>('');
	const [typeDate, setTypeDate] = useState<number | null>(TYPE_DATE.LAST_7_DAYS);
	const [uuidCompany, setUuidCompanyFilter] = useState<string[]>([]);
	const [date, setDate] = useState<{
		from: Date | null;
		to: Date | null;
	} | null>(null);

	const [dataChartMT, setDataChartMT] = useState<any[]>([]);
	const [dataChartBDMT, setDataChartBDMT] = useState<any[]>([]);
	const [userPartnerUuid, setUserPartnerUuid] = useState<string[]>([]);
	const [productTypes, setProductTypes] = useState<any[]>([]);
	const [dataTotal, setDataTotal] = useState<{
		totalWeight: number;
		totalWeightBDMT: number;
		weightBDMTAvg: number;
		weightMTAvg: number;
		drynessAvg: number;
		lstProductTotal: {
			name: string;
			colorShow: string;
			weightMT: number;
			weightBDMT: number;
			drynessAvg: number;
		}[];
	}>({
		totalWeightBDMT: 0,
		drynessAvg: 0,
		totalWeight: 0,
		weightMTAvg: 0,
		weightBDMTAvg: 0,
		lstProductTotal: [],
	});
	const [listPartnerUuid, setListPartnerUuid] = useState<any[]>([]);

	const listCustomer = useQuery([QUERY_KEY.dropdown_khach_hang_nhap, uuidCompany, listPartnerUuid, userUuid], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: customerServices.listCustomer({
					page: 1,
					pageSize: 50,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					partnerUUid: '',
					userUuid: '',
					status: STATUS_CUSTOMER.HOP_TAC,
					typeCus: TYPE_CUSTOMER.NHA_CUNG_CAP,
					provinceId: '',
					specUuid: '',
					listCompanyUuid: uuidCompany,
					listPartnerUUid: listPartnerUuid,
					listUserUuid: userUuid,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listStorage = useQuery([QUERY_KEY.dropdown_bai], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: storageServices.listStorage({
					page: 1,
					pageSize: 50,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					productUuid: '',
					qualityUuid: '',
					specificationsUuid: '',
					warehouseUuid: '',
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

	const listProvince = useQuery([QUERY_KEY.dropdown_tinh_thanh_pho], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listProvince({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listCompany = useQuery([QUERY_KEY.dropdown_cong_ty], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: companyServices.listCompany({
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

	const listUserPurchasing = useQuery([QUERY_KEY.dropdown_quan_ly_nhap_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: userServices.listUser2({
					page: 1,
					pageSize: 50,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					provinceIDOwer: '',
					regencyUuid: [listRegency?.data?.find((v: any) => v?.code == REGENCY_NAME['Quản lý nhập hàng'])?.uuid],
				}),
			}),
		select(data) {
			return data;
		},
		enabled: listRegency.isSuccess,
	});

	const listUserMarket = useQuery([QUERY_KEY.dropdown_nhan_vien_thi_truong], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: userServices.listUser2({
					page: 1,
					pageSize: 50,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					provinceIDOwer: '',
					regencyUuid: [listRegency?.data?.find((v: any) => v?.code == REGENCY_NAME['Nhân viên thị trường'])?.uuid],
					parentUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
		enabled: listRegency.isSuccess,
	});

	const listPartner = useQuery([QUERY_KEY.dropdown_nha_cung_cap, uuidCompany, userPartnerUuid], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: partnerServices.listPartner({
					pageSize: 50,
					page: 1,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					isPaging: CONFIG_PAGING.NO_PAGING,
					userUuid: '',
					provinceId: '',
					type: TYPE_PARTNER.NCC,
					listCompanyUuid: uuidCompany,
					listUserUuid: userPartnerUuid,
				}),
			}),
		select(data) {
			return data;
		},
	});

	useQuery(
		[
			QUERY_KEY.thong_ke_tong_hang_nhap,
			customerUuid,
			storageUuid,
			date,
			userUuid,
			uuidCompany,
			isProductSpec,
			provinceUuid,
			isTransport,
			userPartnerUuid,
			listPartnerUuid,
		],
		{
			queryFn: () =>
				httpRequest({
					isData: true,
					http: batchBillServices.dashbroadBillIn({
						partnerUuid: '',
						customerUuid: customerUuid,
						isShowBDMT: 1,
						storageUuid: storageUuid,
						userOwnerUuid: userUuid,
						userPartnerUuid: userPartnerUuid,
						warehouseUuid: '',
						companyUuid: '',
						typeFindDay: 0,
						timeStart: timeSubmit(date?.from)!,
						timeEnd: timeSubmit(date?.to, true)!,
						provinceId: provinceUuid,
						transportType: isTransport ? Number(isTransport) : null,
						listCompanyUuid: uuidCompany,
						listPartnerUuid: listPartnerUuid,
					}),
				}),
			onSuccess({data}) {
				// Convert data chart
				const dataConvertMT = data?.lstProductDay?.map((v: any) => {
					const date =
						data?.typeShow == TYPE_DATE_SHOW.HOUR
							? moment(v?.timeScale).format('HH:mm')
							: data?.typeShow == TYPE_DATE_SHOW.DAY
							? moment(v?.timeScale).format('DD/MM')
							: data?.typeShow == TYPE_DATE_SHOW.MONTH
							? moment(v?.timeScale).format('MM-YYYY')
							: moment(v?.timeScale).format('YYYY');

					const obj = v?.[isProductSpec === '2' ? 'specDateWeightUu' : 'productDateWeightUu']?.reduce((acc: any, item: any) => {
						acc[item.productTypeUu.name] = item.weightMT;
						acc[`${item.productTypeUu.name}_drynessAvg`] = item.drynessAvg || 50;
						acc[`${item.productTypeUu.name}_weightAvg`] = data?.weightMTAvg;
						return acc;
					}, {});

					const objTotal = {
						'Trung bình': data?.weightMTAvg || 0,
					};

					return {
						name: date,
						...objTotal,
						...obj,
					};
				});

				const dataConvertBDMT = data?.lstProductDay?.map((v: any) => {
					const date =
						data?.typeShow == TYPE_DATE_SHOW.HOUR
							? moment(v?.timeScale).format('HH:mm')
							: data?.typeShow == TYPE_DATE_SHOW.DAY
							? moment(v?.timeScale).format('DD/MM')
							: data?.typeShow == TYPE_DATE_SHOW.MONTH
							? moment(v?.timeScale).format('MM-YYYY')
							: moment(v?.timeScale).format('YYYY');

					const obj = v?.[isProductSpec === '2' ? 'specDateWeightUu' : 'productDateWeightUu']?.reduce((acc: any, item: any) => {
						acc[item.productTypeUu.name] = item.weightBDMT;
						acc[`${item.productTypeUu.name}_drynessAvg`] = item.drynessAvg || 50;
						acc[`${item.productTypeUu.name}_weightAvg`] = data?.weightBDMTAvg;
						return acc;
					}, {});

					const objTotal = {
						'Trung bình': data?.weightBDMTAvg || 0,
					};

					return {
						name: date,
						...objTotal,
						...obj,
					};
				});

				// Convert bar chart
				const productColors = data?.lstProductDay
					?.flatMap((item: any) =>
						item[isProductSpec === '2' ? 'specDateWeightUu' : 'productDateWeightUu'].map((product: any) => ({
							name: product.productTypeUu.name,
							color: product.productTypeUu.colorShow,
						}))
					)
					.reduce((acc: any, {name, color}: {name: string; color: string}) => {
						if (!acc[name]) {
							acc[name] = color;
						}
						return acc;
					}, {});

				const productTypes = [
					...Object.keys(productColors).map((key) => ({
						key,
						fill: productColors[key],
					})),
					{
						key: 'Trung bình',
						fill: '#FF8C00',
					},
				];

				setDataChartMT(dataConvertMT);
				setDataChartBDMT(dataConvertBDMT);
				setProductTypes(productTypes);

				setDataTotal({
					totalWeight: data?.totalWeight,
					totalWeightBDMT: data?.totalWeightBDMT,
					weightBDMTAvg: data?.weightBDMTAvg,
					weightMTAvg: data?.weightMTAvg,
					drynessAvg: data?.drynessAvg,
					lstProductTotal: (isProductSpec === '2' ? data?.lstSpecTotal : data?.lstProductTotal)?.map((v: any) => ({
						name: v?.productTypeUu?.name,
						colorShow: v?.productTypeUu?.colorShow,
						weightMT: v?.weightMT,
						weightBDMT: v?.weightBDMT,
						drynessAvg: v?.drynessAvg,
					})),
				});
			},
		}
	);

	useEffect(() => {
		if (uuidCompany) {
			setCustomerUuid([]);
		}
		if (listPartnerUuid) {
			setCustomerUuid([]);
		}
	}, [uuidCompany, listPartnerUuid]);

	useEffect(() => {
		if (uuidCompany) {
			setListPartnerUuid([]);
		}
	}, [uuidCompany]);

	useEffect(() => {
		if (userUuid) {
			setCustomerUuid([]);
		}
	}, [userUuid]);

	useEffect(() => {
		if (userPartnerUuid) {
			setListPartnerUuid([]);
		}
	}, [userPartnerUuid]);

	const currentData = isShowBDMT === String(TYPE_SHOW_BDMT.MT) ? dataChartMT : dataChartBDMT;

	const drynessValues = currentData.flatMap((item) => productTypes.map((v) => item[`${v.key}_drynessAvg`] || 50));
	const minDryness = Math.min(...drynessValues) - 1;
	const maxDryness = Math.max(...drynessValues) + 1;

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h3>Biểu đồ thống kê hàng nhập</h3>
				<div className={styles.filter}>
					<SelectFilterState
						isShowAll={false}
						uuid={isShowBDMT}
						setUuid={setIsShowBDMT}
						listData={[
							{
								uuid: String(TYPE_SHOW_BDMT.MT),
								name: 'Tấn tươi',
							},
							{
								uuid: String(TYPE_SHOW_BDMT.BDMT),
								name: 'Tấn khô',
							},
						]}
						placeholder='Tấn hàng'
					/>

					{/* <SelectFilterState
						uuid={uuidCompany}
						setUuid={setUuidCompanyFilter}
						listData={listCompany?.data?.map((v: any) => ({
							uuid: v?.uuid,
							name: v?.name,
						}))}
						placeholder='Tất cả kv cảng xuất khẩu'
					/> */}
					<SelectFilterMany
						selectedIds={uuidCompany}
						setSelectedIds={setUuidCompanyFilter}
						listData={listCompany?.data?.map((v: any) => ({
							uuid: v?.uuid,
							name: v?.name,
						}))}
						name='Kv cảng xuất khẩu'
					/>

					<SelectFilterMany
						selectedIds={userPartnerUuid}
						setSelectedIds={setUserPartnerUuid}
						listData={listUserPurchasing?.data?.map((v: any) => ({
							uuid: v?.uuid,
							name: v?.fullName,
						}))}
						name='Quản lý nhập hàng'
					/>
					<SelectFilterMany
						selectedIds={listPartnerUuid}
						setSelectedIds={setListPartnerUuid}
						listData={listPartner?.data?.map((v: any) => ({
							uuid: v?.uuid,
							name: v?.name,
						}))}
						name='Công ty'
					/>

					<SelectFilterMany
						selectedIds={userUuid}
						setSelectedIds={setUserUuid}
						listData={listUserMarket?.data?.map((v: any) => ({
							uuid: v?.uuid,
							name: v?.fullName,
						}))}
						name='Người quản lý nhân viên thị trường'
					/>

					<SelectFilterMany
						selectedIds={customerUuid}
						setSelectedIds={setCustomerUuid}
						listData={listCustomer?.data?.map((v: any) => ({
							uuid: v?.uuid,
							name: v?.name,
						}))}
						name='Nhà cung cấp'
					/>
					<SelectFilterState
						uuid={storageUuid}
						setUuid={setStorageUuid}
						listData={listStorage?.data?.map((v: any) => ({
							uuid: v?.uuid,
							name: v?.name,
						}))}
						placeholder='Bãi'
					/>
					<SelectFilterDate isOptionDateAll={false} date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />

					<SelectFilterState
						isShowAll={false}
						uuid={isProductSpec}
						setUuid={setIsProductSpec}
						listData={[
							{
								uuid: String(1),
								name: 'Loại hàng',
							},
							{
								uuid: String(2),
								name: 'Quy cách',
							},
						]}
						placeholder='Kiểu'
					/>
					<SelectFilterState
						// isShowAll={true}
						uuid={isTransport}
						setUuid={setIsTransport}
						listData={[
							{
								uuid: String(TYPE_TRANSPORT.DUONG_BO),
								name: 'Đường bộ',
							},
							{
								uuid: String(TYPE_TRANSPORT.DUONG_THUY),
								name: 'Đường thủy',
							},
						]}
						placeholder='Vận chuyển'
					/>
					<SelectFilterMany
						selectedIds={provinceUuid}
						setSelectedIds={setProvinceUuid}
						listData={listProvince?.data?.map((v: any) => ({
							uuid: v?.matp,
							name: v?.name,
						}))}
						name='Tỉnh thành'
					/>
				</div>
			</div>
			<div className={styles.head_data}>
				<p className={styles.data_total}>
					Tổng khối lượng nhập hàng:{' '}
					<span>
						{isShowBDMT === String(TYPE_SHOW_BDMT.MT)
							? convertWeight(dataTotal?.totalWeight)
							: convertWeight(dataTotal?.totalWeightBDMT)}
						<span> ({dataTotal?.drynessAvg?.toFixed(2)}%)</span>
					</span>
				</p>
				<p className={styles.data_total}>
					Khối lượng trung bình:{' '}
					<span>
						{isShowBDMT === String(TYPE_SHOW_BDMT.MT)
							? convertWeight(dataTotal?.weightMTAvg)
							: convertWeight(dataTotal?.weightBDMTAvg)}
						{/* <span> ({dataTotal?.drynessAvg?.toFixed(2)}%)</span> */}
					</span>
				</p>

				{dataTotal?.lstProductTotal?.map((v, i) => (
					<div key={i} className={styles.data_item}>
						<div style={{background: v?.colorShow}} className={styles.box_color}></div>
						<p className={styles.data_total}>
							{v?.name}:{' '}
							<span style={{color: '#171832'}}>
								{isShowBDMT === String(TYPE_SHOW_BDMT.MT) ? convertWeight(v?.weightMT) : convertWeight(v?.weightBDMT)}
								<span> ({v?.drynessAvg?.toFixed(2)}%)</span>
							</span>
						</p>
					</div>
				))}
			</div>
			<div className={styles.main_chart}>
				<ResponsiveContainer width='100%' height='100%'>
					<ComposedChart
						width={500}
						height={300}
						data={isShowBDMT === String(TYPE_SHOW_BDMT.MT) ? dataChartMT : dataChartBDMT}
						margin={{
							top: 8,
							right: 8,
							left: 24,
							bottom: 8,
						}}
						barSize={24}
					>
						<XAxis dataKey='name' scale='point' padding={{left: 40, right: 10}} />

						<YAxis domain={[0, 4000000]} tickFormatter={(value): any => convertWeight(value)} />

						{/* <YAxis yAxisId='right' domain={[minDryness, maxDryness]} orientation='right' tickFormatter={(v) => `${v}%`} /> */}

						<Tooltip
							formatter={(value, name, props): any => {
								const dryness = props?.payload?.[`${name}_drynessAvg`] ?? 0;
								return [`${convertWeight(Number(value))} (${dryness?.toFixed(2)}%)`, name];
							}}
						/>

						<CartesianGrid strokeDasharray='3 3' vertical={false} />

						{productTypes
							.filter((v) => v.key !== 'Trung bình')
							.map((v, i) => (
								<Bar key={i} dataKey={v?.key} stackId='product_type' fill={v?.fill} />
							))}

						{productTypes
							.filter((v) => v.key === 'Trung bình')
							.map((v, i) => (
								<Line key={`line-${i}`} dataKey='Trung bình' stroke={v?.fill} fill={v?.fill} />
							))}

						{/* {productTypes.map((v, i) => (
							<Line
								key={`line-${i}`}
								tooltipType='none'
								dataKey={`Trung bình`}
								stroke={v?.fill}
								fill={v?.fill}
								// yAxisId='right'
							/>
						))} */}
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ChartImportCompany;
