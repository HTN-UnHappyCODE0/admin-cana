import React, {useState} from 'react';

import {IFormUpdateImport, PropsMainUpdateImport} from './interfaces';
import styles from './MainUpdateImport.module.scss';
import TextArea from '~/components/common/Form/components/TextArea';
import Form, {FormContext, Input} from '~/components/common/Form';
import Select, {Option} from '~/components/common/Select';
import Button from '~/components/common/Button';
import Loading from '~/components/common/Loading';
import {clsx} from 'clsx';
import {useRouter} from 'next/router';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_CUSTOMER,
	TYPE_BATCH,
	TYPE_CUSTOMER,
	TYPE_SCALES,
	TYPE_SIFT,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import customerServices from '~/services/customerServices';
import {httpRequest} from '~/services';
import {useMutation, useQuery} from '@tanstack/react-query';
import {IDetailCustomer} from '../../lenh-can/MainCreateImport/interfaces';
import storageServices from '~/services/storageServices';
import warehouseServices from '~/services/warehouseServices';
import DatePicker from '~/components/common/DatePicker';
import batchBillServices from '~/services/batchBillServices';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import moment from 'moment';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';
import {toastWarn} from '~/common/funcs/toast';
import uploadImageService from '~/services/uploadService';
import {timeSubmit} from '~/common/funcs/optionConvert';
import {IDetailBatchBill} from '../../lenh-can/MainDetailBill/interfaces';
import shipServices from '~/services/shipServices';

function MainUpdateImport({}: PropsMainUpdateImport) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [images, setImages] = useState<any[]>([]);

	const {_id} = router.query;

	const [form, setForm] = useState<IFormUpdateImport>({
		weight1: 0,
		weight2: 0,
		specificationsUuid: '',
		warehouseUuid: '',
		productTypeUuid: '',
		description: '',
		documentId: '',
		fromUuid: '',
		toUuid: '',
		transportType: TYPE_TRANSPORT.DUONG_THUY,
		timeStart: null,
		timeEnd: null,
		batchUuid: '',
		billUuid: '',
		portname: '',
		shipUuid: '',
		code: '',
		dryness: 0,
	});

	const {data: detailBatchBill} = useQuery<IDetailBatchBill>([QUERY_KEY.chi_tiet_lenh_can, _id], {
		queryFn: () =>
			httpRequest({
				http: batchBillServices.detailBatchbill({
					uuid: _id as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					transportType: data?.transportType,
					weight1: convertCoin(data?.batchsUu?.weight1),
					weight2: convertCoin(data?.batchsUu?.weight2),
					specificationsUuid: data?.specificationsUu?.uuid,
					warehouseUuid: data?.toUu?.parentUu?.uuid || '',
					productTypeUuid: data?.productTypeUu?.uuid,
					documentId: data?.documentId || '',
					description: data?.description,
					fromUuid: data?.fromUu?.uuid,
					toUuid: data?.toUu?.uuid,
					timeStart: moment(data.timeStart).format('yyyy-MM-DD'),
					timeEnd: moment(data.timeEnd).format('yyyy-MM-DD'),
					batchUuid: data?.batchsUu?.uuid,
					billUuid: data?.uuid,
					portname: data?.port,
					shipUuid: data?.batchsUu?.shipUu?.uuid || '',
					code: data?.code,
					dryness: data?.drynessAvg || 0,
				});
				setImages(
					data?.path?.map((v: any) => ({
						file: null,
						img: v,
						path: `${process.env.NEXT_PUBLIC_IMAGE}/${v}`,
					})) || []
				);
			}
		},
		enabled: !!_id,
	});

	const listCustomer = useQuery([QUERY_KEY.dropdown_khach_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: customerServices.listCustomer({
					page: 1,
					pageSize: 50,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					partnerUUid: '',
					userUuid: '',
					status: STATUS_CUSTOMER.HOP_TAC,
					typeCus: TYPE_CUSTOMER.NHA_CUNG_CAP,
					provinceId: '',
					specUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: detailCustomer} = useQuery<IDetailCustomer>([QUERY_KEY.chi_tiet_khach_hang, form.fromUuid], {
		queryFn: () =>
			httpRequest({
				http: customerServices.getDetail({
					uuid: form.fromUuid,
				}),
			}),
		onSuccess(data) {
			if (data && !form.productTypeUuid && !form.specificationsUuid) {
				const listspecUu: any[] = [...new Map(data?.customerSpec?.map((v: any) => [v?.specUu?.uuid, v])).values()];
				const listProductTypeUu: any[] = [...new Map(data?.customerSpec?.map((v: any) => [v?.productTypeUu?.uuid, v])).values()];

				setForm((prev) => ({
					...prev,
					specificationsUuid: listspecUu?.[0]?.specUu?.uuid || '',
					productTypeUuid: listProductTypeUu?.[0]?.productTypeUu?.uuid || '',
				}));
			}
		},
		select(data) {
			return data;
		},
		enabled: !!form.fromUuid,
	});

	const listWarehouse = useQuery([QUERY_KEY.dropdown_kho_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: warehouseServices.listWarehouse({
					page: 1,
					pageSize: 50,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					customerUuid: '',
					timeEnd: null,
					timeStart: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listShip = useQuery([QUERY_KEY.dropdown_tau_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: shipServices.listShip({
					page: 1,
					pageSize: 50,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listStorage = useQuery([QUERY_KEY.dropdown_bai, form.specificationsUuid, form.productTypeUuid, form.warehouseUuid], {
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
					qualityUuid: '',
					specificationsUuid: form.specificationsUuid,
					warehouseUuid: form.warehouseUuid,
					productUuid: form.productTypeUuid,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm((prev) => ({
					...prev,
					toUuid: data?.[0]?.uuid || '',
				}));
			}
		},
		select(data) {
			return data;
		},
		enabled: !!form.warehouseUuid && !!form.productTypeUuid && !!form.specificationsUuid,
	});

	const funcUpdateBill = useMutation({
		mutationFn: (body: {paths: string[]}) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa thành công!',
				http: batchBillServices.upsertBillNoScales({
					batchUuid: form?.batchUuid,
					billUuid: form.billUuid,
					shipOutUuid: '',
					customerName: '',
					isCreateBatch: 1,
					shipUuid: form.shipUuid,
					timeIntend: null,
					weight1: price(form?.weight1),
					weight2: price(form?.weight2),
					isBatch: TYPE_BATCH.KHONG_CAN,
					isSift: TYPE_SIFT.KHONG_CAN_SANG,
					scalesType: TYPE_SCALES.CAN_NHAP,
					specificationsUuid: form.specificationsUuid,
					productTypeUuid: form.productTypeUuid,
					documentId: form.documentId,
					description: form.description,
					fromUuid: form.fromUuid,
					toUuid: form?.toUuid,
					isPrint: 0,
					transportType: form?.transportType,
					lstTruckPlateAdd: [],
					lstTruckPlateRemove: [],
					scaleStationUuid: '',
					portname: form.portname,
					descriptionWs: '',
					paths: body.paths,
					timeEnd: form?.timeEnd ? timeSubmit(new Date(form?.timeEnd!), true) : null,
					timeStart: form?.timeStart ? timeSubmit(new Date(form?.timeStart!)) : null,
					dryness: Number(form.dryness || 0),
				}),
			}),
		onSuccess(data) {
			if (data) {
				router.back();
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		const today = new Date(timeSubmit(new Date())!);
		const timeStart = new Date(form.timeStart!);
		const timeEnd = new Date(form.timeEnd!);
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);

		if (form.transportType == TYPE_TRANSPORT.DUONG_THUY && !form.shipUuid) {
			return toastWarn({msg: 'Vui lòng chọn tàu!'});
		}
		if (!form.fromUuid) {
			return toastWarn({msg: 'Vui lòng chọn nhà cũng cấp!'});
		}
		if (!form.productTypeUuid) {
			return toastWarn({msg: 'Vui lòng chọn loại hàng!'});
		}
		if (!form.specificationsUuid) {
			return toastWarn({msg: 'Vui lòng chọn quy cách!'});
		}
		if (!form.warehouseUuid) {
			return toastWarn({msg: 'Vui lòng chọn kho chính!'});
		}
		if (!form.toUuid) {
			return toastWarn({msg: 'Vui lòng chọn bãi!'});
		}
		if (form.dryness < 0 || form.dryness > 100) {
			return toastWarn({msg: 'Độ khô không hợp lệ!'});
		}
		if (Math.abs(Number(form.weight1) - Number(form.weight2)) < 0.01) {
			return toastWarn({msg: 'Khối lượng cân lần 1 và lần 2 chưa đúng!'});
		}
		if (tomorrow < timeStart) {
			return toastWarn({msg: 'Ngày bắt đầu không hợp lệ!'});
		}

		if (tomorrow < timeEnd) {
			return toastWarn({msg: 'Ngày kết thúc không hợp lệ!'});
		}

		if (timeStart > timeEnd) {
			return toastWarn({msg: 'Ngày kết thúc phải lớn hơn ngày bắt đầu!'});
		}
		const currentImage = images.filter((item) => !!item.img).map((v) => v.img);

		const files = images?.filter((x: any) => !!x.file)?.map((v: any) => v?.file);

		if (files.length > 0) {
			const dataImage = await httpRequest({
				setLoading,
				isData: true,
				http: uploadImageService.uploadMutilImage(files),
			});
			if (dataImage?.error?.code == 0) {
				return funcUpdateBill.mutate({
					paths: [...currentImage, ...dataImage.items],
				});
			} else {
				return toastWarn({msg: 'Upload ảnh thất bại!'});
			}
		} else {
			return funcUpdateBill.mutate({
				paths: currentImage,
			});
		}
	};

	return (
		<div className={styles.container}>
			<Loading loading={loading || funcUpdateBill.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Chỉnh sửa phiếu nhập hàng #{form.code}</h4>
						<p>Điền đầy đủ các thông tin phiếu nhập hàng</p>
					</div>
					<div className={styles.right}>
						<Button p_10_24 rounded_2 grey_outline onClick={() => router.back()}>
							Hủy bỏ
						</Button>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_10_24 rounded_2 primary>
									Lưu lại
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</div>
				<div className={styles.form}>
					<div className={clsx('mt', 'col_2')}>
						<div className='col_2'>
							<div className={styles.item}>
								<label className={styles.label}>
									Hình thức vận chuyển <span style={{color: 'red'}}>*</span>
								</label>
								<div className={styles.group_radio}>
									<div className={styles.item_radio}>
										<input
											type='radio'
											id='van_chuyen_bo'
											name='transportType'
											checked={form.transportType == TYPE_TRANSPORT.DUONG_BO}
											onChange={() =>
												setForm((prev) => ({
													...prev,
													transportType: TYPE_TRANSPORT.DUONG_BO,
													shipUuid: '',
												}))
											}
										/>
										<label htmlFor='van_chuyen_bo'>Đường bộ</label>
									</div>
									<div className={styles.item_radio}>
										<input
											type='radio'
											id='van_chuyen_thủy'
											name='transportType'
											checked={form.transportType == TYPE_TRANSPORT.DUONG_THUY}
											onChange={() =>
												setForm((prev) => ({
													...prev,
													transportType: TYPE_TRANSPORT.DUONG_THUY,
												}))
											}
										/>
										<label htmlFor='van_chuyen_thủy'>Đường thủy</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='fromUuid'
							placeholder='Chọn nhà cung cấp'
							value={form?.fromUuid}
							label={
								<span>
									Nhà cung cấp <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listCustomer?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev) => ({
											...prev,
											fromUuid: v?.uuid,
											transportType: v?.transportType,
											isSift: v?.isSift,
											productTypeUuid: '',
											specificationsUuid: '',
											shipUuid: '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Input
								name='documentId'
								value={form.documentId || ''}
								max={255}
								type='text'
								label={<span>Số chứng từ</span>}
								placeholder='Nhập số chứng từ'
							/>
						</div>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='shipUuid'
							placeholder='Chọn tàu'
							value={form?.shipUuid}
							readOnly={form.transportType == TYPE_TRANSPORT.DUONG_BO}
							label={
								<span>
									Tàu <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listShip?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.licensePlate}
									onClick={() =>
										setForm((prev) => ({
											...prev,
											shipUuid: v?.uuid,
										}))
									}
								/>
							))}
						</Select>
						<Input
							name='portname'
							value={form.portname}
							type='text'
							label={<span>Cảng bốc dỡ</span>}
							placeholder='Nhập cảng bốc dỡ'
						/>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='productTypeUuid'
							placeholder='Chọn loại hàng'
							value={form?.productTypeUuid}
							label={
								<span>
									Loại hàng<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{[...new Map(detailCustomer?.customerSpec?.map((v: any) => [v?.productTypeUu?.uuid, v])).values()]?.map(
								(v: any) => (
									<Option
										key={v?.uuid}
										value={v?.productTypeUu?.uuid}
										title={v?.productTypeUu?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												productTypeUuid: v?.productTypeUu?.uuid,
												toUuid: '',
											}))
										}
									/>
								)
							)}
						</Select>
						<div>
							<Select
								isSearch
								name='specificationsUuid'
								placeholder='Chọn quy cách'
								value={form?.specificationsUuid}
								label={
									<span>
										Quy cách <span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{[...new Map(detailCustomer?.customerSpec?.map((v: any) => [v?.specUu?.uuid, v])).values()]?.map(
									(v: any) => (
										<Option
											key={v?.specUu?.uuid}
											value={v?.specUu?.uuid}
											title={v?.specUu?.name}
											onClick={() =>
												setForm((prev: any) => ({
													...prev,
													specificationsUuid: v?.specUu?.uuid,
													toUuid: '',
												}))
											}
										/>
									)
								)}
							</Select>
						</div>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='warehouseUuid'
							placeholder='Chọn kho hàng chính'
							value={form?.warehouseUuid}
							label={
								<span>
									Kho hàng chính <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listWarehouse?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											warehouseUuid: v?.uuid,
											toUuid: '',
											// scaleStationUuid: v?.scaleStationUu?.uuid || '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='toUuid'
								placeholder='Chọn bãi'
								value={form?.toUuid}
								readOnly={!form.warehouseUuid || !form.productTypeUuid || !form.specificationsUuid}
								label={
									<span>
										Bãi <span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listStorage?.data?.map((v: any) => (
									<Option
										key={v?.uuid}
										value={v?.uuid}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												toUuid: v?.uuid,
											}))
										}
									/>
								))}
							</Select>
						</div>
					</div>

					<div className={clsx('mt', 'col_3')}>
						<Input
							name='weight1'
							value={form.weight1 || ''}
							type='text'
							isMoney
							unit='KG'
							label={
								<span>
									KL cân lần 1 <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập kL cân lần 1'
						/>

						<div>
							<Input
								name='weight2'
								value={form.weight2 || ''}
								type='text'
								isMoney
								unit='KG'
								label={
									<span>
										KL cân lần 2 <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập kL cân lần 2'
							/>
						</div>
						<div>
							<Input
								name='dryness'
								value={form.dryness || ''}
								unit='%'
								type='number'
								blur={true}
								placeholder='Nhập độ khô'
								label={<span>Độ khô</span>}
							/>
						</div>
					</div>
					<div className={clsx('mt', 'col_2')}>
						{/* <DatePicker
							label={
								<span>
									Ngày bắt đầu <span style={{color: 'red'}}>*</span>
								</span>
							}
							value={form.timeStart}
							onSetValue={(date) =>
								setForm((prev: any) => ({
									...prev,
									timeStart: date,
								}))
							}
							placeholder='Chọn ngày bắt đầu'
						/> */}
						<Input
							type='date'
							name='timeStart'
							value={form.timeStart || ''}
							isRequired={true}
							blur={true}
							label={
								<span>
									Ngày bắt đầu <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Chọn ngày bắt đầu'
						/>
						<div>
							{/* <DatePicker
								label={
									<span>
										Ngày kết thúc <span style={{color: 'red'}}>*</span>
									</span>
								}
								value={form.timeEnd}
								onSetValue={(date) =>
									setForm((prev: any) => ({
										...prev,
										timeEnd: date,
									}))
								}
								placeholder='Chọn ngày kết thúc'
							/> */}
							<Input
								type='date'
								name='timeEnd'
								value={form.timeEnd || ''}
								isRequired={true}
								blur={true}
								label={
									<span>
										Ngày kết thúc <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Chọn ngày kết thúc'
							/>
						</div>
					</div>

					<div className={clsx('mt')}>
						<TextArea name='description' placeholder='Nhập ghi chú' max={5000} blur label={<span>Ghi chú</span>} />
					</div>
					<div className='mt'>
						<div className={styles.image_upload}>Chọn ảnh</div>
						<UploadMultipleFile images={images} setImages={setImages} />
					</div>
				</div>
			</Form>
		</div>
	);
}

export default MainUpdateImport;
