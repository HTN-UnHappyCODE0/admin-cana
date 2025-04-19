import React, {useState} from 'react';

import {PropsFormUpdateContract} from './interfaces';
import styles from './FormUpdateContract.module.scss';
import {IoClose} from 'react-icons/io5';
import Form, {FormContext, Input} from '~/components/common/Form';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import Button from '~/components/common/Button';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';
import clsx from 'clsx';
import DatePicker from '~/components/common/DatePicker';
import {timeSubmit} from '~/common/funcs/optionConvert';
import contractServices from '~/services/contractServices';
import TextArea from '~/components/common/Form/components/TextArea';
import Select, {Option} from '~/components/common/Select';
import receiverServices from '~/services/receiverServices';
import router from 'next/router';

function FormUpdateContract({dataUuid, onClose}: PropsFormUpdateContract) {
	const queryClient = useQueryClient();
	const {_uuid} = router.query;

	const [form, setForm] = useState<{
		timeStart: Date | null;
		timeEnd: Date | null;
		receiverUuid: string;
		partnerUuid: string;
		description: string;
		note: string;
		name: string;
	}>({
		timeStart: null,
		timeEnd: null,
		receiverUuid: '',
		partnerUuid: '',
		description: '',
		note: '',
		name: '',
	});

	useQuery([QUERY_KEY.chi_tiet_nhan_vien], {
		queryFn: () =>
			httpRequest({
				http: contractServices.detailContract({
					uuid: dataUuid as string,
				}),
			}),
		onSuccess(data) {
			setForm({
				timeStart: data.timeStart ? new Date(data.timeStart) : null,
				timeEnd: data.timeEnd ? new Date(data.timeEnd) : null,
				receiverUuid: data.receiverUu?.uuid,
				partnerUuid: _uuid as string,
				description: data.description,
				note: data.note,
				name: data.name,
			});
		},
		select(data) {
			return data;
		},
		enabled: !!dataUuid,
	});

	const listReceiver = useQuery([QUERY_KEY.dropdown_cong_ty_nhan], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: receiverServices.getListReceiver({
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

	const funcUpdateContract = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa hợp đồng thành công!',
				http: contractServices.upsertContract({
					uuid: dataUuid as string,
					timeStart: form.timeStart ? timeSubmit(form.timeStart) : null,
					timeEnd: form.timeEnd ? timeSubmit(form.timeEnd, true) : null,
					description: form.description,
					note: form.note,
					name: form.name,
					receiverUuid: form.receiverUuid,
					partnerUuid: _uuid as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.table_lich_su_hop_dong]);
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		if (!form.receiverUuid) {
			return toastWarn({msg: 'Vui lòng chọn bên mua!'});
		}
		if (!form.timeStart) {
			return toastWarn({msg: 'Vui lòng chọn ngày bắt đầu!'});
		}

		if (!!form.timeStart && !!form.timeEnd) {
			const timeStart = new Date(form.timeStart);
			const timeEnd = new Date(form.timeEnd);

			if (timeStart > timeEnd) {
				return toastWarn({msg: 'Ngày kết thúc không nhỏ hơn ngày bắt đầu!'});
			}
		}

		return funcUpdateContract.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcUpdateContract.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.main_form}>
					<h4 className={styles.title}>Chỉnh sửa hợp đồng</h4>
					<div className={styles.main}>
						<div className={clsx('mt', 'col_2')}>
							<Input
								placeholder='Nhập tên hợp đồng'
								name='name'
								isRequired={true}
								value={form.name || ''}
								blur={true}
								label={
									<span>
										Tên hợp đồng <span style={{color: 'red'}}>*</span>
									</span>
								}
							/>
							<div>
								<Select
									isSearch
									name='receiverUuid'
									value={form.receiverUuid}
									placeholder='Lựa chọn bên mua'
									onChange={(e: any) =>
										setForm((prev: any) => ({
											...prev,
											receiverUuid: e.target.value,
										}))
									}
									label={
										<span>
											Bên mua <span style={{color: 'red'}}>*</span>
										</span>
									}
								>
									{listReceiver?.data?.map((value: any) => (
										<Option key={value.uuid} title={value.name} value={value.uuid} />
									))}
								</Select>
							</div>

							<DatePicker
								icon={true}
								label={
									<span>
										Từ ngày<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Chọn ngày'
								value={form?.timeStart}
								onSetValue={(date) =>
									setForm((prev: any) => ({
										...prev,
										timeStart: date,
									}))
								}
								name='timeStart'
								onClean={true}
							/>
							<div>
								<DatePicker
									icon={true}
									label={
										<span>
											Đến ngày<span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Chọn ngày'
									value={form?.timeEnd}
									onSetValue={(date) => {
										setForm((prev: any) => ({
											...prev,
											timeEnd: date,
										}));
									}}
									name='timeEnd'
									onClean={true}
								/>
							</div>
							<TextArea max={5000} placeholder='Nhập ghi chú' name='note' label={<span>Ghi chú 1</span>} blur />
							<div>
								<TextArea max={5000} placeholder='Nhập ghi chú' name='description' label={<span>Ghi chú 2</span>} blur />
							</div>
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

export default FormUpdateContract;
