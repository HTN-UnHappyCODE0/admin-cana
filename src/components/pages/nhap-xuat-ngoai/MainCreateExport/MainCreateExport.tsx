import React, {useState} from 'react';

import {IFormCreateExport, PropsMainCreateExport} from './interfaces';
import styles from './MainCreateExport.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import {useRouter} from 'next/router';
import {clsx} from 'clsx';
import Select, {Option} from '~/components/common/Select';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_CUSTOMER,
	TYPE_BATCH,
	TYPE_CUSTOMER,
	TYPE_PRODUCT,
	TYPE_SCALES,
	TYPE_SIFT,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import customerServices from '~/services/customerServices';
import wareServices from '~/services/wareServices';
import warehouseServices from '~/services/warehouseServices';
import storageServices from '~/services/storageServices';
import DatePicker from '~/components/common/DatePicker';
import TextArea from '~/components/common/Form/components/TextArea';
import batchBillServices from '~/services/batchBillServices';
import moment from 'moment';
import Loading from '~/components/common/Loading';
import {toastWarn} from '~/common/funcs/toast';
import {timeSubmit} from '~/common/funcs/optionConvert';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';
import uploadImageService from '~/services/uploadService';
import {price} from '~/common/funcs/convertCoin';
import {TimerStart} from 'iconsax-react';
import shipServices from '~/services/shipServices';

function MainCreateExport({}: PropsMainCreateExport) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [images, setImages] = useState<any[]>([]);
	const [form, setForm] = useState<IFormCreateExport>({
		toUuid: '',
		productTypeUuid: '',
		fromUuid: '',
		specificationsUuid: '',
		warehouseUuid: '',
		weight1: 0,
		weight2: 0,
		timeEnd: null,
		timeStart: null,
		description: '',
		transportType: TYPE_TRANSPORT.DUONG_THUY,
		documentId: '',
		shipUuid: '',
		portname: '',
		dryness: 0,
	});

	const listCustomer = useQuery([QUERY_KEY.dropdown_khach_hang_xuat], {
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
					typeCus: TYPE_CUSTOMER.KH_XUAT,
					provinceId: '',
					specUuid: '',
				}),
			}),
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

	const listProductType = useQuery([QUERY_KEY.dropdown_loai_go], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listProductType({
					page: 1,
					pageSize: 50,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					type: [TYPE_PRODUCT.CONG_TY, TYPE_PRODUCT.DUNG_CHUNG],
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listSpecification = useQuery([QUERY_KEY.dropdown_quy_cach], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listSpecification({
					page: 1,
					pageSize: 50,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: CONFIG_STATUS.HOAT_DONG,
					qualityUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
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
					typeFind: CONFIG_TYPE_FIND.FILTER,
					customerUuid: '',
					timeEnd: null,
					timeStart: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listStorage = useQuery([QUERY_KEY.dropdown_bai, form.warehouseUuid], {
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
					typeFind: CONFIG_TYPE_FIND.TABLE,
					specificationsUuid: '',
					warehouseUuid: form.warehouseUuid,
					productUuid: '',
					qualityUuid: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm((prev) => ({
					...prev,
					fromUuid: data?.[0]?.uuid || '',
					productTypeUuid: data?.[0]?.productUu?.uuid || '',
					specificationsUuid: data?.[0]?.specificationsUu?.uuid || '',
				}));
			}
		},
		select(data) {
			return data;
		},
		enabled: !!form.warehouseUuid,
	});

	const funcCreateBatchBillNoScale = useMutation({
		mutationFn: (body: {paths: string[]}) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới thành công!',
				http: batchBillServices.upsertBillNoScales({
					batchUuid: '',
					shipUuid: form.shipUuid,
					shipOutUuid: '',
					transportType: form?.transportType,
					timeIntend: null,
					weight1: price(form?.weight1),
					weight2: price(form?.weight2),
					customerName: '',
					billUuid: '',
					isBatch: TYPE_BATCH.KHONG_CAN,
					isCreateBatch: 1,
					isSift: TYPE_SIFT.KHONG_CAN_SANG,
					scalesType: TYPE_SCALES.CAN_XUAT,
					fromUuid: form?.fromUuid,
					toUuid: form?.toUuid,
					documentId: '',
					reason: '',
					description: form.description,
					isPrint: 0,
					specificationsUuid: form?.specificationsUuid,
					productTypeUuid: form.productTypeUuid,
					scaleStationUuid: '',
					storageTemporaryUuid: '',
					portname: form.portname,
					lstTruckPlateAdd: [],
					lstTruckPlateRemove: [],
					timeEnd: form?.timeEnd ? timeSubmit(new Date(form?.timeEnd!), true) : null,
					timeStart: form?.timeStart ? timeSubmit(new Date(form?.timeStart!)) : null,
					descriptionWs: '',
					paths: body.paths,
					dryness: Number(form.dryness),
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
		const imgs = images?.map((v: any) => v?.file);

		if (!form.toUuid) {
			return toastWarn({msg: 'Vui lòng chọn khách hàng xuất!'});
		}
		if (!form.warehouseUuid) {
			return toastWarn({msg: 'Vui lòng chọn kho!'});
		}
		if (!form.fromUuid) {
			return toastWarn({msg: 'Vui lòng chọn bãi!'});
		}
		if (!form.productTypeUuid) {
			return toastWarn({msg: 'Vui lòng chọn loại hàng!'});
		}
		if (!form.specificationsUuid) {
			return toastWarn({msg: 'Vui lòng chọn quy cách!'});
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
		if (form.dryness < 0 || form.dryness > 100) {
			return toastWarn({msg: 'Độ khô không hợp lệ!'});
		}
		if (imgs.length > 0) {
			const dataImage = await httpRequest({
				setLoading,
				isData: true,
				http: uploadImageService.uploadMutilImage(imgs),
			});
			if (dataImage?.error?.code == 0) {
				return funcCreateBatchBillNoScale.mutate({
					paths: dataImage.items,
				});
			} else {
				return toastWarn({msg: 'Upload ảnh thất bại!'});
			}
		} else {
			return funcCreateBatchBillNoScale.mutate({
				...form,
				paths: [],
			});
		}

		// return funcCreateBatchBillNoScale.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={loading || funcCreateBatchBillNoScale.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Tạo phiếu xuất</h4>
						<p>Điền đầy đủ các thông tin </p>
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

					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='toUuid'
							placeholder='Chọn khách hàng xuất'
							value={form?.toUuid}
							label={
								<span>
									Khách hàng xuất<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listCustomer?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											toUuid: v?.uuid,
											transportType: v?.transportType,
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Input
								name='documentId'
								value={form.documentId || ''}
								type='text'
								max={255}
								label={<span>Số chứng từ</span>}
								placeholder='Nhập số chứng từ'
							/>
						</div>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='shipUuid'
							placeholder='Chọn mã tàu'
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
							name='warehouseUuid'
							placeholder='Chọn kho hàng'
							value={form?.warehouseUuid}
							label={
								<span>
									Từ kho hàng<span style={{color: 'red'}}>*</span>
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
											fromUuid: '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='fromUuid'
								placeholder='Chọn bãi'
								value={form?.fromUuid}
								label={
									<span>
										Từ bãi<span style={{color: 'red'}}>*</span>
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
												fromUuid: v?.uuid,
												productTypeUuid: v?.productUu?.uuid,
												specificationsUuid: v?.specificationsUu?.uuid,
											}))
										}
									/>
								))}
							</Select>
						</div>
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
							{listProductType?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											productTypeUuid: v?.uuid,
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='specificationsUuid'
								placeholder='Chọn quy cách'
								value={form?.specificationsUuid}
								label={
									<span>
										Quy cách<span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listSpecification?.data?.map((v: any) => (
									<Option
										key={v?.uuid}
										value={v?.uuid}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												specificationsUuid: v?.uuid,
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

export default MainCreateExport;
