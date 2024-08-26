import React, {useState} from 'react';
import {PropsCreatePriceTag} from './interfaces';
import styles from './CreatePriceTag.module.scss';
import Button from '~/components/common/Button';
import Form from '~/components/common/Form';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import Select, {Option} from '~/components/common/Select';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';
import {
	CONFIG_DESCENDING,
	CONFIG_STATUS,
	CONFIG_PAGING,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_CUSTOMER,
	CONFIG_STATE_SPEC_CUSTOMER,
	TYPE_TRANSPORT,
	TYPE_PRODUCT,
	TYPE_CUSTOMER,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import {useMutation, useQuery} from '@tanstack/react-query';
import customerServices from '~/services/customerServices';
import Loading from '~/components/common/Loading';
import wareServices from '~/services/wareServices';
import SelectSearch from '~/components/common/SelectSearch';
import priceTagServices from '~/services/priceTagServices';
import {toastWarn} from '~/common/funcs/toast';
import DialogWarning from '~/components/common/DialogWarning';

function CreatePriceTag({}: PropsCreatePriceTag) {
	const router = useRouter();

	const [listCustomerChecked, setListCustomerChecked] = useState<any[]>([]);
	const [priceTag, setPriceTag] = useState<any>({});
	const [openWarning, setOpenWarning] = useState<boolean>(false);

	const [form, setForm] = useState<{
		specUuid: string;
		transportType: number;
		productTypeUuid: string;
	}>({
		specUuid: '',
		productTypeUuid: '',
		transportType: TYPE_TRANSPORT.DUONG_THUY,
	});

	const listCustomer = useQuery([QUERY_KEY.dropdown_khach_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: customerServices.listCustomer({
					page: 1,
					pageSize: 20,
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

	const listPriceTag = useQuery([QUERY_KEY.dropdown_gia_tien_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: priceTagServices.listPriceTagDropDown({
					page: 1,
					pageSize: 10,
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

	const handleCheckAll = (e: any) => {
		const {checked} = e?.target;

		if (checked) {
			setListCustomerChecked(listCustomer.data);
		} else {
			setListCustomerChecked([]);
		}
	};

	const fucnAddSpecification = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới giá tiền hàng thành công!',
				http: priceTagServices.addPricetagToCustomer({
					infoSpec: [
						{
							specUuid: form.specUuid,
							status: CONFIG_STATUS.HOAT_DONG,
							state: CONFIG_STATE_SPEC_CUSTOMER.DANG_CUNG_CAP,
							productTypeUuid: form.productTypeUuid,
							transportType: form.transportType,
							priceTagUuid: priceTag.id === '' ? String(priceTag.name) : priceTag.id,
						},
					],
					customerUuid: listCustomerChecked.map((value) => value.uuid),
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
		if (!form.specUuid) {
			return toastWarn({msg: 'Vui lòng chọn loại quy cách!'});
		}
		if (!form.productTypeUuid) {
			return toastWarn({msg: 'Vui lòng chọn loại gỗ!'});
		}
		if (priceTag.name === undefined || priceTag.name === '') {
			return toastWarn({msg: 'Vui lòng chọn giá tiền áp dụng!'});
		}
		if (listCustomerChecked.length === 0) {
			return toastWarn({msg: 'Vui lòng chọn xưởng!'});
		}

		return setOpenWarning(true);
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnAddSpecification.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Thêm giá tiền</h4>
						<p>Điền đầy đủ các thông tin</p>
					</div>
					<div className={styles.right}>
						<Button onClick={() => router.back()} p_10_24 rounded_2 grey_outline>
							Hủy bỏ
						</Button>
						<Button p_10_24 rounded_2 primary onClick={handleSubmit}>
							Lưu lại
						</Button>
					</div>
				</div>
				<div className={styles.form}>
					<div className={clsx('mt', 'col_3')}>
						<div>
							<Select
								isSearch
								name='productTypeUuid'
								value={form.productTypeUuid}
								placeholder='Lựa chọn loại gỗ'
								onChange={(e: any) =>
									setForm((prev: any) => ({
										...prev,
										productTypeUuid: e.target.value,
									}))
								}
								label={
									<span>
										Loại gỗ <span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listProductType?.data?.map((value: any) => (
									<Option key={value.uuid} title={value.name} value={value.uuid} />
								))}
							</Select>
						</div>
						<Select
							isSearch
							name='specUuid'
							placeholder='Lựa chọn quy cách'
							value={form.specUuid}
							onChange={(e: any) =>
								setForm((prev: any) => ({
									...prev,
									specUuid: e.target.value,
								}))
							}
							label={
								<span>
									Quy cách <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listSpecifications?.data?.map((value: any) => (
								<Option key={value.uuid} title={value?.name} value={value?.uuid} />
							))}
						</Select>

						<div className={styles.item}>
							<label className={styles.label}>
								Hình thức vận chuyển <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.group_radio}>
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
											}))
										}
									/>
									<label htmlFor='van_chuyen_bo'>Đường bộ</label>
								</div>
							</div>
						</div>
					</div>
					<div className={'mt'}>
						<SelectSearch
							isConvertNumber={true}
							options={listPriceTag?.data?.map((v: any) => ({
								id: v?.uuid,
								name: String(v?.amount),
							}))}
							data={priceTag}
							setData={setPriceTag}
							label={
								<span>
									Giá tiền áp dụng <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập giá tiền'
						/>
					</div>
					<div className={clsx('mt', styles.group)}>
						<div className={styles.btn}>
							<ButtonSelectMany
								showOverlay={false}
								label={
									<span>
										Xưởng áp dụng <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Chọn xưởng'
								title='Thêm xưởng'
								description='Thêm và lựa chọn xưởng'
								dataList={listCustomer?.data || []}
								dataChecked={listCustomerChecked}
								setDataChecked={setListCustomerChecked}
							/>
						</div>

						<div className={clsx(styles.checkbox_right)}>
							<input
								type='checkbox'
								onChange={handleCheckAll}
								id='checkall'
								checked={listCustomer?.data?.length == listCustomerChecked?.length}
							/>
							<label htmlFor='checkall'>Áp dụng cho tất cả xưởng </label>
						</div>
					</div>
				</div>
			</Form>

			<DialogWarning
				warn
				open={openWarning}
				title='Cảnh báo!'
				note={`Các giá tiền cũ của loại gỗ này sẽ không được sử dụng nữa!`}
				onClose={() => setOpenWarning(false)}
				onSubmit={() => {
					setOpenWarning(false);
					fucnAddSpecification.mutate();
				}}
			/>
		</div>
	);
}

export default CreatePriceTag;
