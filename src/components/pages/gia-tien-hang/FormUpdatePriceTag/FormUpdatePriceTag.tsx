import React, {useEffect, useState} from 'react';

import {PropsFormUpdatePriceTag} from './interfaces';
import styles from './FormUpdatePriceTag.module.scss';
import {IoClose} from 'react-icons/io5';
import Form, {FormContext, Input} from '~/components/common/Form';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATE_SPEC_CUSTOMER,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import priceTagServices from '~/services/priceTagServices';
import SelectSearch from '~/components/common/SelectSearch';
import Button from '~/components/common/Button';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';
import clsx from 'clsx';

function FormUpdatePriceTag({dataUpdate, onClose}: PropsFormUpdatePriceTag) {
	const queryClient = useQueryClient();

	const [priceTag, setPriceTag] = useState<any>({});
	const [form, setForm] = useState<any>({
		customer: '',
		productType: '',
		spec: '',
		transport: '',
		state: CONFIG_STATE_SPEC_CUSTOMER.DANG_CUNG_CAP,
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

	useEffect(() => {
		if (dataUpdate) {
			setForm({
				customer: dataUpdate?.customerUu?.name,
				productType: dataUpdate?.productTypeUu?.name,
				spec: dataUpdate?.specUu?.name,
				transport:
					dataUpdate?.transportType == TYPE_TRANSPORT.DUONG_BO
						? 'Đường bộ'
						: dataUpdate?.transportType == TYPE_TRANSPORT.DUONG_THUY
						? 'Đường thủy'
						: '---',
				state: dataUpdate?.state,
			});
			setPriceTag({
				id: dataUpdate?.pricetagUu?.uuid || '',
				name: dataUpdate?.pricetagUu?.amount || 0,
			});
		}
	}, [dataUpdate]);

	const fucnUpdateSpecification = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa giá tiền hàng thành công!',
				http: priceTagServices.updatePricetagToCustomer({
					uuid: dataUpdate?.uuid!,
					priceTagUuid: priceTag.id === '' ? String(priceTag.name) : priceTag.id,
					state: form.state,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.table_gia_tien_hang]);
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		if (!dataUpdate?.uuid) {
			return toastWarn({msg: 'Không tìm thấy giá thay đổi!'});
		}

		return fucnUpdateSpecification.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnUpdateSpecification.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.wrapper}>
					<h4 className={styles.title}>Chỉnh sửa giá tiền hàng</h4>
					<div className={clsx('mt', styles.main_form)}>
						<div className={'mt'}>
							<Input
								placeholder='Nhập nhà cung cấp'
								name='customer'
								readOnly={true}
								label={
									<span>
										Nhà cung cấp <span style={{color: 'red'}}>*</span>
									</span>
								}
							/>
							<Input
								placeholder='Loại gỗ'
								name='productType'
								readOnly={true}
								label={
									<span>
										Loại gỗ <span style={{color: 'red'}}>*</span>
									</span>
								}
							/>
							<Input
								placeholder='Quy cách'
								name='spec'
								readOnly={true}
								label={
									<span>
										Quy cách <span style={{color: 'red'}}>*</span>
									</span>
								}
							/>
							<Input
								placeholder='Phương thức vận chuyển'
								name='transport'
								readOnly={true}
								label={
									<span>
										Phương thức vận chuyển <span style={{color: 'red'}}>*</span>
									</span>
								}
							/>
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
					</div>
					<div className='mt'>
						<div className={styles.input_price}>
							<input
								id={`state_spec_customer`}
								name='state'
								value={form.state}
								type='checkbox'
								className={styles.input}
								checked={form?.state == CONFIG_STATE_SPEC_CUSTOMER.DANG_CUNG_CAP}
								onChange={() =>
									setForm((prev: any) => ({
										...prev,
										state:
											prev.state == CONFIG_STATE_SPEC_CUSTOMER.DANG_CUNG_CAP
												? CONFIG_STATE_SPEC_CUSTOMER.CHUA_CUNG_CAP
												: CONFIG_STATE_SPEC_CUSTOMER.DANG_CUNG_CAP,
									}))
								}
							/>
							<label className={styles.label_check_box} htmlFor={`state_spec_customer`}>
								Đang cung cấp
							</label>
						</div>
					</div>

					<div className={styles.control}>
						<div>
							<Button p_8_24 rounded_2 grey_outline onClick={onClose}>
								Hủy bỏ
							</Button>
						</div>
						<div>
							<FormContext.Consumer>
								{({isDone}) => (
									<Button disable={!isDone} p_10_24 rounded_2 primary>
										Xác nhận
									</Button>
								)}
							</FormContext.Consumer>
						</div>
					</div>
				</div>
			</Form>
			<div className={styles.icon_close} onClick={onClose}>
				<IoClose size={24} color='#23262F' />
			</div>
		</div>
	);
}

export default FormUpdatePriceTag;
