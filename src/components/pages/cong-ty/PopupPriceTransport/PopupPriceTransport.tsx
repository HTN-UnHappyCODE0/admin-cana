import React, {useState} from 'react';
import {PropsPopupPriceTransport} from './interfaces';
import styles from './PopupPriceTransport.module.scss';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import Form, {FormContext, Input} from '~/components/common/Form';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import {price} from '~/common/funcs/convertCoin';
import {toastWarn} from '~/common/funcs/toast';
import companyServices from '~/services/companyServices';
import {timeSubmit} from '~/common/funcs/optionConvert';
import DatePicker from '~/components/common/DatePicker';

function PopupPriceTransport({uuid, onClose}: PropsPopupPriceTransport) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{priceMt: number; timeStart: Date | null}>({
		priceMt: 0,
		timeStart: null,
	});

	const funcSuccessPriceTransport = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cập nhật giá tiền vận chuyển thành công!',
				http: companyServices.updatePriceTransport({
					uuid: uuid as string,
					priceMt: price(form.priceMt),
					timeStart: form.timeStart ? timeSubmit(form.timeStart) : null,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.table_cong_ty]);
			}
		},
	});

	const handleSubmit = () => {
		if (price(form.priceMt) == 0) {
			return toastWarn({msg: 'Vui lòng nhập giá tiền vận chuyển'});
		}

		if (form.timeStart && new Date(form.timeStart).getTime() > new Date().getTime()) {
			return toastWarn({msg: 'Ngày áp dụng không lớn hơn ngày hiện tại!'});
		}
		return funcSuccessPriceTransport.mutate();
	};

	return (
		<div className={clsx('effectZoom', styles.popup)}>
			<Loading loading={funcSuccessPriceTransport.isLoading} />
			{/* <div className={styles.iconWarn}>
				<IoHelpCircleOutline />
			</div> */}
			<p className={styles.title}>Chỉnh sửa giá tiền vận chuyển</p>
			{/* <p className={styles.note}>Chỉnh sửa giá tiền vận chuyển</p> */}
			<div className={clsx('mt')}>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<div className='mt'>
						<Input
							name='priceMt'
							value={form.priceMt || ''}
							type='text'
							isMoney
							unit='VNĐ/MT'
							blur={true}
							label={
								<span>
									Giá tiền vận chuyển <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập số tiền'
						/>
					</div>
					<div className='mt'>
						<DatePicker
							icon={true}
							label={
								<span>
									Áp dụng từ ngày <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Chọn ngày áp dụng'
							value={form?.timeStart}
							onSetValue={(date) =>
								setForm((prev) => ({
									...prev,
									timeStart: date,
								}))
							}
							name='timeStart'
							onClean={true}
						/>
					</div>
					<div className={styles.groupBtnPopup}>
						<Button p_10_24 grey_2 rounded_8 bold onClick={onClose} maxContent>
							Đóng
						</Button>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_10_24 primary bold rounded_8 onClick={handleSubmit} maxContent>
									Xác nhận
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default PopupPriceTransport;
