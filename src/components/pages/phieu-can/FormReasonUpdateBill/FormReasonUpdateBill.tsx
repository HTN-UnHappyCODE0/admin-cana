import React, {useState} from 'react';

import {PropsFormReasonUpdateBill} from './interfaces';
import styles from './FormReasonUpdateBill.module.scss';
import {IoHelpCircleOutline} from 'react-icons/io5';
import clsx from 'clsx';
import Form, {FormContext} from '~/components/common/Form';
import {useQueryClient} from '@tanstack/react-query';
import TextArea from '~/components/common/Form/components/TextArea';
import Button from '~/components/common/Button';

function FormReasonUpdateBill({onClose}: PropsFormReasonUpdateBill) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{description: string}>({
		description: '',
	});

	return (
		<div className={clsx('effectZoom', styles.popup)}>
			{/* <Loading loading={funcDeleteCustomer.isLoading} /> */}
			<div className={styles.iconWarn}>
				<IoHelpCircleOutline />
			</div>

			<p className={styles.note}>Bạn có muốn thay đổi thông tin phiếu này không?</p>
			<div className={clsx('mt')}>
				<Form form={form} setForm={setForm}>
					<TextArea
						isRequired
						name='description'
						max={5000}
						blur
						placeholder='Nhập lý do thay đổi'
						textRequired='Vui lòng nhập lý do thay đổi'
					/>
					<div className={styles.groupBtnPopup}>
						<Button p_10_24 grey_2 rounded_8 bold maxContent onClick={onClose}>
							Đóng
						</Button>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_10_24 primary bold rounded_8 maxContent>
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

export default FormReasonUpdateBill;
