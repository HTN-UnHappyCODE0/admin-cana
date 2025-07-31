import React, {useContext, useState} from 'react';

import {PropsGeneralStatistics} from './interfaces';

import styles from './GeneralStatistics.module.scss';
import {ChartSquare} from 'iconsax-react';
import DetailBox from '~/components/common/DetailBox';
import clsx from 'clsx';
import {ContextDashbroad, IContextDashbroad} from '../MainDashboard/context';
import {convertWeight} from '~/common/funcs/optionConvert';
import {convertCoin} from '~/common/funcs/convertCoin';
import Button from '~/components/common/Button';
import {LuPencil} from 'react-icons/lu';
import Popup from '~/components/common/Popup';
import {IoClose} from 'react-icons/io5';
import Form, {FormContext, Input} from '~/components/common/Form';
import Loading from '~/components/common/Loading';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import appSettingServices from '~/services/appSettingServices';
import {toastWarn} from '~/common/funcs/toast';

function GeneralStatistics({isLoading, debt, weight}: PropsGeneralStatistics) {
	const context = useContext<IContextDashbroad>(ContextDashbroad);

	const [openDryness, setOpenDryness] = useState<boolean>(false);

	const [form, setForm] = useState<{
		dryness: number;
	}>({
		dryness: 0,
	});

	const funcUpdateDryness = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cập nhật quy cách thành công!',
				http: appSettingServices.updateDryness({
					key: 'DrynessDefault',
					value: form.dryness ? form.dryness.toString() : '0',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setOpenDryness(false);
				setForm({
					dryness: 0,
				});
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});
	const handleSubmit = async () => {
		if (Number(form.dryness) <= 0 || Number(form.dryness) > 100) {
			return toastWarn({msg: 'Giá trị độ khô không hợp lệ!'});
		}
		funcUpdateDryness.mutate();
	};

	return (
		<div className={clsx(styles.container, {[styles.active]: !context.companyUuid})} onClick={() => context?.setCompanyUuid('')}>
			<div className={styles.header}>
				<div className={styles.head}>
					<div className={styles.icon}>
						<ChartSquare size='28' color='#2A85FF' variant='Bold' />
					</div>
					<h4 className={styles.title}>Tổng công ty</h4>
				</div>

				{/* <div>
					<Button
						className={styles.btn}
						rounded_2
						maxHeight
						neutral
						p_10_24
						icon={<LuPencil size={20} />}
						onClick={() => {
							setOpenDryness(true);
						}}
					>
						Cập nhật độ khô
					</Button>
				</div> */}
			</div>

			<div className={styles.main}>
				<div className={styles.left}>
					<DetailBox
						isLoading={isLoading}
						name={'Khối lượng khô'}
						value={convertWeight(weight?.totalAmountBdmt)}
						color='#2A85FF'
						unit='BDMT'
					/>
					<div className={clsx('mt', 'col_2')}>
						<DetailBox isLoading={isLoading} name={'Khô tạm tính'} value={convertWeight(weight?.amountBdmtDemo)} unit='BDMT' />
						<DetailBox isLoading={isLoading} name={'Khô chuẩn'} value={convertWeight(weight?.amountBdmt)} unit='BDMT' />
					</div>
				</div>
				<div className={styles.right}>
					<div className={clsx('col_2')}>
						<DetailBox
							isLoading={isLoading}
							name={'Tổng công nợ'}
							value={convertCoin(debt?.totalDebt)}
							color='#2CAE39'
							unit='VND'
						/>
						<DetailBox
							isLoading={isLoading}
							name={'Công nợ chuẩn'}
							value={convertCoin(debt?.debtKCS)}
							color='#2A85FF'
							unit='VND'
						/>
						<DetailBox isLoading={isLoading} name={'Công nợ tạm tính'} value={convertCoin(debt?.debtDemo)} unit='VND' />
						<DetailBox isLoading={isLoading} name={'Dư đầu kỳ'} value={convertCoin(debt?.debtReal)} unit='VND' />
					</div>
				</div>
			</div>
			<Popup
				open={openDryness}
				onClose={() => {
					setOpenDryness(false);
				}}
			>
				<div className={styles.popup}>
					<Loading loading={funcUpdateDryness.isLoading} />
					<h4>Cập nhật độ khô</h4>
					<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
						<Input
							isRequired
							name='dryness'
							value={form.dryness || ''}
							unit='%'
							type='number'
							blur={true}
							step='0.01'
							placeholder='Độ khô'
							label={<span>Nhập độ khô</span>}
						/>
						<div className={styles.btn}>
							<div>
								<Button
									p_10_24
									rounded_2
									grey_outline
									onClick={() => {
										setOpenDryness(false);
									}}
								>
									Hủy bỏ
								</Button>
							</div>
							<div>
								<FormContext.Consumer>
									{({isDone}) => (
										<Button disable={!isDone} p_10_24 rounded_2 primary>
											Cập nhật
										</Button>
									)}
								</FormContext.Consumer>
							</div>
						</div>

						<div
							className={styles.close}
							onClick={() => {
								setOpenDryness(false);
							}}
						>
							<IoClose />
						</div>
					</Form>
				</div>
			</Popup>
		</div>
	);
}

export default GeneralStatistics;
